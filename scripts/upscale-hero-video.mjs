#!/usr/bin/env node
/**
 * Upscale / clean the hero video via fal.ai Topaz Video AI.
 *
 *   export FAL_KEY="..."
 *   node scripts/upscale-hero-video.mjs
 *
 * Submits to the fal queue, polls, and downloads the result to
 * scratch/hero-upscaled.mp4. A separate ffmpeg step then compresses it to a
 * clean, web-light 1080p and swaps it into public/videos/.
 *
 * "Clean 1080p" (owner's pick): enhance at native resolution with detail
 * recovery + compression/noise cleanup rather than blowing it up to 4K — a
 * background hero that most screens can't show at 4K anyway, and 4K would tank
 * page load. H264_output is forced true; Topaz defaults to H.265, which many
 * browsers can't decode.
 */

import { writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const MODEL = 'fal-ai/topaz/upscale/video'
const SOURCE = 'https://fun-landing-page.dansenltd.workers.dev/videos/industry-4-0.mp4'
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'scratch', 'hero-upscaled.mp4')

const input = {
  video_url: SOURCE,
  model: 'Proteus',       // general-purpose enhancement
  upscale_factor: 1.0,     // clean in place, don't balloon resolution
  recover_detail: 0.6,     // pull back detail lost to compression softness
  compression: 0.4,        // remove h264 blocking/artefacts
  noise: 0.3,              // mild denoise
  H264_output: true,       // browser-decodable (Topaz defaults to H.265)
}

const KEY = process.env.FAL_KEY
if (!KEY) { console.error('FAL_KEY not set'); process.exit(1) }
const H = { Authorization: `Key ${KEY}`, 'Content-Type': 'application/json' }

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function main() {
  console.log(`Submitting ${MODEL} …`)
  const submit = await fetch(`https://queue.fal.run/${MODEL}`, {
    method: 'POST', headers: H, body: JSON.stringify(input),
  })
  if (!submit.ok) throw new Error(`submit ${submit.status}: ${(await submit.text()).slice(0, 400)}`)
  const { request_id, status_url, response_url } = await submit.json()
  console.log(`queued: ${request_id}`)

  const statusUrl = status_url || `https://queue.fal.run/${MODEL}/requests/${request_id}/status`
  const respUrl = response_url || `https://queue.fal.run/${MODEL}/requests/${request_id}`

  const deadline = Date.now() + 40 * 60 * 1000
  for (let n = 1; Date.now() < deadline; n++) {
    await sleep(15000)
    const s = await fetch(statusUrl, { headers: H })
    const st = await s.json().catch(() => ({}))
    console.log(`[${n}] ${st.status ?? s.status}`)
    if (st.status === 'COMPLETED') break
    if (st.status === 'FAILED' || st.status === 'ERROR') throw new Error(`job failed: ${JSON.stringify(st).slice(0, 400)}`)
  }

  const r = await fetch(respUrl, { headers: H })
  if (!r.ok) throw new Error(`result ${r.status}: ${(await r.text()).slice(0, 400)}`)
  const out = await r.json()
  const url = out?.video?.url
  if (!url) throw new Error(`no video url in result: ${JSON.stringify(out).slice(0, 400)}`)
  console.log(`upscaled url: ${url}`)

  const bytes = Buffer.from(await (await fetch(url)).arrayBuffer())
  await writeFile(OUT, bytes)
  console.log(`saved ${OUT} (${(bytes.length / 1e6).toFixed(1)} MB)`)
}

main().catch((e) => { console.error('FAILED:', e.message); process.exit(1) })

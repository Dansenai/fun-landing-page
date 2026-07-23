#!/usr/bin/env node
/**
 * Generates the six VALUE_CHAIN card images via fal.ai.
 *
 *   export FAL_KEY="..."          # from https://fal.ai/dashboard/keys
 *   node scripts/gen-chain-images.mjs            # all six
 *   node scripts/gen-chain-images.mjs 02 05      # regenerate specific steps
 *
 * Writes public/images/chain-0N.jpg. Existing files are skipped unless --force.
 */

import { writeFile, access } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const MODEL = process.env.FAL_MODEL ?? 'openai/gpt-image-2'
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images')

// Shared look: reverse-engineered from the site's REAL photography
// (public/images/infra-1.jpg, infra-3.jpg, studio-1.jpg) so the six read as
// frames from the same in-house shoot, not six stock photos.
//
// What the real frames actually contain, and what the model must reproduce:
//  - a working Delhi-NCR garment factory: galvanized steel roof decking,
//    suspended rails of fluorescent tubes, ceiling fans on long downrods,
//    painted concrete pillars, exposed conduit, small bilingual safety signs
//  - Indian workers, candid, nobody acknowledging the camera: women in
//    bright printed sarees and kurtas with patterned cloth face masks,
//    bangles and earrings; men in plain white shirts with masks
//  - production clutter left in frame: paper job tickets, indigo/navy fabric
//    bundles, loose threads, scissors, chalk marks on tables
//  - grade: cool blue-grey desaturated cast with deep shadows, available
//    light only, so the bright garments punch through the industrial palette
const LOOK =
  'Setting: a real working garment factory in Delhi NCR, India — galvanized steel roof decking, ' +
  'suspended fluorescent tube rails, ceiling fans on long downrods, painted concrete pillars, ' +
  'exposed conduit, small bilingual Hindi-English safety signs. Every person is Indian and candid, ' +
  'absorbed in work, never looking at the camera: women in bright printed sarees or kurtas with ' +
  'patterned cloth face masks, bangles and small gold earrings; men in plain white shirts with masks. ' +
  'Lived-in production clutter stays in frame — paper job tickets, navy fabric bundles, loose threads, ' +
  'worn surfaces. Photographic style: candid in-house documentary record photo, available light only, ' +
  'cool desaturated blue-grey colour grade with deep shadows and subtle grain, so bright fabric ' +
  'colours punch through the muted industrial palette. Slight imperfection of a working photo, ' +
  'not an advertisement. Absolutely no text overlays, no logos, no watermarks.'

const STEPS = [
  {
    n: '01',
    title: 'Design & trend',
    prompt:
      'In-house design studio upstairs from the factory floor. Two Indian designers — a woman in a ' +
      'teal kurta with a dupatta and thin gold bangles, and a man in a white shirt — lean over a big ' +
      'work table buried under printed trend boards, fanned-out colour cards, fabric swatch books and ' +
      'pencil sketches of womenswear. She pins a magazine tear-sheet to a cork moodboard wall dense ' +
      'with fashion clippings and yarn samples; he compares two lace swatches. Soft daylight from a ' +
      'barred window mixes with one fluorescent tube; a ceiling fan hangs above. Shot from table ' +
      'height across the paper chaos, hands and swatches in sharp focus.',
  },
  {
    n: '02',
    title: '3D virtual sampling',
    prompt:
      'Over-the-shoulder shot of a young Indian woman designer in a printed kurta, cloth mask pulled ' +
      'below her chin, bangles at the keyboard, working in a dim corner of the studio at a large ' +
      'monitor showing a 3D-simulated navy dress draped on a digital avatar, seam lines and mesh ' +
      'visible on half the garment. A second smaller screen shows flat 2D pattern pieces. She holds a ' +
      'physical navy fabric swatch up beside the screen to match the drape. Screen glow lights her ' +
      'face against the cool fluorescent spill of the factory office; pinned swatches and a job ' +
      'ticket on the partition wall beside the desk.',
  },
  {
    n: '03',
    title: 'Responsible sourcing',
    prompt:
      'Fabric store inside the factory: tall steel racks packed floor-to-ceiling with fabric rolls — ' +
      'undyed greige cotton, indigo, navy — receding down a narrow aisle. An older Indian storekeeper ' +
      'in a white shirt and cloth mask pulls one greige roll half out and rubs the weave between ' +
      'thumb and fingers, close to his reading glasses. Paper hang-tags dangle from roll ends, ' +
      'strings and illegible stamps. Shafts of daylight from high louvred windows cut through faint ' +
      'dust; a single fluorescent tube runs down the aisle ceiling. Shot from low in the aisle, the ' +
      'inspecting hand sharp, the racks dissolving into shadow.',
  },
  {
    n: '04',
    title: 'Cut, make & finish',
    prompt:
      'Down-the-line view of a sewing floor: a long row of white industrial lockstitch machines with ' +
      'small blue LCD displays, thread stands with paper job tickets clipped on, navy garment bundles ' +
      'stacked on the shelf rail above the line. In the sharp foreground an Indian woman in a bright ' +
      'yellow printed saree and paisley cloth mask guides navy fabric under the needle, its work ' +
      'light glowing on the cloth; behind her more operators in orange and pink kurtas blur down the ' +
      'receding line under ceiling fans and fluorescent rails. Scissors and an orange measuring ' +
      'ribbon on the table edge. Waist-level candid frame from beside the line.',
  },
  {
    n: '05',
    title: 'In-house QC lab',
    prompt:
      'Compact textile testing lab off the factory floor: an Indian woman technician, white lab coat ' +
      'over a printed kurta, cloth mask on, loads a strip of navy fabric into the jaws of a ' +
      'floor-standing tensile testing machine. On the worn wooden bench beside her: circular GSM ' +
      'cutter and punched fabric discs, grey-scale colour fastness cards, a stack of tagged swatches, ' +
      'a logbook with a pen. Glass-front cabinet of reagent bottles behind, chart pinned to the mint ' +
      'painted wall, cool fluorescent light from a single ceiling tube. Framed from bench height, her ' +
      'gloved hands and the machine jaws in focus.',
  },
  {
    n: '06',
    title: 'Export',
    prompt:
      'Dispatch bay at the factory: brown corrugated export cartons, shrink-wrapped and strapped, ' +
      'stacked chest-high on wooden pallets. Two Indian loaders in masks pass cartons hand to hand up ' +
      'into a shipping container backed to the open roller-shutter door, arms mid-motion. Warm late ' +
      'afternoon light rakes low through the doorway across the smooth concrete, colliding with the ' +
      'cool fluorescent interior; a hand pallet truck waits mid-frame, illegible marker scrawl and ' +
      'stencilled port marks on the carton faces. Shot from inside the bay looking toward the light.',
  },
]

async function generate(step) {
  const res = await fetch(`https://fal.run/${MODEL}`, {
    method: 'POST',
    headers: {
      Authorization: `Key ${process.env.FAL_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: `${step.prompt} ${LOOK}`,
      // Portrait — the cards are taller than wide. Custom sizes must be multiples
      // of 16 and total 0.65–8.3 MP; 1600x2000 = 3.2 MP.
      image_size: { width: 1600, height: 2000 },
      quality: 'high',
      num_images: 1,
      output_format: 'jpeg',
    }),
  })

  if (!res.ok) {
    throw new Error(`${step.n} — fal returned ${res.status}: ${(await res.text()).slice(0, 400)}`)
  }

  const url = (await res.json())?.images?.[0]?.url
  if (!url) throw new Error(`${step.n} — no image URL in fal response`)

  const bytes = Buffer.from(await (await fetch(url)).arrayBuffer())
  const path = join(OUT, `chain-${step.n}.jpg`)
  await writeFile(path, bytes)
  return { path, kb: Math.round(bytes.length / 1024) }
}

const exists = (p) => access(p).then(() => true, () => false)

async function main() {
  if (!process.env.FAL_KEY) {
    console.error('FAL_KEY is not set.\n  export FAL_KEY="..."   # https://fal.ai/dashboard/keys')
    process.exit(1)
  }

  const force = process.argv.includes('--force')
  const only = process.argv.slice(2).filter((a) => /^\d{2}$/.test(a))
  const todo = only.length ? STEPS.filter((s) => only.includes(s.n)) : STEPS

  console.log(`Model: ${MODEL}  •  generating ${todo.length} image(s)\n`)

  // All six in parallel — GPT Image 2 at high quality takes 1–2 min per image,
  // and fal handles concurrent requests fine.
  const results = await Promise.allSettled(
    todo.map(async (step) => {
      const path = join(OUT, `chain-${step.n}.jpg`)
      if (!force && !only.length && (await exists(path))) return { step, skipped: true }
      const { kb } = await generate(step)
      return { step, kb }
    })
  )

  let failed = 0
  results.forEach((r, i) => {
    const step = todo[i]
    if (r.status === 'fulfilled') {
      const tail = r.value.skipped ? 'skipped (exists — use --force to redo)' : `ok (${r.value.kb} KB)`
      console.log(`  ${step.n}  ${step.title.padEnd(22)} ${tail}`)
    } else {
      failed++
      console.log(`  ${step.n}  ${step.title.padEnd(22)} FAILED\n      ${r.reason?.message ?? r.reason}`)
    }
  })
  if (failed) process.exitCode = 1
}

main()

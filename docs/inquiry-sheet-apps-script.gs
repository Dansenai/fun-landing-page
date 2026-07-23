/**
 * Radnik inquiry form → Google Sheet.
 *
 * SETUP (once, ~5 minutes)
 * -----------------------------------------------------------------------------
 * 1. Create a new Google Sheet. Name it e.g. "Radnik — Website Inquiries".
 * 2. Extensions → Apps Script. Delete the placeholder Code.gs contents and
 *    paste this whole file in.
 * 3. Set NOTIFY below to whoever should get an email on each inquiry
 *    (or set it to '' to turn notification emails off).
 * 4. Deploy → New deployment → type "Web app".
 *      Execute as:        Me
 *      Who has access:    Anyone            <-- must be "Anyone", not "Anyone with Google account"
 *    Deploy, then authorise when prompted (Google will warn it's an unverified
 *    app — "Advanced" → "Go to ... (unsafe)". It's your own script.)
 * 5. Copy the Web app URL. It ends in /exec. Paste it into
 *    src/data/site.ts as INQUIRY_ENDPOINT.
 *
 * NOTE: after ANY edit to this file you must Deploy → Manage deployments →
 * edit → Version: New version. Saving alone does not update the live URL.
 */

const SHEET_NAME = 'Inquiries'
const NOTIFY = 'contact@radnik.net' // '' to disable email alerts

const COLUMNS = [
  'Timestamp',
  'Name',
  'Company',
  'Email',
  'Brand / division',
  'Product category',
  'Est. annual volume',
  'Message',
]

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)

    // Honeypot: real users never fill this hidden field; bots fill everything.
    // Return success so the bot doesn't retry, but write nothing.
    if (data.website) return reply({ ok: true })

    const sheet = getSheet()
    sheet.appendRow([
      new Date(),
      data.name || '',
      data.company || '',
      data.email || '',
      data.brand || '',
      data.category || '',
      data.volume || '',
      data.message || '',
    ])

    if (NOTIFY) notify(data)

    return reply({ ok: true })
  } catch (err) {
    // Logged to Apps Script → Executions, so a failure is diagnosable later.
    console.error(err)
    return reply({ ok: false, error: String(err) })
  }
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  let sheet = ss.getSheetByName(SHEET_NAME)
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME)
    sheet.appendRow(COLUMNS)
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold')
    sheet.setFrozenRows(1)
  }
  return sheet
}

function notify(data) {
  const subject = `Website inquiry — ${data.company || data.name || 'unknown'}`
  const body = COLUMNS.slice(1)
    .map((label, i) => {
      const key = ['name', 'company', 'email', 'brand', 'category', 'volume', 'message'][i]
      return `${label}: ${data[key] || '—'}`
    })
    .join('\n')

  MailApp.sendEmail({
    to: NOTIFY,
    subject,
    body: `${body}\n\n— sent from radnikexports.com`,
    replyTo: data.email || undefined,
  })
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON)
}

/** Optional: run once from the editor to confirm the sheet + headers are created. */
function testSetup() {
  getSheet()
  console.log('Sheet ready.')
}

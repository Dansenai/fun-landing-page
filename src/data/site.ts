// All facts here are drawn from radnikexports.com and Radnik's official OGTC company profile.

export const COMPANY = {
  name: 'Radnik Exports',
  founded: 1973,
  tagline: 'Fashion, engineered. On time, at scale.',
  email: 'contact@radnik.net',
  phone: '+91 11 4074 8200',
  phoneHref: '+911140748200',
  whatsapp: '911140748200',
  linkedin: 'https://www.linkedin.com/company/radnik-exports-private-limited',
  facebook: 'https://www.facebook.com/Radnik-Exports-246454325409666',
  cmd: 'Mr. Vinod Kapur',
  offices: [
    {
      label: 'Registered Address',
      lines: ['Osian Building, 12/412', 'Nehru Place, South Delhi', 'New Delhi 110048'],
    },
    {
      label: 'Planning Centre',
      lines: ['Okhla Industrial Area', 'Phase II', 'New Delhi 110020'],
    },
  ],
}

export const NAV = [
  { label: 'About', path: '/about' },
  { label: 'Capabilities', path: '/capabilities' },
  { label: 'Infrastructure', path: '/infrastructure' },
  { label: 'Clients', path: '/clients' },
  { label: 'Sustainability', path: '/sustainability' },
  { label: 'Contact', path: '/contact' },
]

export const STATS = [
  { value: 1973, suffix: '', label: 'Founded', prefix: '' },
  { value: 50, suffix: '+', label: 'Years of export', prefix: '' },
  { value: 15, suffix: '', label: 'Factories', prefix: '' },
  { value: 5000, suffix: '+', label: 'Machines', prefix: '' },
  { value: 15000, suffix: '', label: 'People', prefix: '' },
  { value: 1, suffix: 'M+', label: 'Garments / month', prefix: '' },
  { value: 18, suffix: 'M', label: 'Pieces / year', prefix: '' },
]

export const CLIENTS = [
  'H&M',
  'Tommy Hilfiger',
  'Benetton',
  'Marks & Spencer',
  'Target',
  'Stella McCartney',
  'Scotch & Soda',
  '& Other Stories',
  'Tom Tailor',
  'Lindex',
  'TK Maxx',
]

export const CAPABILITIES = [
  { title: 'Fashion garments', note: 'Core fashion to evening wear' },
  { title: 'Active & sportswear', note: 'Performance & athleisure' },
  { title: 'Wovens & knits', note: 'Across denim, knits & wovens' },
  { title: 'Soft home & furnishings', note: 'Recycled-fibre fillings' },
  { title: 'Uniforms', note: 'Corporate & institutional' },
  { title: 'Defense & technical textiles', note: 'DGQA-certified' },
  { title: 'Accessories', note: 'Trims & fashion accessories' },
  { title: 'Survival & security gear', note: 'Life-survival products' },
]

export const VALUE_CHAIN = [
  { n: '01', title: 'Design & trend', body: 'In-house studio on WGSN with design consultants in Europe.' },
  { n: '02', title: '3D virtual sampling', body: 'CLO, Browzwear & Optitex — weeks to hours.' },
  { n: '03', title: 'Responsible sourcing', body: 'Tier-2 traceability, GOTS / OCS / GRS materials.' },
  { n: '04', title: 'Cut, make & finish', body: '5,000 machines across 15 Delhi-NCR factories.' },
  { n: '05', title: 'In-house QC lab', body: 'Buyer-accredited testing on 16+ parameters.' },
  { n: '06', title: 'Export', body: 'Self-reliant factories cleared to ship for buyers.' },
]

export const CERTS = {
  quality: ['ISO 9001:2015', 'ISO 14001:2015', 'OHSAS 18001', 'Bureau Veritas'],
  social: ['SA 8000 (SAI)', 'BSCI', 'Sedex', 'SLCP', 'SCAN', 'NEST', 'C-TPAT', 'Global Security Verification'],
  materials: ['GOTS (Control Union)', 'OCS', 'GRS', 'Oeko-Tex Std 100', 'BCI', 'FSC Viscose', 'Organic 100', 'Higg Index'],
  climate: ['Science Based Targets', 'CDP', 'EcoVadis', 'ZDHC Gateway', 'Sustainable Apparel Coalition'],
  defense: ['DGQA', 'OCF', 'NSIC'],
}

export const LAB_TESTS = [
  'Count & construction',
  'GSM',
  'Content',
  'Seam slippage',
  'Tear & tensile',
  'Flammability',
  'Pilling',
  'pH',
  'Nickel spot test',
  'Colourfastness — water',
  'Colourfastness — perspiration',
  'Colourfastness — rubbing',
  'Colour change',
  'Spectrophotometer reading',
  'Shrinkage',
  'Button-pull test',
]

export const SOURCING = ['China', 'Hong Kong', 'Surat', 'Salem', 'Erode']

export const ESG_PEOPLE: { name: string; since: string; body: string; full?: string }[] = [
  { name: 'Project RISE', full: 'Radnik Initiative for Social Empowerment', since: 'since 2008', body: '21,500+ women trained in garment skills at our village centres — 69% placed into work at Radnik and nearby garment houses.' },
  { name: 'Project Bhagta Bharat', since: 'Corporate NGO', body: '~3,500 underprivileged children reached with life-skill education.' },
  { name: 'Project HER', since: 'with Swasti & Bestseller', body: 'Health and hygiene programs for our women workforce.' },
  { name: 'Project SWAR', since: 'Lindex-certified', body: 'Sustainability of Water & Resources — Radnik was the first supplier certified.' },
  { name: 'Project FLA', since: 'Fair Labour', body: 'Capacity building at the home-workers’ village centre.' },
  { name: 'Project PENSION', since: 'In-house', body: 'Pension and savings access for low-income in-house workers.' },
]

export const ESG_PLANET = [
  { metric: '12,600+', unit: 'trees', body: 'Planted across Noida green belts — ≈ 273,420 kg of CO₂e offset.' },
  { metric: '11.7M', unit: 'litres / yr', body: 'Recharged by our first restored pond; a second adopted pond adds ~300M litres of potential.' },
  { metric: '366', unit: 'KW solar', body: 'On-site rooftop generation — part of a 55% renewable mix in 2024.' },
  { metric: '100%', unit: 'recycled fill', body: 'Recycled poly-fibre fillings used across soft-home textiles.' },
]

// ── ESG headline metrics (top-of-page impact band) ──
export const ESG_IMPACT = [
  { value: 55, suffix: '%', label: 'Renewable electricity, 2024', note: '10% rooftop solar + 45% green PPA' },
  { value: 56, suffix: '%', label: 'Lower carbon per garment', note: 'vs. industry average — 7 kg CO₂e / shirt' },
  { value: 21500, suffix: '+', label: 'Women trained since 2008', note: 'Project RISE — 69% placed into work' },
  { value: 12600, suffix: '+', label: 'Trees planted', note: '≈ 273,420 kg CO₂e offset' },
]

// ── Materials basket (fabric usage %) — preferred = recycled/organic/certified ──
export const MATERIALS: { name: string; pct: number; preferred?: boolean }[] = [
  { name: 'BCI Cotton', pct: 42.1, preferred: true },
  { name: 'Canopy / FSC Viscose', pct: 22.8, preferred: true },
  { name: 'Recycled Polyester', pct: 12.8, preferred: true },
  { name: 'Organic Cotton', pct: 10.5, preferred: true },
  { name: 'Linen, silk & blends', pct: 7.1 },
  { name: 'Conventional Cotton', pct: 3.8 },
  { name: 'Polyester', pct: 0.7 },
  { name: 'Recycled Cotton', pct: 0.2, preferred: true },
]
export const MATERIALS_GOALS = [
  { year: '2028', body: '30% recycled materials' },
  { year: '2030', body: '100% recycled or sustainably sourced' },
]

// ── Energy ──
export const ENERGY_STATS: { metric: string; unit?: string; label: string; body: string }[] = [
  { metric: '80%', label: 'Less diesel', body: 'Gensets & boilers converted to piped natural gas.' },
  { metric: '366', unit: 'KW', label: 'Rooftop solar', body: 'On-site renewable generation across units.' },
  { metric: '45%', label: 'Lighting saved', body: '100% conversion to LED.' },
  { metric: '18%', label: 'Power saved', body: '100% servo motors on the line.' },
]
export const ENERGY_TARGETS = ['50% renewable electricity by 2025', '50% GHG reduction by 2030', 'SBTi Net Zero by 2050']

// ── Water ──
export const WATER_STATS = [
  { metric: '25%', label: 'Flushing water saved', body: 'RO-reject water reused.' },
  { metric: '25%', label: 'Wash water recycled', body: 'On-site water-recycling plant.' },
  { metric: '70%', label: 'Less vs. traditional wash', body: 'Go-Green Eco wash machinery.' },
  { metric: '7%', label: 'Recycled for boilers', body: 'Steam-condensate recapture.' },
]

// ── Circularity: cut-panel waste → 100% re-utilisation by 2024-25 ──
export const CUT_PANEL = [
  { pct: 20, label: 'Recycled to yarn', via: 'via Reverse Resources' },
  { pct: 20, label: 'Community up-cycling', via: 'foot mats, rugs, table linen' },
  { pct: 20, label: 'Knitted fabric', via: 'converted in-house' },
  { pct: 20, label: 'Organic sanitary pads', via: 'biodegradable & compostable' },
  { pct: 20, label: 'New technologies', via: 'under exploration' },
]

// ── Forward goals timeline ──
export const FORWARD_GOALS: { year: string; items: string[]; net?: boolean }[] = [
  { year: '2024', items: ['EcoVadis certification', '55% renewable electricity', '63% recycled packaging', 'CDP rating', 'Carbon neutral'] },
  { year: '2025', items: ['Water neutral', '100% recycled packaging'] },
  { year: '2030', items: ['100% renewable energy'] },
  { year: '2032', items: ['SBTi — 72% GHG reduction'] },
  { year: '2040', items: ['Net Zero'], net: true },
]

// ── Diversity, equity & inclusion (share of workforce, with 2024 goal) ──
export const DEI: { label: string; pct: number; goal?: number }[] = [
  { label: 'Female workforce', pct: 45 },
  { label: 'Female operators', pct: 60, goal: 70 },
  { label: 'Female leadership', pct: 29, goal: 33 },
  { label: 'Female supervisors', pct: 28, goal: 33 },
  { label: 'Specially-abled', pct: 2, goal: 3 },
]

// ── Community programmes (flagship CSR) ──
export const COMMUNITY = [
  { title: 'Women’s stitching centres', stat: '21,500+', statLabel: 'trained since 2008', body: 'Two operator-training centres in Khoda & Chhijarsi villages give underprivileged women a skilled trade. 69% go on to work at Radnik and nearby garment houses.' },
  { title: 'Up-cycling livelihoods', stat: '14,000 kg', statLabel: 'fabric up-cycled', body: 'Layer-cutting waste becomes doormats, coasters and table linen — paid work for women who can’t commit to full factory hours, scaling to a group of 500.' },
  { title: 'Specially-abled hiring', stat: '55+', statLabel: 'trained since 2023', body: 'With Sarthak, Samarth and NDS, we train and place specially-abled candidates as machine operators, computer operators and packers.' },
]

// ── Awards & recognition ──
export const AWARDS = [
  { year: '2025', title: 'Excellence in Carbon Emissions Reduction', org: 'Bharat Tex 2025 · CITI', body: 'Winner at India’s largest global textile event, backed by the Ministry of Textiles — presented at Bharat Mandapam, New Delhi, at an event inaugurated by the Prime Minister of India.' },
  { year: '2024', title: 'Sustainable Tech User of the Year', org: 'SNXT · Apparel Resources', body: 'Recognising our floor-level digital manufacturing and real-time production monitoring.' },
  { year: '2024', title: 'Circular Fashion Innovation of the Year', org: 'SNXT · Apparel Resources', body: 'The only company to win in two SNXT categories in the same year.' },
  { year: '2023', title: 'Textile Waste Management Certificate', org: 'Reverse Resources', body: 'For handling fabric waste in a fully transparent, traceable way through to the end recycler.' },
]

// ── Facilities map ──
// Publicly-listed Radnik locations across the three Delhi-NCR hubs. Coordinates are set to
// the named industrial area / sector (the level the addresses are published at). The full
// network is 15 production units — these are the principal, verifiable facilities.
// `coords` are [lng, lat]. Radnik can hand us exact plot GPS to swap in later.
export type Facility = {
  id: string
  name: string
  kind: 'HQ' | 'Planning' | 'Production' | 'Unit'
  hub: 'Delhi' | 'Noida' | 'Gurgaon'
  address: string
  coords: [number, number]
  units?: string[]
}

export const FACILITIES: Facility[] = [
  { id: 'hq', name: 'Corporate Headquarters', kind: 'HQ', hub: 'Delhi', address: 'Osian Building, 12 Nehru Place, New Delhi 110019', coords: [77.2512, 28.5491] },
  { id: 'okhla', name: 'Planning Centre & Showroom', kind: 'Planning', hub: 'Delhi', address: 'B-22, Okhla Industrial Area Phase II, New Delhi 110020', coords: [77.2731, 28.5352] },
  { id: 'sec63', name: 'Noida Sector 63 Unit', kind: 'Unit', hub: 'Noida', address: 'D-62, Sector 63, Noida 201301', coords: [77.3908, 28.6231] },
  { id: 'sec59', name: 'Noida Sector 59 Unit', kind: 'Unit', hub: 'Noida', address: 'E-2, Sector 59, Noida 201301', coords: [77.3719, 28.6089] },
  { id: 'dadri', name: 'Noida Production Centre', kind: 'Production', hub: 'Noida', address: 'Plot 64, Dadri Road, Noida 201301', coords: [77.4162, 28.5847] },
  { id: 'udyog1', name: 'Udyog Vihar Phase I', kind: 'Production', hub: 'Gurgaon', address: 'Udyog Vihar Phase I, Gurgaon 122016', coords: [77.0872, 28.5041], units: ['Plot 154', 'Plot 186', 'Plot 215', 'Plot 227'] },
  { id: 'udyog4', name: 'Udyog Vihar Phase IV', kind: 'Unit', hub: 'Gurgaon', address: 'Plot 29, Udyog Vihar Phase IV, Gurgaon 122001', coords: [77.0801, 28.4981] },
  { id: 'pace', name: 'Pace City II', kind: 'Unit', hub: 'Gurgaon', address: '363, Pace City II, Sector 37, Gurgaon 122001', coords: [76.9884, 28.4462] },
]

type Item = { t: string; s: string }

const NEUTRAL = { bg: '#F1F2F4', border: '#D7DAE0', text: '#374151', cardBg: '#E4E7EC', cardBorder: '#C4C9D2' }

const SHELL_REGIONS: Item[] = [
  { t: 'Header', s: 'Identity, environment, account' },
  { t: 'Left panel', s: 'Metric shell' },
  { t: 'Bottom strip', s: 'Themed KPIs' },
  { t: 'Map legend', s: 'Severity and feed' },
  { t: 'Recommended action', s: 'Act or defer' },
  { t: 'CCTV panel', s: 'Live cameras' },
  { t: 'Toolbar', s: 'Weather, history, simulation' },
]

const LODS = [
  { n: 'LOD 1', t: 'Island level', s: 'Persona KPIs read across the whole island.' },
  { n: 'LOD 2', t: 'District level', s: 'Reached by zooming into a district, the same view scoped to that district.' },
  { n: 'LOD 3', t: 'Site level', s: 'The bottom strip drops away and the left and right panels activate.' },
]

type Persona = {
  name: string
  scope: string
  bg: string
  border: string
  text: string
  chipBorder: string
  areas: string[]
}

const PERSONAS: Persona[] = [
  { name: 'Guest Experience Manager', scope: 'Movement and logistics',
    bg: '#E8F6EE', border: '#9CD9B6', text: '#1c5b3c', chipBorder: '#7CC9A0',
    areas: ['Pre-Trip', 'Trip', 'After-Trip'] },
  { name: 'Operations Manager', scope: 'Operational excellence',
    bg: '#E5F1FB', border: '#ABCDEA', text: '#1f4e79', chipBorder: '#86B2E1',
    areas: ['Fleet Availability', 'Utilization and Efficiency', 'Safety and Compliance', 'EV Infrastructure'] },
  { name: 'Environment Manager', scope: 'Environment dashboard',
    bg: '#E2F3F4', border: '#A6D5DA', text: '#134a52', chipBorder: '#7FC2CB',
    areas: ['Environmental Monitoring', 'Safety and Violation Detection'] },
  { name: 'Marine Operations Manager', scope: 'Guardian Reef',
    bg: '#EDEBFB', border: '#BCB2EA', text: '#3a2e7d', chipBorder: '#A294E4',
    areas: ['Reef Health', 'Capacity Management', 'Active Response'] },
]

function Tag({ label, color, border }: { label: string; color: string; border: string }) {
  return (
    <span style={{ display: 'inline-block', background: '#FFFFFF', border: `1px solid ${border}`, color, borderRadius: '999px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', padding: '3px 9px', marginTop: '8px' }}>{label}</span>
  )
}

function ShellCard({ c }: { c: Item }) {
  return (
    <div style={{ flex: '0 1 230px', minHeight: '60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: NEUTRAL.cardBg, border: `1px solid ${NEUTRAL.cardBorder}`, borderRadius: '9px', padding: '10px 12px', textAlign: 'center' }}>
      <div style={{ fontWeight: 700, color: '#1f2937', fontSize: '12px' }}>{c.t}</div>
      <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '2px' }}>{c.s}</div>
    </div>
  )
}

export function SystemMap() {
  return (
    <div style={{ margin: '28px 0', fontSize: '13px', lineHeight: 1.4 }}>
      <div style={{ display: 'flex', gap: '18px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '18px', fontSize: '12px', color: '#4b5563' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
          <span style={{ width: '14px', height: '14px', borderRadius: '4px', background: NEUTRAL.cardBg, border: `1px solid ${NEUTRAL.cardBorder}`, display: 'inline-block' }} />
          Agnostic, same for every persona
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
          <span style={{ width: '14px', height: '14px', borderRadius: '4px', background: '#CBC4F1', border: '1px solid #A294E4', display: 'inline-block' }} />
          Persona-based, set by login
        </span>
      </div>

      <div style={{ background: NEUTRAL.bg, border: `1px solid ${NEUTRAL.border}`, borderRadius: '14px', padding: '20px' }}>
        <div style={{ textAlign: 'center', fontWeight: 700, fontSize: '15px', color: '#1f2937' }}>Shared frame</div>
        <div style={{ textAlign: 'center', fontSize: '12px', color: NEUTRAL.text, opacity: 0.85, marginTop: '4px' }}>The interface, map, and navigation are identical for every persona</div>
        <div style={{ textAlign: 'center' }}><Tag label="Agnostic" color={NEUTRAL.text} border={NEUTRAL.cardBorder} /></div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginTop: '16px' }}>
          {SHELL_REGIONS.map((c) => <ShellCard key={c.t} c={c} />)}
        </div>
        <div style={{ marginTop: '18px' }}>
          <div style={{ textAlign: 'center', fontSize: '12px', fontWeight: 700, color: '#1f2937' }}>Map detail levels</div>
          <div style={{ textAlign: 'center', fontSize: '11px', color: '#6b7280', marginTop: '2px', marginBottom: '12px' }}>The 3D map is the shared surface. The detail level sets which panels show.</div>
          {LODS.map((l) => (
            <div key={l.n} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', background: '#FFFFFF', border: `1px solid ${NEUTRAL.cardBorder}`, borderRadius: '9px', padding: '10px 14px', marginTop: '8px' }}>
              <div style={{ fontWeight: 700, color: '#1f2937', fontSize: '12px', minWidth: '46px' }}>{l.n}</div>
              <div>
                <div style={{ fontWeight: 700, color: '#1f2937', fontSize: '12px' }}>{l.t}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{l.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ textAlign: 'center', color: '#9aa0a6', margin: '8px 0' }}>
        <div style={{ fontSize: '18px' }}>↓</div>
        <div style={{ fontSize: '12px' }}>your login fills the frame with one persona</div>
      </div>

      <div style={{ background: '#FAFAFB', border: '1px dashed #C4C9D2', borderRadius: '14px', padding: '20px' }}>
        <div style={{ textAlign: 'center', fontWeight: 700, fontSize: '15px', color: '#1f2937' }}>Persona views</div>
        <div style={{ textAlign: 'center', fontSize: '12px', color: '#4b5563', opacity: 0.9, marginTop: '4px' }}>What fills the frame depends on the login, one persona per user</div>
        <div style={{ textAlign: 'center' }}><Tag label="Persona-based" color="#3a2e7d" border="#A294E4" /></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '12px', marginTop: '16px', alignItems: 'start' }}>
          {PERSONAS.map((p) => (
            <div key={p.name} style={{ background: p.bg, border: `1px solid ${p.border}`, borderRadius: '12px', padding: '14px' }}>
              <div style={{ fontWeight: 700, color: p.text, fontSize: '13px', textAlign: 'center' }}>{p.name}</div>
              <div style={{ fontSize: '11px', color: p.text, opacity: 0.8, textAlign: 'center', marginTop: '2px', marginBottom: '10px' }}>{p.scope}</div>
              {p.areas.map((a) => (
                <div key={a} style={{ background: '#FFFFFF', border: `1px solid ${p.chipBorder}`, borderRadius: '8px', padding: '7px 10px', fontSize: '12px', fontWeight: 600, color: p.text, marginTop: '7px', textAlign: 'center' }}>{a}</div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

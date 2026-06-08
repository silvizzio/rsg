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

const SHELL_NAV: Item[] = [
  { t: '3D map', s: 'The shared surface' },
  { t: 'LOD 1', s: 'Destination' },
  { t: 'LOD 2', s: 'District' },
  { t: 'LOD 3', s: 'Site' },
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
    <div style={{ background: NEUTRAL.cardBg, border: `1px solid ${NEUTRAL.cardBorder}`, borderRadius: '9px', padding: '11px 10px', textAlign: 'center' }}>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', marginTop: '16px' }}>
          {SHELL_REGIONS.map((c) => <ShellCard key={c.t} c={c} />)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', marginTop: '10px' }}>
          {SHELL_NAV.map((c) => <ShellCard key={c.t} c={c} />)}
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '12px', marginTop: '16px' }}>
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

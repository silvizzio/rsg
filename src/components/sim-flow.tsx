import type { CSSProperties, ReactNode } from 'react'

const N = { bg: '#F1F2F4', border: '#D7DAE0', cardBg: '#E4E7EC', cardBorder: '#C4C9D2', text: '#374151', muted: '#6b7280' }
const SETUP = { bg: '#EEEDFE', border: '#C7C2F0', text: '#26215C' }
const RUN = { bg: '#6D5BD0', text: '#FFFFFF' }
const STOP = { bg: '#DC2626', text: '#FFFFFF' }
const TWIN = { bg: '#E6F1FB', border: '#A9CBEC' }
const WARN = { bg: '#FAEEDA', border: '#EECDA0', text: '#854F0B' }
const IDLE = { bg: '#F1F2F4', border: '#D7DAE0', text: '#6b7280' }
const MAP_PLAIN = '#EAF1F4'
const MAP_HEAT = 'radial-gradient(circle at 36% 40%, rgba(232,64,64,0.42), rgba(232,64,64,0) 44%), radial-gradient(circle at 64% 62%, rgba(245,166,35,0.40), rgba(245,166,35,0) 48%), #EAF1F4'
const LIB = { bg: '#FFFFFF', border: '#C4C9D2', text: '#374151' }
const STEP = { bg: '#EEEDFE', border: '#C7C2F0', text: '#26215C' }
const VISA = { bg: '#E2F3F4', border: '#A6D5DA', text: '#134a52' }
const VISB = { bg: '#E1F5EE', border: '#A7DDC9', text: '#0F6E56' }
const ENG = { bg: '#FAEEDA', border: '#EECDA0', text: '#854F0B' }

const rightWrap: CSSProperties = { flex: '0 0 30%', background: '#FBFCFD', border: `1px solid ${N.cardBorder}`, borderRadius: '8px', padding: '10px' }

function Tag({ label }: { label: string }) {
  return <span style={{ display: 'inline-block', background: '#FFFFFF', border: `1px solid ${N.cardBorder}`, color: N.text, borderRadius: '999px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', padding: '3px 9px' }}>{label}</span>
}
function Label({ text }: { text: string }) {
  return <div style={{ fontSize: '11px', fontWeight: 700, color: N.text, marginBottom: '2px' }}>{text}</div>
}
function Pill({ text }: { text: string }) {
  return <div style={{ background: '#FFFFFF', border: `1px solid ${N.cardBorder}`, borderRadius: '6px', padding: '6px 9px', fontSize: '11px', color: N.text, marginTop: '6px' }}>{text}</div>
}
function Banner({ tone, text }: { tone: { bg: string; border: string; text: string }; text: string }) {
  return <div style={{ background: tone.bg, border: `1px solid ${tone.border}`, color: tone.text, fontSize: '11px', fontWeight: 700, borderRadius: '6px', padding: '6px 8px', marginTop: '4px' }}>{text}</div>
}
function ResponseRow({ label, muted }: { label: string; muted?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', border: `1px solid ${N.cardBorder}`, borderRadius: '6px', padding: '6px 8px', marginTop: '6px', fontSize: '11px', color: muted ? N.muted : N.text }}>
      <span style={{ width: '12px', height: '12px', borderRadius: '999px', border: `1.5px solid ${N.cardBorder}`, flex: '0 0 auto' }} />
      <span>{label}</span>
    </div>
  )
}
function SetupCol({ cta }: { cta: string }) {
  return (
    <div style={{ flex: '0 0 27%', background: SETUP.bg, border: `1px solid ${SETUP.border}`, borderRadius: '8px', padding: '10px' }}>
      <Label text="Setup" />
      {['Simulation', 'Scenario preset', 'Scenario inputs', 'Layers shown'].map((x, i) => <Pill key={i} text={x} />)}
      <div style={{ background: cta === 'Stop Simulation' ? STOP.bg : RUN.bg, color: RUN.text, textAlign: 'center', fontSize: '11px', fontWeight: 700, borderRadius: '6px', padding: '8px', marginTop: '8px' }}>{cta}</div>
    </div>
  )
}
function TwinCol({ sub, mapBg, caption }: { sub: string; mapBg: string; caption: string }) {
  return (
    <div style={{ flex: 1, background: TWIN.bg, border: `1px solid ${TWIN.border}`, borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column' }}>
      <Label text="Digital twin" />
      <div style={{ fontSize: '10px', color: N.muted, marginBottom: '8px' }}>{sub}</div>
      <div style={{ flex: 1, minHeight: '120px', borderRadius: '6px', border: `1px dashed ${TWIN.border}`, background: mapBg, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '10px', fontSize: '11px', fontWeight: 700, color: '#42607e' }}>{caption}</div>
    </div>
  )
}
function RightDefault() {
  return (
    <div style={rightWrap}>
      <Label text="Forecast" />
      <Banner tone={IDLE} text="Not running" />
      <Pill text="Hero metric, idle" />
      <Pill text="KPI, idle" />
      <div style={{ fontSize: '10px', color: N.muted, marginTop: '6px' }}>Set the scenario, then Run</div>
    </div>
  )
}
function RightRunning() {
  return (
    <div style={rightWrap}>
      <Label text="Forecast" />
      <Banner tone={WARN} text="Forecasted outcome" />
      <Pill text="Hero metric" />
      <Pill text="Forecasted KPI" />
      <ResponseRow label="Recommended response" />
      <ResponseRow label="Do nothing" muted />
    </div>
  )
}
function StateCard({ tag, children }: { tag: string; children: ReactNode }) {
  return (
    <div style={{ background: '#FFFFFF', border: `1px solid ${N.cardBorder}`, borderRadius: '10px', padding: '12px' }}>
      <Tag label={tag} />
      <div style={{ display: 'flex', gap: '8px', alignItems: 'stretch', marginTop: '10px' }}>{children}</div>
    </div>
  )
}
export function SimState({ state }: { state: 'default' | 'running' }) {
  const cfg = {
    default: { tag: 'Default · Setup', sub: 'live, no forecast yet', bg: MAP_PLAIN, cap: 'live twin', right: <RightDefault />, cta: 'Run Simulation' },
    running: { tag: 'Running · Forecast', sub: 'forecast visualization', bg: MAP_HEAT, cap: 'wind field, coastal overlay, heatmap', right: <RightRunning />, cta: 'Stop Simulation' },
  }[state]
  return (
    <div style={{ margin: '20px 0', fontSize: '13px', lineHeight: 1.4 }}>
      <StateCard tag={cfg.tag}>
        <SetupCol cta={cfg.cta} />
        <TwinCol sub={cfg.sub} mapBg={cfg.bg} caption={cfg.cap} />
        {cfg.right}
      </StateCard>
    </div>
  )
}
function SrcBox({ tone, title, sub }: { tone: { bg: string; border: string; text: string }; title: string; sub: string }) {
  return (
    <div style={{ background: tone.bg, border: `1px solid ${tone.border}`, borderRadius: '8px', padding: '8px 10px', marginTop: '8px' }}>
      <div style={{ fontSize: '12px', fontWeight: 700, color: tone.text }}>{title}</div>
      <div style={{ fontSize: '10px', color: N.muted, marginTop: '2px' }}>{sub}</div>
    </div>
  )
}
function SrcArrow() {
  return <div style={{ textAlign: 'center', color: '#9aa0a6', fontSize: '14px', margin: '4px 0' }}>↓</div>
}
function StepBox({ tone, text, bold }: { tone: { bg: string; border: string; text: string }; text: string; bold?: boolean }) {
  return <div style={{ background: tone.bg, border: `1px solid ${tone.border}`, borderRadius: '6px', padding: '7px 9px', fontSize: '11px', fontWeight: bold ? 700 : 400, color: tone.text, marginTop: '4px' }}>{text}</div>
}
function ProvLabel({ text }: { text: string }) {
  return <div style={{ fontSize: '10px', fontWeight: 700, color: '#1f2937', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>{text}</div>
}
function EngLine({ text }: { text: string }) {
  return <div style={{ fontSize: '10px', color: N.muted, marginTop: '4px', paddingLeft: '2px' }}>{text}</div>
}
export function SimSources() {
  return (
    <div style={{ margin: '24px 0', fontSize: '13px', lineHeight: 1.4 }}>
      <div style={{ background: N.bg, border: `1px solid ${N.border}`, borderRadius: '14px', padding: '18px', display: 'flex', gap: '0', alignItems: 'stretch', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 240px', minWidth: '220px', borderRight: `1px dashed ${N.cardBorder}`, paddingRight: '18px' }}>
          <ProvLabel text="Modeled upstream (outside the twin)" />
          <SrcBox tone={ENG} title="Specialist engines" sub="one per simulation, movement, climate, energy, coastal" />
          <EngLine text="MassMotion, PTV, Aimsun, Pathfinder, movement" />
          <EngLine text="WRF + CFD, wind" />
          <EngLine text="Ladybug Tools, thermal comfort" />
          <EngLine text="HOMER Pro, energy" />
          <EngLine text="ADCIRC, Delft3D, MIKE, SWAN, coastal" />
          <EngLine text="ReefMod-GBR, coral reef" />
          <SrcArrow />
          <SrcBox tone={LIB} title="Scenario presets and inputs" sub="the selectable controls" />
        </div>
        <div style={{ flex: '1 1 300px', minWidth: '260px', paddingLeft: '18px' }}>
          <ProvLabel text="Run and visualized in the IOC twin" />
          <StepBox tone={STEP} text="Set a scenario: preset, inputs, layers" />
          <SrcArrow />
          <StepBox tone={STEP} text="Run the forecast" bold />
          <SrcArrow />
          <div style={{ display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 120px', background: VISA.bg, border: `1px solid ${VISA.border}`, borderRadius: '6px', padding: '7px 9px', fontSize: '10px', color: VISA.text }}>Twin visualizes: heatmap, wind field, coastal overlay</div>
            <div style={{ flex: '1 1 120px', background: VISB.bg, border: `1px solid ${VISB.border}`, borderRadius: '6px', padding: '7px 9px', fontSize: '10px', color: VISB.text }}>Forecast and recommended responses</div>
          </div>
          <div style={{ fontSize: '10px', color: N.muted, marginTop: '8px' }}>Exploration only. Nothing is dispatched. The twin runs and shows the scenario; it does not author the model.</div>
        </div>
      </div>
    </div>
  )
}

import type { CSSProperties, ReactNode } from 'react'

const N = { bg: '#F1F2F4', border: '#D7DAE0', cardBg: '#E4E7EC', cardBorder: '#C4C9D2', text: '#374151', muted: '#6b7280' }
const SETUP = { bg: '#EEEDFE', border: '#C7C2F0', text: '#26215C' }
const RUN = { bg: '#6D5BD0', text: '#FFFFFF' }
const STOP = { bg: '#DC2626', text: '#FFFFFF' }
const TWIN = { bg: '#E6F1FB', border: '#A9CBEC' }
const WARN = { bg: '#FAEEDA', border: '#EECDA0', text: '#854F0B' }
const GOOD = { bg: '#E1F5EE', border: '#A7DDC9', text: '#0F6E56' }
const IMPL = { bg: '#1D9E75', text: '#FFFFFF' }
const DONE = { bg: '#D6F0E5', border: '#A7DDC9', text: '#0F6E56' }
const MAP_PLAIN = '#EAF1F4'
const MAP_HEAT = 'radial-gradient(circle at 36% 40%, rgba(232,64,64,0.42), rgba(232,64,64,0) 44%), radial-gradient(circle at 64% 62%, rgba(245,166,35,0.40), rgba(245,166,35,0) 48%), #EAF1F4'
const MAP_EASE = 'radial-gradient(circle at 50% 48%, rgba(29,158,117,0.32), rgba(29,158,117,0) 54%), #EAF1F4'
const MM = { bg: '#FAEEDA', border: '#EECDA0', text: '#854F0B' }
const PTV = { bg: '#E6F1FB', border: '#A9CBEC', text: '#1f4e79' }
const LIB = { bg: '#FFFFFF', border: '#C4C9D2', text: '#374151' }
const STEP = { bg: '#EEEDFE', border: '#C7C2F0', text: '#26215C' }
const VISA = { bg: '#E2F3F4', border: '#A6D5DA', text: '#134a52' }
const VISB = { bg: '#E1F5EE', border: '#A7DDC9', text: '#0F6E56' }
const STEPI = { bg: '#E1F5EE', border: '#A7DDC9', text: '#0F6E56' }

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
function ActionRow({ done }: { done: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', background: '#FFFFFF', border: `1px solid ${N.cardBorder}`, borderRadius: '6px', padding: '6px 8px', marginTop: '6px', fontSize: '11px', color: N.text }}>
      <span>Recommended action</span>
      {done ? (
        <span style={{ background: DONE.bg, border: `1px solid ${DONE.border}`, color: DONE.text, fontSize: '10px', fontWeight: 700, borderRadius: '5px', padding: '3px 8px', whiteSpace: 'nowrap' }}>Implemented</span>
      ) : (
        <span style={{ background: IMPL.bg, color: IMPL.text, fontSize: '10px', fontWeight: 700, borderRadius: '5px', padding: '3px 8px', whiteSpace: 'nowrap' }}>Implement</span>
      )}
    </div>
  )
}
function SetupCol({ cta }: { cta: string }) {
  return (
    <div style={{ flex: '0 0 27%', background: SETUP.bg, border: `1px solid ${SETUP.border}`, borderRadius: '8px', padding: '10px' }}>
      <Label text="Setup" />
      {['Forecast type/phase', 'Event to simulate', 'Parameters', 'Action plan'].map((x, i) => <Pill key={i} text={x} />)}
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
      <Label text="Current readings" />
      <Pill text="Live reading" />
      <Pill text="Live reading" />
      <Pill text="Live reading" />
      <div style={{ fontSize: '10px', color: N.muted, marginTop: '6px' }}>Forecast appears after the run</div>
    </div>
  )
}
function RightRunning() {
  return (
    <div style={rightWrap}>
      <Label text="Forecast" />
      <Banner tone={WARN} text="Forecasted outcome" />
      <Pill text="Forecasted metric" />
      <Pill text="Forecasted KPI" />
      <ActionRow done={false} />
      <ActionRow done={false} />
    </div>
  )
}
function RightImplement() {
  return (
    <div style={rightWrap}>
      <Label text="Forecast" />
      <Banner tone={GOOD} text="Outcome shifting" />
      <Pill text="Re-anchored metric" />
      <Pill text="Re-anchored KPI" />
      <ActionRow done={true} />
      <ActionRow done={false} />
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
export function SimState({ state }: { state: 'default' | 'running' | 'implement' }) {
  const cfg = {
    default: { tag: 'Default · Setup', sub: 'live, no forecast yet', bg: MAP_PLAIN, cap: 'live twin', right: <RightDefault />, cta: 'Run Simulation' },
    running: { tag: 'Running · Forecast', sub: 'forecast visualization', bg: MAP_HEAT, cap: 'crowd density, vehicle traffic', right: <RightRunning />, cta: 'Stop Simulation' },
    implement: { tag: 'Implementation · Acting', sub: 're-run, action applied', bg: MAP_EASE, cap: 'easing after the action', right: <RightImplement />, cta: 'Stop Simulation' },
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
export function SimSources() {
  return (
    <div style={{ margin: '24px 0', fontSize: '13px', lineHeight: 1.4 }}>
      <div style={{ background: N.bg, border: `1px solid ${N.border}`, borderRadius: '14px', padding: '18px', display: 'flex', gap: '0', alignItems: 'stretch', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 240px', minWidth: '220px', borderRight: `1px dashed ${N.cardBorder}`, paddingRight: '18px' }}>
          <ProvLabel text="Modeled upstream (outside the twin)" />
          <SrcBox tone={MM} title="MassMotion" sub="pedestrian and human crowd events" />
          <SrcBox tone={PTV} title="PTV + Aimsun" sub="vehicle and traffic events" />
          <SrcArrow />
          <SrcBox tone={LIB} title="Events and action plans" sub="the selectable library" />
        </div>
        <div style={{ flex: '1 1 300px', minWidth: '260px', paddingLeft: '18px' }}>
          <ProvLabel text="Run and visualized in the IOC twin" />
          <StepBox tone={STEP} text="Select an event and action plan, set the run parameters" />
          <SrcArrow />
          <StepBox tone={STEP} text="Run the forecast" bold />
          <SrcArrow />
          <div style={{ display: 'flex', gap: '6px', marginTop: '4px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 120px', background: VISA.bg, border: `1px solid ${VISA.border}`, borderRadius: '6px', padding: '7px 9px', fontSize: '10px', color: VISA.text }}>Twin visualizes: crowd density, vehicle traffic</div>
            <div style={{ flex: '1 1 120px', background: VISB.bg, border: `1px solid ${VISB.border}`, borderRadius: '6px', padding: '7px 9px', fontSize: '10px', color: VISB.text }}>Forecast and recommended actions</div>
          </div>
          <SrcArrow />
          <StepBox tone={STEPI} text="Implement, routes to live operations" bold />
          <div style={{ fontSize: '10px', color: N.muted, marginTop: '8px' }}>The twin runs and shows the scenario. It does not author events or action plans.</div>
        </div>
      </div>
    </div>
  )
}

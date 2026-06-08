import Link from 'next/link'
import DocHeader from '@/components/doc-header'
import { getSearchIndex } from '@/lib/search'

export default function Home() {
  const searchDocs = getSearchIndex()

  const sections = [
    { title: 'Getting Started', desc: 'Start here: what the IOC is and how the interface works.', links: [
      { label: 'Overview', desc: 'Personas, map detail levels, and coverage', href: '/docs/01-overview' },
      { label: 'Interface guide', desc: 'Layout, personas, alerts, CCTV, and map navigation', href: '/docs/02-interface-guide' },
    ]},
    { title: 'Persona Views', desc: 'The four operator roles and what each one sees.', links: [
      { label: 'Guest Experience Manager', desc: 'Guest flow and experience, station by station', href: '/docs/03-gxm' },
      { label: 'Operations Manager', desc: 'Fleet, utilization, safety, and EV charging', href: '/docs/04-ops' },
      { label: 'Environment Manager', desc: 'Air, wind, water, and violation detection', href: '/docs/05-env' },
      { label: 'Marine Operations Manager', desc: 'Reef health, dive capacity, and response', href: '/docs/06-mo' },
    ]},
    { title: 'Simulation', desc: 'Rehearse guest-number and weather what-ifs on the twin.', links: [
      { label: 'Simulation', desc: 'Crowd, traffic, mobility, and weather scenarios', href: '/docs/07-simulation' },
    ]},
    { title: 'Reference', desc: 'Glossary, shortcuts, and shared status values.', links: [
      { label: 'Reference', desc: 'Glossary, shortcuts, and shared status values', href: '/docs/08-reference' },
    ]},
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'hsl(var(--background))', color: 'hsl(var(--foreground))', display: 'flex', flexDirection: 'column', paddingTop: '48px' }}>
      <DocHeader searchDocs={searchDocs} />

      <main style={{ maxWidth: '920px', margin: '0 auto', padding: '48px 16px', flex: 1, width: '100%' }}>

        <div className="mb-12">
          <h1 className="text-3xl font-medium mb-2">RSG Integrated Operations Centre</h1>
          <p className="text-muted-foreground text-sm max-w-xl">
            Operator guide for the RSG IOC Digital Twin. Monitor Red Sea Global destinations across four operator roles and three map detail levels.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          <Link href="/docs/01-overview" className="group block rounded-lg border border-border overflow-hidden transition-colors" style={{ position: 'relative', minHeight: '150px', background: 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--background)) 100%)' }}>
            <div style={{ position: 'absolute', top: '14px', right: '14px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px' }}>
              <p style={{ fontSize: '14px', fontWeight: 500, color: 'hsl(var(--foreground))', marginBottom: '4px' }}>Platform overview</p>
              <p style={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))', lineHeight: 1.5 }}>What the IOC is, the four personas, the map detail levels, and destination coverage.</p>
            </div>
          </Link>
          <Link href="/docs/02-interface-guide" className="group block rounded-lg border border-border overflow-hidden transition-colors" style={{ position: 'relative', minHeight: '150px', background: 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--background)) 100%)' }}>
            <div style={{ position: 'absolute', top: '14px', right: '14px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="hsl(var(--muted-foreground))" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px' }}>
              <p style={{ fontSize: '14px', fontWeight: 500, color: 'hsl(var(--foreground))', marginBottom: '4px' }}>Interface guide</p>
              <p style={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))', lineHeight: 1.5 }}>The persona bar, 3D map canvas, side panels, alert tray, and map LOD navigation.</p>
            </div>
          </Link>
        </div>

        <div className="mb-8 p-4 sm:p-6 rounded-lg flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-8" style={{ background: 'hsl(var(--muted))', border: '1px solid hsl(var(--border))' }}>
          <div>
            <p className="text-xs uppercase tracking-wide mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>Getting started</p>
            <h2 className="text-base font-medium mb-1" style={{ color: 'hsl(var(--foreground))' }}>New to the RSG IOC?</h2>
            <p className="text-xs leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>Start with the overview to understand the personas and the map detail levels, then read the interface guide.</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <Link href="/docs/01-overview" className="inline-flex items-center gap-1.5 text-xs rounded-md px-3 py-1.5" style={{ background: 'transparent', color: 'hsl(var(--foreground))', border: '1px solid hsl(var(--border))', whiteSpace: 'nowrap' }}>
              Overview
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
            </Link>
            <Link href="/docs/02-interface-guide" className="inline-flex items-center gap-1.5 text-xs rounded-md px-3 py-1.5" style={{ background: 'transparent', color: 'hsl(var(--foreground))', border: '1px solid hsl(var(--border))', whiteSpace: 'nowrap' }}>
              Interface guide
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
            </Link>
            <Link href="/docs/08-reference" className="inline-flex items-center gap-1.5 text-xs rounded-md px-3 py-1.5" style={{ background: 'transparent', color: 'hsl(var(--foreground))', border: '1px solid hsl(var(--border))', whiteSpace: 'nowrap' }}>
              Reference
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
            </Link>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-base font-medium">Browse by section</h2>
        </div>

        <div className="flex flex-col gap-4 mb-16">
          {sections.map((section) => (
            <div key={section.title} className="bg-background border border-border rounded-lg overflow-hidden">
              <div style={{ padding: '16px 20px 20px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '6px', color: 'hsl(var(--foreground))' }}>{section.title}</h3>
                <p style={{ fontSize: '11px', color: 'hsl(var(--muted-foreground))', lineHeight: 1.5, marginBottom: '12px' }}>{section.desc}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>
                  {section.links.map((link: { label: string, desc: string, href: string }) => (
                    <Link key={link.href} href={link.href} className="group block rounded-md border border-border transition-all hover:border-foreground/20 hover:shadow-sm" style={{ background: 'hsl(var(--background))', padding: '12px 14px' }}>
                      <p style={{ fontSize: '12px', fontWeight: 600, color: 'hsl(var(--foreground))', marginBottom: '2px', lineHeight: 1.3 }}>{link.label}</p>
                      <p style={{ fontSize: '11px', color: 'hsl(var(--muted-foreground))', lineHeight: 1.4 }}>{link.desc}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

      <footer style={{ borderTop: '1px solid hsl(var(--border))', padding: '16px', maxWidth: '1440px', width: '100%', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
        <p style={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))' }}>RSG Integrated Operations Centre Documentation v1.0</p>
        <p style={{ fontSize: '12px', color: 'hsl(var(--muted-foreground))' }}>Vizzio June 2026 Confidential</p>
      </footer>
    </div>
  )
}

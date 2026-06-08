import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import DocHeader from '@/components/doc-header'
import { getSearchIndex } from '@/lib/search'

function cover(file: string): string | null {
  try {
    const buf = fs.readFileSync(path.join(process.cwd(), 'private/images/docs', file))
    const ext = (file.split('.').pop() || '').toLowerCase()
    const mime = ext === 'png' ? 'image/png' : ext === 'svg' ? 'image/svg+xml' : 'image/jpeg'
    return `data:${mime};base64,${buf.toString('base64')}`
  } catch {
    return null
  }
}

export default function Home() {
  const searchDocs = getSearchIndex()
  const heroOverview = cover('03-gxm-lod1-1.jpg')
  const heroInterface = cover('04-ops-lod1-1.jpg')

  const sections = [
    { title: 'Persona Views', desc: 'The four operator roles and what each one sees.', links: [
      { label: 'Guest Experience Manager', desc: 'Guest flow and experience, station by station', href: '/docs/03-gxm', cover: '03-gxm-lod3-pre-trip.jpg' },
      { label: 'Operations Manager', desc: 'Fleet, utilization, safety, and EV charging', href: '/docs/04-ops', cover: '04-ops-lod3-fleet-availability.jpg' },
      { label: 'Environment Manager', desc: 'Air, wind, water, and violation detection', href: '/docs/05-env', cover: '05-env-lod3-safety-violation-detection.jpg' },
      { label: 'Marine Operations Manager', desc: 'Reef health, dive capacity, and response', href: '/docs/06-mo', cover: '06-mo-lod3-active-response.jpg' },
    ]},
    { title: 'Simulation', desc: 'Rehearse crowd and fleet what-ifs on the twin.', links: [
      { label: 'Crowd', desc: 'Crowd density forecasts on the twin', href: '/docs/07-simulation', cover: '07-simulation-after.jpg' },
      { label: 'Traffic', desc: 'Fleet and vehicle flow forecasts', href: '/docs/07-simulation', cover: '07-simulation-ops-after.jpg' },
    ]},
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'hsl(var(--background))', color: 'hsl(var(--foreground))', display: 'flex', flexDirection: 'column', paddingTop: '48px' }}>
      <DocHeader searchDocs={searchDocs} />

      <main style={{ maxWidth: '920px', margin: '0 auto', padding: '48px 16px', flex: 1, width: '100%' }}>

        <div className="mb-12">
          <h1 className="text-3xl font-medium mb-2">RSG Integrated Operations Centre</h1>
          <p className="text-muted-foreground text-sm">
            Operator guide for the RSG IOC Digital Twin. Monitor Shura Island across four operator roles and three map detail levels.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14">
          <Link href="/docs/01-overview" className="group block rounded-lg border border-border overflow-hidden transition-colors" style={{ position: 'relative', minHeight: '180px', backgroundImage: heroOverview ? `linear-gradient(to top, rgba(10,12,16,0.82) 0%, rgba(10,12,16,0.35) 50%, rgba(10,12,16,0.1) 100%), url(${heroOverview})` : 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--background)) 100%)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div style={{ position: 'absolute', top: '14px', right: '14px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px' }}>
              <p style={{ fontSize: '15px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>Platform overview</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>What the IOC is, the four personas, the map detail levels, and destination coverage.</p>
            </div>
          </Link>
          <Link href="/docs/02-interface-guide" className="group block rounded-lg border border-border overflow-hidden transition-colors" style={{ position: 'relative', minHeight: '180px', backgroundImage: heroInterface ? `linear-gradient(to top, rgba(10,12,16,0.82) 0%, rgba(10,12,16,0.35) 50%, rgba(10,12,16,0.1) 100%), url(${heroInterface})` : 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--background)) 100%)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div style={{ position: 'absolute', top: '14px', right: '14px' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
            </div>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px' }}>
              <p style={{ fontSize: '15px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>Interface guide</p>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>The persona bar, 3D map canvas, side panels, alert tray, and map LOD navigation.</p>
            </div>
          </Link>
        </div>

        <div className="mb-8 p-4 sm:p-6 rounded-lg flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-8" style={{ background: '#ECE3D5', border: '1px solid hsl(var(--border))' }}>
          <div>
            <p className="text-xs uppercase tracking-wide mb-2" style={{ color: 'hsl(var(--muted-foreground))' }}>Getting started</p>
            <h2 className="text-base font-medium mb-1" style={{ color: 'hsl(var(--foreground))' }}>New to the RSG IOC?</h2>
            <p className="text-xs leading-relaxed" style={{ color: 'hsl(var(--muted-foreground))' }}>Start with the overview to understand the personas and the map detail levels, then read the interface guide.</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '8px' }}>
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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                  {section.links.map((link: { label: string, desc: string, href: string, cover?: string }) => {
                    const img = link.cover ? cover(link.cover) : null
                    return (
                      <Link key={link.href + link.label} href={link.href} className="group block rounded-md border border-border overflow-hidden transition-all hover:border-foreground/20 hover:shadow-sm" style={{ background: 'hsl(var(--background))' }}>
                        {img && (
                          <div style={{ height: '84px', backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                        )}
                        <div style={{ padding: '12px 14px' }}>
                          <p style={{ fontSize: '12px', fontWeight: 600, color: 'hsl(var(--foreground))', marginBottom: '2px', lineHeight: 1.3 }}>{link.label}</p>
                          <p style={{ fontSize: '11px', color: 'hsl(var(--muted-foreground))', lineHeight: 1.4 }}>{link.desc}</p>
                        </div>
                      </Link>
                    )
                  })}
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

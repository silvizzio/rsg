import { NextRequest, NextResponse } from 'next/server'
import puppeteer, { type Browser } from 'puppeteer-core'
import chromium from '@sparticuz/chromium'
import { PDFDocument } from 'pdf-lib'

export const runtime = 'nodejs'
export const maxDuration = 60
export const dynamic = 'force-dynamic'

const PRINT_CSS = `
  @page { background: #fff; }
  @media print {
    body * { visibility: hidden !important; }
    article, article * { visibility: visible !important; }
    article { position: absolute; inset: 0; width: 100%; margin: 0; padding: 0; }
    .no-print { display: none !important; }
    img { max-width: 100% !important; height: auto !important; page-break-inside: avoid; }
    table, tr, td, th { page-break-inside: avoid; }
    h2, h3 { page-break-after: avoid; }
  }
`

const HEADER = `
  <div style="width:100%;font-family:Inter,Arial,sans-serif;font-size:7px;color:#7a7a7a;padding:0 16mm;display:flex;justify-content:space-between;">
    <span>RSG IOC · Platform Documentation v1.0</span>
    <span>Confidential · Authorized Stakeholders Only</span>
  </div>
`

const FOOTER = `
  <div style="width:100%;font-family:Inter,Arial,sans-serif;font-size:7px;color:#7a7a7a;padding:0 16mm;display:flex;justify-content:space-between;">
    <span>RSG IOC · Vizzio · June 2026 · Confidential</span>
    <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
  </div>
`

function getOrigin(req: NextRequest): string {
  const host = req.headers.get('host') || 'localhost:3000'
  const proto = req.headers.get('x-forwarded-proto') || (host.includes('localhost') ? 'http' : 'https')
  return `${proto}://${host}`
}

async function getBrowser(): Promise<Browser> {
  const onVercel = !!process.env.VERCEL || !!process.env.AWS_LAMBDA_FUNCTION_NAME
  if (onVercel) {
    return puppeteer.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    })
  }
  const local =
    process.env.PUPPETEER_EXECUTABLE_PATH ||
    (process.platform === 'darwin'
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      : process.platform === 'win32'
        ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
        : '/usr/bin/google-chrome')
  return puppeteer.launch({ executablePath: local, headless: true, args: ['--no-sandbox'] })
}

async function renderChapter(browser: Browser, origin: string, slug: string): Promise<Uint8Array> {
  const page = await browser.newPage()
  try {
    await page.goto(`${origin}/docs/${slug}`, { waitUntil: 'networkidle0', timeout: 45000 })
    await page.evaluate(() => {
      const article = document.querySelector('article')
      if (!article) return
      const h1 = document.querySelector('h1')
      if (!h1 || article.contains(h1)) return
      const header = (h1.closest('header') as HTMLElement) || (h1.parentElement as HTMLElement)
      if (!header) return
      const clone = header.cloneNode(true) as HTMLElement
      clone.querySelectorAll('button, a, .no-print').forEach((el) => el.remove())
      article.insertBefore(clone, article.firstChild)
    })
    await page.addStyleTag({ content: PRINT_CSS })
    await page.emulateMediaType('print')
    return await page.pdf({
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: HEADER,
      footerTemplate: FOOTER,
      margin: { top: '20mm', bottom: '16mm', left: '0mm', right: '0mm' },
    })
  } finally {
    await page.close()
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get('slug')
  const full = searchParams.get('full')
  const origin = getOrigin(req)

  let browser: Browser | undefined
  try {
    browser = await getBrowser()

    if (full) {
      const list = await browser.newPage()
      await list.goto(`${origin}/`, { waitUntil: 'networkidle0', timeout: 45000 })
      const slugs: string[] = await list.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href^="/docs/"]')) as HTMLAnchorElement[]
        const set = new Set<string>()
        links.forEach(a => {
          const s = a.getAttribute('href')?.replace('/docs/', '').split('#')[0].split('?')[0]
          if (s) set.add(s)
        })
        return Array.from(set)
      })
      await list.close()

      const merged = await PDFDocument.create()
      for (const s of slugs) {
        const buf = await renderChapter(browser, origin, s)
        const doc = await PDFDocument.load(buf)
        const pages = await merged.copyPages(doc, doc.getPageIndices())
        pages.forEach(p => merged.addPage(p))
      }
      const out = await merged.save()
      return new NextResponse(Buffer.from(out), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="RSG-IOC-Platform-Documentation.pdf"',
        },
      })
    }

    if (!slug) {
      return NextResponse.json({ error: 'Missing slug' }, { status: 400 })
    }

    const pdf = await renderChapter(browser, origin, slug)
    return new NextResponse(Buffer.from(pdf), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="RSG-IOC-${slug}.pdf"`,
      },
    })
  } catch (e) {
    console.error('PDF route error:', e)
    return NextResponse.json({ error: (e as Error).message }, { status: 500 })
  } finally {
    if (browser) await browser.close()
  }
}

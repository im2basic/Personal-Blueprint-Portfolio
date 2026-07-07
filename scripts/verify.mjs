import { chromium } from 'playwright-core'
import path from 'node:path'
import os from 'node:os'

const executablePath = path.join(
  os.homedir(),
  'Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'
)
const OUT = '/private/tmp/claude-501/-Users-tata-Desktop-ios-apps/be6638f4-e9c8-4fc8-9ed4-997ab13749b5/scratchpad'

const browser = await chromium.launch({ executablePath })

// -- Desktop (full mode) --
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const errors = []
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message))
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()) })

await page.goto('http://localhost:4173/', { waitUntil: 'networkidle' })
await page.waitForTimeout(2800)
await page.screenshot({ path: path.join(OUT, '1-landing.png') })

// mid-transition
await page.mouse.wheel(0, 1700)
await page.waitForTimeout(700)
await page.screenshot({ path: path.join(OUT, '2-mid-transition.png') })

// end of transition / hero built
await page.mouse.wheel(0, 2200)
await page.waitForTimeout(700)
await page.screenshot({ path: path.join(OUT, '3-built.png') })

// projects section
await page.evaluate(() => document.querySelector('#projects')?.scrollIntoView())
await page.waitForTimeout(900)
await page.screenshot({ path: path.join(OUT, '4-projects.png') })

// open a project window
await page.click('#projects button')
await page.waitForTimeout(600)
await page.screenshot({ path: path.join(OUT, '5-window.png') })

// esc closes + scroll position preserved
await page.keyboard.press('Escape')
await page.waitForTimeout(400)
const windowGone = await page.evaluate(() => !document.querySelector('[role="dialog"]'))

// contact
await page.evaluate(() => document.querySelector('#contact')?.scrollIntoView())
await page.waitForTimeout(900)
await page.screenshot({ path: path.join(OUT, '6-contact.png') })

await page.close()

// -- Mobile (lite mode) --
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } })
mobile.on('pageerror', (e) => errors.push('mobile pageerror: ' + e.message))
await mobile.goto('http://localhost:4173/', { waitUntil: 'networkidle' })
await mobile.waitForTimeout(2500)
await mobile.screenshot({ path: path.join(OUT, '7-mobile.png') })
await mobile.evaluate(() => document.querySelector('#projects')?.scrollIntoView())
await mobile.waitForTimeout(800)
await mobile.click('#projects button')
await mobile.waitForTimeout(500)
await mobile.screenshot({ path: path.join(OUT, '8-mobile-window.png') })
await mobile.close()

await browser.close()
console.log('windowGone:', windowGone)
console.log(errors.length ? 'ERRORS:\n' + errors.join('\n') : 'no page errors')

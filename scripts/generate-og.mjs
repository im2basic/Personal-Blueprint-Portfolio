import { chromium } from 'playwright-core'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import os from 'node:os'

const dir = path.dirname(fileURLToPath(import.meta.url))
const executablePath = path.join(
  os.homedir(),
  'Library/Caches/ms-playwright/chromium-1223/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing'
)

const browser = await chromium.launch({ executablePath })
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.goto('file://' + path.join(dir, 'og.html'), { waitUntil: 'networkidle' })
await page.screenshot({ path: path.join(dir, '..', 'public', 'og.png') })
await browser.close()
console.log('og.png written')

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
const page = await browser.newPage()
await page.goto('file://' + path.join(dir, 'resume.html'), { waitUntil: 'networkidle' })
await page.pdf({
  path: path.join(dir, '..', 'public', 'resume.pdf'),
  format: 'Letter',
  printBackground: true,
  margin: { top: '0', bottom: '0', left: '0', right: '0' },
})
await browser.close()
console.log('resume.pdf written')

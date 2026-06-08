const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  
  try {
    console.log('Checking for login form...');
    await page.waitForSelector('#login-email', { timeout: 3000 });
    console.log('Logging in...');
    await page.type('#login-email', 'opusone');
    await page.type('#login-password', 'Opus@2026');
    await page.click('button[type="submit"]');
  } catch (e) {
    console.log('No login form found, assuming already logged in or dashboard loads directly.');
  }
  
  console.log('Waiting for dashboard to load...');
  await page.waitForSelector('.ops-card', { timeout: 10000 });

  const sizes = [
    { width: 1024, height: 768, name: '1024' },
    { width: 1366, height: 768, name: '1366' },
    { width: 1920, height: 1080, name: '1920' },
  ];

  const artifactDir = "C:\\Users\\aadhy\\.gemini\\antigravity-ide\\brain\\24d86917-1b9f-46f1-ae44-c34932a5f1d8";

  for (const s of sizes) {
    console.log(`Capturing ${s.name}...`);
    await page.setViewport({ width: s.width, height: s.height });
    await new Promise(r => setTimeout(r, 2000)); // allow layout/charts to settle
    await page.screenshot({ path: path.join(artifactDir, `baseline_${s.name}.png`), fullPage: false });
  }

  console.log('Done.');
  await browser.close();
})();

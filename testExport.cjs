const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
  page.on('pageerror', error => console.log('BROWSER ERROR:', error.message));

  console.log('Navigating...');
  await page.goto('http://localhost:5174/');
  await new Promise(r => setTimeout(r, 2000));
  
  const h1 = await page.$eval('h1', el => el.textContent).catch(() => '');
  console.log('Heading:', h1);
  if (h1.includes('Access')) {
    await page.type('input[type=text]', 'opusone');
    await page.type('input[type=password]', 'Opus@2026');
    await page.click('button');
    await new Promise(r => setTimeout(r, 2000));
  }
  
  console.log('Testing Export Excel...');
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Export Report'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Export Excel'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 3000));

  console.log('Testing Export PDF...');
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Export Report'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Export PDF'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 5000));

  console.log('Done.');
  await browser.close();
})();

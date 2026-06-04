const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1280, height: 800 });

  await page.goto('http://localhost:5174/');
  await new Promise(r => setTimeout(r, 2000));
  
  const h1 = await page.$eval('h1', el => el.textContent).catch(() => '');
  if (h1.includes('Access')) {
    await page.type('input[type=text]', 'opusone');
    await page.type('input[type=password]', 'Opus@2026');
    await page.click('button');
    await new Promise(r => setTimeout(r, 2000));
  }

  // Expand sidebar
  await page.evaluate(() => {
    const btn = document.querySelector('button[title="Expand Sidebar"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  const metrics = await page.evaluate(() => {
    // Look for the element with classes "flex flex-1 gap-4 min-w-0"
    const apqdContainer = document.querySelector('.flex.flex-1.gap-4.min-w-0');
    if (!apqdContainer) return { error: 'APQD container not found' };

    const topStrip = apqdContainer.parentElement;
    
    return {
      topStripWidth: topStrip.clientWidth,
      oeeCardWidth: topStrip.children[0].clientWidth,
      apqdContainerWidth: topStrip.children[1].clientWidth,
      bestPerformingWidth: topStrip.children[2].clientWidth,
      apqdChildrenWidths: Array.from(topStrip.children[1].children).map(c => c.clientWidth)
    };
  });

  console.log('Metrics:', metrics);

  await browser.close();
})();

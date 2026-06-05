const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Set viewport to exactly 1280 (xl breakpoint)
  await page.setViewport({ width: 1280, height: 800 });

  console.log('Navigating...');
  await page.goto('http://localhost:5174/');
  await new Promise(r => setTimeout(r, 2000));
  
  // Login
  const h1 = await page.$eval('h1', el => el.textContent).catch(() => '');
  if (h1.includes('Access')) {
    await page.type('input[type=text]', 'opusone');
    await page.type('input[type=password]', 'Opus@2026');
    await page.click('button');
    await new Promise(r => setTimeout(r, 2000));
  }

  // Sidebar is collapsed initially (width ~80px).
  // Let's expand it.
  await page.evaluate(() => {
    const btn = document.querySelector('button[title="Expand Sidebar"]');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  // Now measure the Global Command Strip
  const stripWidths = await page.evaluate(() => {
    const strip = document.querySelector('.flex.flex-col.xl\\:flex-row');
    if (!strip) return null;
    const parentWidth = strip.parentElement.clientWidth;
    const scrollWidth = strip.scrollWidth;
    const childrenWidths = Array.from(strip.children).map(c => c.scrollWidth);
    return { parentWidth, scrollWidth, childrenWidths };
  });

  console.log('Global Command Strip Widths:', stripWidths);

  // Measure Plant Modules
  const plantModules = await page.evaluate(() => {
    const grid = document.querySelector('.grid.grid-cols-1.xl\\:grid-cols-2');
    if (!grid) return null;
    const parentWidth = grid.clientWidth;
    const firstCard = grid.children[0];
    if (!firstCard) return null;
    
    // The inner content flex container
    const innerFlex = firstCard.querySelector('.p-6.flex');
    return {
      parentWidth,
      gridWidth: grid.scrollWidth,
      cardWidth: firstCard.clientWidth,
      innerScrollWidth: innerFlex ? innerFlex.scrollWidth : 0
    };
  });

  console.log('Plant Module Widths:', plantModules);

  await browser.close();
})();

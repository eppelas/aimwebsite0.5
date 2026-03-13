import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
    page.on('pageerror', err => console.log('BROWSER ERROR:', err.toString()));

    await page.goto('http://localhost:3001', { waitUntil: 'networkidle0' });

    console.log('Page loaded!');
    await browser.close();
})();

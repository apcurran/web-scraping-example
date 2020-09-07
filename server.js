"use strict";

// Note: This is all publicly available information, there is no scraping or use of private data in any way.

const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

puppeteer.use(StealthPlugin());

async function scrapeProduct(url) {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
    
        await page.goto(url);
    
        const [imgEl] = await page.$x('//*[@id="imgBlkFront"]');
        const imgElSrc = await imgEl.getProperty("src");
        const imgUrl = await imgElSrc.jsonValue();
    
        const [titleEl] = await page.$x('//*[@id="productTitle"]');
        const titleEltxt = await titleEl.getProperty("textContent");
        const title = await titleEltxt.jsonValue();
    
        const [priceEl] = await page.$x('//*[@id="price"]');
        const priceElTxt = await priceEl.getProperty("textContent");
        const price = await priceElTxt.jsonValue();
    
        console.log({ imgUrl, title, price });
    
        browser.close();
        
    } catch (err) {
        console.error(err);
    }
}

scrapeProduct("https://www.amazon.com/Importance-Being-Earnest-Oscar-Wilde/dp/1503331741/ref=sr_1_1_sspa?crid=38PJVW1EOGPDV&dchild=1&keywords=the+importance+of+being+earnest+by+oscar+wilde&qid=1599507665&sprefix=The+importance+of%2Caps%2C210&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEyM0VESEtORDBNWDhNJmVuY3J5cHRlZElkPUEwMTk5NTkxWTM2MVowVVgzMlM3JmVuY3J5cHRlZEFkSWQ9QTAxODA5NTcxV1oyNjBVRkJHTzBaJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==");
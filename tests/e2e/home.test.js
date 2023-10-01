const puppeteer = require('puppeteer');
const HOST = process.env.HOST
describe('Home', () => {
    let browser;
    let page;
    let links

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: 'new'
        });
        page = await browser.newPage();
        await page.goto(HOST);
        links = await page.$$('nav a')
    });

    afterAll(async () => {
        await browser.close();
    });

    it('should have correct home link', async () => {
        const link = links[0]
        expect(link).not.toBeNull()
        const href = await link.evaluate(link => link.href)
        expect(href).toContain(HOST)
    })

    it('should have correct resume link', async () => {
        const link = links[1]
        expect(link).not.toBeNull()
        const href = await link.evaluate(link => link.href)
        expect(href).toContain('drive.google.com')
    })

    it('should have correct git link', async () => {
        const link = links[2]
        expect(link).not.toBeNull()
        const href = await link.evaluate(link => link.href)
        expect(href).toContain('github.com')
    })
});

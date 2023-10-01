const puppeteer = require('puppeteer');
const HOST = process.env.HOST || 'http://localhost:3000'
describe('Gallery', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: 'new'
        });
        page = await browser.newPage();
    });

    beforeEach(async () => {
        await page.goto(HOST + '/projects/gallery');

    })

    afterAll(async () => {
        await browser.close();
    });

    it('should contain images', async () => {
        const photos = await page.$$('.eachPhoto img');
        expect(photos.length).toBeGreaterThan(0);

    });

    it('should display navigation on image click', async () => {
        const photo = await page.$('.eachPhoto img');
        await photo.click()
        const exit = await page.$('#exit');
        const right = await page.$('#right');
        const left = await page.$('#left');
        const displayImg = await page.$('img.w-full')
        expect(exit).not.toBeNull()
        expect(left).not.toBeNull()
        expect(right).not.toBeNull()
        expect(displayImg).not.toBeNull()
    })

    it('should work on exit navigation', async () => {
        const photo = await page.$('.eachPhoto img');
        await photo.click()
        const getDisplayImg = async () => await page.$('img.w-full')

        expect(await getDisplayImg()).not.toBeNull()
        const exit = await page.$('#exit');
        await exit.click()
        expect(await getDisplayImg()).toBeNull()
        const right = await page.$('#right');
        const left = await page.$('#left');
        expect(right).toBeNull()
        expect(left).toBeNull()


    })


    it('should display correct image on navigation', async () => {
        const photo = await page.$('.eachPhoto img');
        await photo.click()
        const displayImg = await page.$('img.w-full')
        const right = await page.$('#right');
        const left = await page.$('#left');
        const currentImgSrc = await displayImg.evaluate(img => img.src)
        await left.click()
        const preImgSrc = await displayImg.evaluate(img => img.src)
        expect(currentImgSrc).not.toBe(preImgSrc)
        await right.click()
        expect(currentImgSrc).toBe(await displayImg.evaluate(img => img.src))
        await right.click()
        const nextImgSrc = await displayImg.evaluate(img => img.src)
        expect(currentImgSrc).not.toBe(nextImgSrc)

    })


});

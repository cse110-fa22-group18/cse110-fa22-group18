/**
 * Sources
 * - https://github.com/puppeteer/puppeteer/blob/v1.18.1/docs/api.md
 * - display.test.js done by Ira
 * 
 * Run this test file using "npm test -- rotate.test.js"
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const imgDir = "./source/assets/test-images/";

describe("Display functionality tests", () => {

    beforeAll(async () => {
        await page.goto("https://cse110-fa22-group18.github.io/cse110-fa22-group18/source/index.html");
    });

    it("image is properly rotated", async () => {
        console.log("Uploading image(s) to gallery from " + imgDir);
        const directory = fs.opendirSync(imgDir);
        try {
            let file = directory.readSync();
            const uploadHandle = await page.$("input[type=file]");
            const imgPath = imgDir + file.name;
            await uploadHandle.uploadFile(imgPath);
            await page.evaluate(() => document.querySelector("a[href='#upload-section']").click());
            await page.waitForTimeout(500); // for visual confirmation of file selection
            await page.evaluate(() => document.getElementById("upload-button").click());
            await page.waitForTimeout(500); // timeout for upload process to complete
            await page.evaluate(() => document.querySelector("a[href='#gallery-section']").click());
            await page.waitForTimeout(500); // for visual confirmation of image display
        } catch(error)  {
            throw error;
        } finally {
            directory.close();
        }

        // input edit option in prompt box
        page.on('dialog', async dialog => {
            await page.waitForTimeout(500);
            await dialog.accept("1");
        });

        const image = await page.$("#gallery-container > a > img");
        await image.click();
        await page.waitForTimeout(500);

        const rotate = await page.$("#rotate-button");
        const canvas = await page.$("#canvas");
        const cw = canvas.width;
        const ch = canvas.height;

        // first rotate
        await rotate.click();
        await page.waitForTimeout(500);
        
        let cw2 = canvas.width;
        let ch2 = canvas.height;
        expect(cw2).toBe(ch);
        expect(ch2).toBe(cw);

        // second rotate
        await rotate.click();
        await page.waitForTimeout(500);
        
        cw2 = canvas.width;
        ch2 = canvas.height;
        expect(cw2).toBe(cw);
        expect(ch2).toBe(ch);
    }, 10000);
});


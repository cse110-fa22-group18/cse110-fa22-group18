/**
 * Performs E2E testing by automating file uploads.
 * Uploaded images should be stored in localStorage and generate 
 * HTML 'a > img' nests to be visually displayed.
 * Images are deleted from both storage and HTML.
 * 
 * Within the display features:
 * - (1) edit: should navigate to the edit page (page-navigate.test.js)
 * - (2) delete: image should be removed (upload-display.test.js)
 * - (3) download: file explorer should appear (manually tested)
 * 
 * Sources
 * - https://github.com/puppeteer/puppeteer/blob/v1.18.1/docs/api.md
 * 
 * Run this test file using "npm test -- upload-display.test.js"
 */

const puppeteer = require("puppeteer");
const fs = require("fs");
const imgDir = "./source/assets/test-images/";

describe("Upload and display functionality tests", () => {

    beforeAll(async () => {
        await page.goto("https://cse110-fa22-group18.github.io/cse110-fa22-group18/source/index.html");
    });

    it("An 'anchor > img' nest should be generated for each image uploaded", async () => {
        console.log("Uploading image(s) to gallery from " + imgDir);
        const directory = fs.opendirSync(imgDir);
        try {
            while ((file = directory.readSync()) !== null) {
                // NOTE: requery upload handle after every upload
                const uploadHandle = await page.$("input[type=file]");
                const imgPath = imgDir + file.name;
                await uploadHandle.uploadFile(imgPath);
                await page.evaluate(() => document.querySelector("a[href='#upload-section']").click());
                await page.waitForTimeout(500); // for visual confirmation of file selection
                await page.evaluate(() => document.getElementById("upload-button").click());
                await page.waitForTimeout(500); // timeout for upload process to complete
                await page.evaluate(() => document.querySelector("a[href='#gallery-section']").click());
                await page.waitForTimeout(500); // for visual confirmation of image display
            }
        } catch(error) {
            throw error;
        } finally {
            directory.close();
        }
        await page.waitForTimeout(3000); // for visual confirmation all images

        // fetch img tags in gallery section of HTML
        const imgSources = await page.evaluate(() => {
            const srcs = Array.from( 
                document.querySelectorAll("#gallery-container > a > img")).map((image) => image.getAttribute("src")
                ); 
            return srcs;
        });

        let imgCount = fs.readdirSync(imgDir).length;

        // number of img tags should match the number of files uploaded
        expect(imgSources.length).toBe(imgCount);
    }, 20000);

    
    it("Checking if gallery remains populated after reload", async () => {
        await page.reload();
        await page.evaluate(() => document.querySelector("a[href='#gallery-section']").click());
        await page.waitForTimeout(500);

        const imgSources = await page.evaluate(() => {
            const srcs = Array.from( 
                document.querySelectorAll("#gallery-container > a > img")).map((image) => image.getAttribute("src")
                ); 
            return srcs;
        });
        let imgCount = fs.readdirSync(imgDir).length;

        // number of img tags should match the number of files uploaded
        expect(imgSources.length).toBe(imgCount);
    }, 10000);
    
    it("No 'a > img' nests should exist after each image is deleted", async () => {
        // NOTE: dialog handle should be stated BEFORE the event triggers
        // input delete option in prompt box
        page.on('dialog', async dialog => {
            await page.waitForTimeout(500);
            await dialog.accept("2"); // delete
        });
        
        while ((await page.$("#gallery-container > a > img")) !== null) {
            //  trigger prompt box
            const image = await page.$("#gallery-container > a > img");
            await image.click();
            await page.waitForTimeout(1000); // time for delete
        }

        // there should be no images in the gallery
        const imgSources = await page.evaluate(() => {
            const srcs = Array.from( 
                document.querySelectorAll("#gallery-container > a > img")).map((image) => image.getAttribute("src")
                ); 
            return srcs;
        });
        expect(imgSources.length).toBe(0);
    }, 20000);
    
    it("Checking if gallery remains empty after reload", async () => {
        await page.reload();
        await page.evaluate(() => document.querySelector("a[href='#gallery-section']").click());
        // there should be no images in the gallery
        const imgSources = await page.evaluate(() => {
            const srcs = Array.from( 
                document.querySelectorAll("#gallery-container > a > img")).map((image) => image.getAttribute("src")
                ); 
            return srcs;
        });
        expect(imgSources.length).toBe(0);
    }, 10000);
});


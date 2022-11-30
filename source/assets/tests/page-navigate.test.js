/**
 * Performs E2E testing to navigate the website.
 * Goes to the edit page and returns home using available ways.
 * 
 * Within the display features:
 * - (1) edit: should navigate to the edit page (page-navigate.test.js)
 * - (2) delete: image should be removed (upload-display.test.js)
 * - (3) download: file explorer should appear (manually tested)
 * 
 * Sources
 * - https://github.com/puppeteer/puppeteer/blob/v1.18.1/docs/api.md
 * 
 * run this test file using "npm test -- page-navigate.test.js"
 */

 const puppeteer = require("puppeteer");
 const fs = require("fs");
 const imgDir = "./source/assets/test-images/";
 
 describe("Website navigation tests", () => {
 
     beforeAll(async () => {
         await page.goto("https://cse110-fa22-group18.github.io/cse110-fa22-group18/source/index.html");
     });

     it("Navigate to edit page", async () => {
        console.log("Uploading an image to gallery from " + imgDir);
        const directory = fs.opendirSync(imgDir);
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

        // NOTE: dialog handle should be stated BEFORE the event triggers
        page.on('dialog', async dialog => {
            await page.waitForTimeout(500);
            await dialog.accept("1"); // edit
        });
        // image is in page view
        const image = await page.$("#gallery-container > a > img");
        await image.click();
        await page.waitForNavigation({waitUntil: 'domcontentloaded'});

        // check if on edit page
        await page.waitForTimeout(500); // for visual confirmation of image display
        let onEditPage = false;
        const url = await page.url();
        if (url.includes("edit.html")) {
            onEditPage = true;
        }
        expect(onEditPage).toBe(true);
    }, 5000);

    it("Return to home using logo", async () => {
        // click on team logo
        const logo = await page.$(".team-brand > #logo");
        await logo.click();

        // check if back on home page
        await page.waitForNavigation({waitUntil: 'domcontentloaded'});
        let onHomePage = false;
        const url = await page.url();
        if (url.includes("index.html")) {
            onHomePage = true;
        }
        expect(onHomePage).toBe(true);
    }, 3000);

    it("Return to home using team name", async () => {
        // set image in page view
        await page.evaluate(() => document.querySelector("a[href='#gallery-section']").click());
        await page.waitForTimeout(500); // for visual confirmation of image display
        // go to edit page
        const image = await page.$("#gallery-container > a > img");
        await image.click();
        await page.waitForNavigation({waitUntil: 'domcontentloaded'});

        // click on team name
        const logo = await page.$(".team-brand > a > #team-name");
        await logo.click();
        await page.waitForNavigation({waitUntil: 'domcontentloaded'});

        let onHomePage = false;
        const url = await page.url();
        if (url.includes("index.html")) {
            onHomePage = true;
        }
        expect(onHomePage).toBe(true);
    }, 5000);

    it("Return to home using 'Upload Picture' anchor", async () => {
        // set image in page view
        await page.evaluate(() => document.querySelector("a[href='#gallery-section']").click());
        await page.waitForTimeout(500);
        // go to edit page
        const image = await page.$("#gallery-container > a > img");
        await image.click();
        await page.waitForNavigation({waitUntil: 'domcontentloaded'});

        // click on 'Upload Picture' anchor
        await page.evaluate(() => document.querySelector("a[href='#upload-section']").click());
        await page.waitForNavigation({waitUntil: 'domcontentloaded'});

        // check if back on home page
        const url = await page.url();
        let onHomePage = false;
        if (url.includes("index.html")) {
            onHomePage = true;
        }
        let onUploadSection = false;
        if (url.includes("upload-section")) {
            onUploadSection = true;
        }
        expect(onHomePage).toBe(true);
        expect(onUploadSection).toBe(true);
    }, 5000);

    it("Return to home using 'View/Edit Gallery' anchor", async () => {
        // set image in page view
        await page.evaluate(() => document.querySelector("a[href='#gallery-section']").click());
        await page.waitForTimeout(500);
        // go to edit page
        const image = await page.$("#gallery-container > a > img");
        await image.click();
        await page.waitForNavigation({waitUntil: 'domcontentloaded'});

        // click on 'View/Edit Gallery' anchor
        await page.evaluate(() => document.querySelector("a[href='#gallery-section']").click());
        await page.waitForNavigation({waitUntil: 'domcontentloaded'});

        // check if back on home page
        const url = await page.url();
        let onHomePage = false;
        if (url.includes("index.html")) {
            onHomePage = true;
        }
        let onGallerySection = false;
        if (url.includes("gallery-section")) {
            onGallerySection = true;
        }
        expect(onHomePage).toBe(true);
        expect(onGallerySection).toBe(true);
    }, 5000);
 });
/**
 * Sources
 * - https://github.com/puppeteer/puppeteer/blob/v1.18.1/docs/api.md
 * 
 */
const puppeteer = require("puppeteer");
const fs = require("fs");
const imgDir = "./source/assets/test-images/";

describe("Display functionality tests", () => {

    beforeAll(async () => {
        await page.goto("https://cse110-fa22-group18.github.io/cse110-fa22-group18/source/index.html");
    });

    
    it("An 'anchor > img' nest should be generated for each image uploaded", async () => {
        console.log("Uploading image(s) to gallery from " + imgDir);
        const directory = fs.opendirSync(imgDir);
        let file;
        while ((file = directory.readSync()) !== null) {
            // NOTE: requery upload handle after every upload (can't reuse same handle for some reason)
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
        
        const storedImages = await page.evaluate(() => {
            return JSON.parse(localStorage.getItem("Image Container"));
        });
        const imgSources = await page.evaluate(() => {
            const srcs = Array.from( 
                document.querySelectorAll("#gallery-container > a > img")).map((image) => image.getAttribute("src")
                ); 
            return srcs;
        });

        console.log("Number of images displayed: " + imgSources.length);
        // number of images in localStorage should be equivalent to number of images displayed
        expect(imgSources.length).toBe(storedImages.length);

        // check if image path in localStorage mataches the img src attribute
        let areDisplayed = true;
        for (let i = 0; i < storedImages.length; i++) {
            const base64Path = await JSON.stringify(storedImages[i].path);
            const imgSource = await JSON.stringify(imgSources[i]);
            if (base64Path !== imgSource) {{
                console.error("base64Path and imgSrc don't match at index " + i);
                areDisplayed = false;
                break;
            }}   
        }
        expect(areDisplayed).toBe(true);
    }, 20000);
    
    it("Checking if gallery remains populated after reload", async () => {
        await page.reload();
        
        const storedImages = await page.evaluate(() => {
            return JSON.parse(localStorage.getItem("Image Container"));
        });
        const imgSources = await page.evaluate(() => {
            const srcs = Array.from( 
                document.querySelectorAll("#gallery-container > a > img")).map((image) => image.getAttribute("src")
                ); 
            return srcs;
        });

        // number of images in localStorage should be equivalent to number of images displayed
        expect(imgSources.length).toBe(storedImages.length);

        // check if image path in localStorage mataches the img src attribute
        let areDisplayed = true;
        for (let i = 0; i < storedImages.length; i++) {
            const base64Path = await JSON.stringify(storedImages[i].path);
            const imgSource = await JSON.stringify(imgSources[i]);
            if (base64Path !== imgSource) {{
                console.error("base64Path and imgSrc don't match at index " + i);
                areDisplayed = false;
                break;
            }}   
        }
        expect(areDisplayed).toBe(true);
    }, 1000);
    
    it("No 'a > img' nests should exist after each image is deleted", async () => {
        // NOTE: dialog handle should be stated BEFORE the event triggers
        page.on('dialog', async dialog => {
            await page.waitForTimeout(500);
            await dialog.accept("2");
        });
        
        while ((await page.$("#gallery-container > a > img")) !== null) {
            const image = await page.$("#gallery-container > a > img");
            await image.click();
            await page.waitForTimeout(500);
        }

        // there should be no images in the gallery
        const imgSources = await page.evaluate(() => {
            const srcs = Array.from( 
                document.querySelectorAll("#gallery-container > a > img")).map((image) => image.getAttribute("src")
                ); 
            return srcs;
        });
        expect(imgSources.length).toBe(0);
    }, 15000);
    
    it("Checking if gallery remains empty after reload", async () => {
        await page.reload();

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


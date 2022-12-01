/**
 * Sources
 * - https://github.com/puppeteer/puppeteer/blob/v1.18.1/docs/api.md
 * - display.test.js done by Ira
 * 
 * run this test file using "npm test -- rotate.test.js"
 */
 const puppeteer = require("puppeteer");
 const fs = require("fs");
 const imgDir = "./source/assets/test-images/";
describe('Brightness functionality tests', () => {
    // First, visit the index.html
    beforeAll(async () => {
      await page.goto("https://cse110-fa22-group18.github.io/cse110-fa22-group18/source/index.html");
    });
    //Check brightness function
    it("Increase brightness", async () => {
        //upload images
        console.log("Uploading image(s) to gallery from " + imgDir);
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
        // go to edit page
        page.once('dialog', async dialog => {
            await page.waitForTimeout(500);
            await dialog.accept("1");
        });

        const image = await page.$("#gallery-container > a > img");
        await image.click();
        await page.waitForTimeout(500);

        //Move brightness slider to 200 
        //by direcly setting range.value to 200
        const newInputValue = "200";
        await page.evaluate(val => document.getElementById('range').value = val, newInputValue);
        await page.waitForTimeout(500);

        //click save button to save image
        const saveBtn= await page.$("#save-button");
        await saveBtn.click();
        await page.waitForTimeout(500);

        //visual confirmation of brightness change of image on gallery-section
        await page.evaluate(() => document.querySelector("a[href='#gallery-section']").click());
        await page.waitForTimeout(500); // for visual confirmation of image display

        //edit it again
        page.once('dialog', async dialog => {
            await page.waitForTimeout(500);
            await dialog.accept("1");
        });

        const image2 = await page.$("#gallery-container > a > img");
        await image2.click();
        await page.waitForTimeout(500);

        //Move brightness slider to 30 
        //by direcly setting range.value to 30
        const desInputValue = "30";
        await page.evaluate(val => document.getElementById('range').value = val, desInputValue);
        await page.waitForTimeout(500);

        //click save button to save image
        const saveBtn2= await page.$("#save-button");
        await saveBtn2.click();
        await page.waitForTimeout(500);

        await page.evaluate(() => document.querySelector("a[href='#gallery-section']").click());
        await page.waitForTimeout(500); // for visual confirmation of image display



    }, 10000);

});
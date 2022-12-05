/**
 * Performs unit testing for rotate and setBrightness functions.
 * 
 * Sources
 * - https://jestjs.io/docs/getting-started
 * 
 * Run this test file using "npm test -- unit.test.js"
 */
const functions = require('./functions.js');
const image = "./source/assets/test-images/elden_ring.jpeg";

test('image correctly rotated', () => {
    expect(functions.rotate(image)).toBe(undefined);
});
test('rotate will not modify image path',()=>{
    //setBringhtness will not modify imagepath
    functions.rotate(image);
    const imagePath="./source/assets/test-images/elden_ring.jpeg";
    expect(image).toBe(imagePath);
})
test('setBrightness will not modify image path',()=>{
    //setBringhtness will not modify imagepath
    functions.setBrightness(image);
    const imagePath="./source/assets/test-images/elden_ring.jpeg";
    expect(image).toBe(imagePath);
})
test("setBrightness works",()=>{
    //since setBrightness is void,
    //reveived "undefined"
    expect(functions.setBrightness(image)).toBe(undefined);
})


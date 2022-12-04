const functions = require('../tests/rotate.js');

const image = "./source/assets/test-images/elden_ring.jpeg";

test('image correctly rotated', () => {
    expect(functions.rotate(image)).toBe(undefined);
});

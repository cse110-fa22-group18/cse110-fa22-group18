// imports sum from sum.js and tests makes sure sum(1,2) returns 3
const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
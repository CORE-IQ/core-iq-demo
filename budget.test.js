const assert = require('assert');
const { calculateBudgetDistribution } = require('./budget');

const entries = [{ type: 'A', count: 1000 }];
const media = { A: [
  { channel: 'TV', index: 350 },
  { channel: 'Radio', index: 90 }
] };
const result = calculateBudgetDistribution(entries, media, 100);

assert.strictEqual(result.totalIndex, 350000);
assert.ok(result.distribution.TV, 'TV distribution missing');
assert.strictEqual(result.distribution.Radio, undefined, 'Radio should be excluded');
assert(Math.abs(result.distribution.TV.budget - 100) < 1e-6);

console.log('All tests passed');

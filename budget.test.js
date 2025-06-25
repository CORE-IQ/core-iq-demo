const assert = require('assert');
const { calculateBudgetDistribution } = require('./budget');

const entries = [{ type: 'A', count: 1000 }];
const media = { A: [{ channel: 'TV', index: 150 }] };
const result = calculateBudgetDistribution(entries, media, 100);

assert.strictEqual(result.totalIndex, 150000);
assert.ok(result.distribution.TV, 'TV distribution missing');
assert(Math.abs(result.distribution.TV.budget - 100) < 1e-6);

// items at or below the threshold should be ignored
const mediaLow = { A: [{ channel: 'Radio', index: 100 }] };
const lowResult = calculateBudgetDistribution(entries, mediaLow, 100);
assert.strictEqual(lowResult.totalIndex, 0);
assert.deepStrictEqual(lowResult.distribution, {});

console.log('All tests passed');

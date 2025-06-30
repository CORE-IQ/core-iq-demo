const assert = require('assert');
const { calculateROIForecast } = require('./roi');

const res = calculateROIForecast({
  budget: 1000,
  productPrice: 40,
  servicePrice: 10,
  targetSales: 30,
  reach: 10000
});
assert(Math.abs(res.requiredConversion - 0.3) < 1e-6);
assert.strictEqual(res.totalRevenue, 1500);
assert.strictEqual(res.netProfit, 500);
assert.strictEqual(res.roas, 1.5);

console.log('ROI tests passed');

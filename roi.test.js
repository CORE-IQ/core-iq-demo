const assert = require('assert');
const { calculateROIForecast } = require('./roi');

// Test using productPrice + servicePrice
const res1 = calculateROIForecast({
  budget: 1000,
  productPrice: 40,
  servicePrice: 10,
  targetSales: 30,
  reach: 10000
});
assert(Math.abs(res1.requiredConversion - 0.3) < 1e-6);
assert.strictEqual(res1.totalRevenue, 1500);
assert.strictEqual(res1.netProfit, 500);
assert.strictEqual(res1.roas, 1.5);

// Test using unitPrice only
const res2 = calculateROIForecast({
  budget: 1000,
  unitPrice: 50,
  targetSales: 30,
  reach: 10000
});
assert(Math.abs(res2.requiredConversion - 0.3) < 1e-6);
assert.strictEqual(res2.totalRevenue, 1500);
assert.strictEqual(res2.netProfit, 500);
assert.strictEqual(res2.roas, 1.5);

console.log('ROI tests passed');

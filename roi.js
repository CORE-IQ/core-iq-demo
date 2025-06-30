// Calculate ROI forecast using either product or service pricing.
// Any missing values default to zero so the function is safe to call
// with partially filled forms.
function calculateROIForecast({
  budget = 0,
  productPrice = 0,
  servicePrice = 0,
  targetSales = 0,
  reach = 0
}) {
  budget = parseFloat(budget) || 0;
  productPrice = parseFloat(productPrice) || 0;
  servicePrice = parseFloat(servicePrice) || 0;
  targetSales = parseFloat(targetSales) || 0;
  reach = parseFloat(reach) || 0;
  // Use whichever price values are supplied. If both are given they are summed.
  const unitPrice = productPrice + servicePrice;
  const totalRevenue = unitPrice * targetSales;
  const requiredConversion = reach ? (targetSales / reach) * 100 : 0;
  const roas = budget ? totalRevenue / budget : 0;
  const netProfit = totalRevenue - budget;
  return { requiredConversion, totalRevenue, netProfit, roas };
}

if (typeof module !== 'undefined') module.exports = { calculateROIForecast };

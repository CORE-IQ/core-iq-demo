// Calculate ROI forecast using either combined unitPrice or product/service split.
// Defaults all missing values to zero for safe use with partial data.
function calculateROIForecast({
  budget = 0,
  unitPrice,
  productPrice = 0,
  servicePrice = 0,
  targetSales = 0,
  reach = 0
}) {
  budget = parseFloat(budget) || 0;
  productPrice = parseFloat(productPrice) || 0;
  servicePrice = parseFloat(servicePrice) || 0;
  unitPrice = parseFloat(unitPrice);
  targetSales = parseFloat(targetSales) || 0;
  reach = parseFloat(reach) || 0;

  // Determine unit price: use provided unitPrice or sum of product + service
  const finalUnitPrice = isNaN(unitPrice) ? (productPrice + servicePrice) : unitPrice;

  const totalRevenue = finalUnitPrice * targetSales;
  const requiredConversion = reach ? (targetSales / reach) * 100 : 0;
  const roas = budget ? totalRevenue / budget : 0;
  const netProfit = totalRevenue - budget;

  return { requiredConversion, totalRevenue, netProfit, roas };
}

if (typeof module !== 'undefined') module.exports = { calculateROIForecast };

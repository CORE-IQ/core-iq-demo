function calculateROIForecast({ budget = 0, unitPrice = 0, targetSales = 0, reach = 0 }) {
  budget = parseFloat(budget) || 0;
  unitPrice = parseFloat(unitPrice) || 0;
  targetSales = parseFloat(targetSales) || 0;
  reach = parseFloat(reach) || 0;
  const totalRevenue = unitPrice * targetSales;
  const requiredConversion = reach ? (targetSales / reach) * 100 : 0;
  const roas = budget ? totalRevenue / budget : 0;
  const netProfit = totalRevenue - budget;
  return { requiredConversion, totalRevenue, netProfit, roas };
}

if (typeof module !== 'undefined') module.exports = { calculateROIForecast };

function calculateBudgetDistribution(entries, media, totalBudget) {
  const weights = {};
  entries.forEach((seg) => {
    const segMedia = media[seg.type];
    if (segMedia) {
      segMedia.forEach((item) => {
        if (item.index > 300) {
          const key = item.channel;
          const weight = item.index * seg.count;
          weights[key] = (weights[key] || 0) + weight;
        }
      });
    }
  });
  const totalIndex = Object.values(weights).reduce((sum, w) => sum + w, 0);
  const distribution = {};
  for (const [channel, weight] of Object.entries(weights)) {
    distribution[channel] = {
      weight,
      budget: totalIndex ? (weight / totalIndex) * totalBudget : 0,
    };
  }
  return { totalIndex, distribution };
}


if (typeof module !== "undefined") module.exports = { calculateBudgetDistribution };

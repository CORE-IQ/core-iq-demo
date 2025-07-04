function calculateBudgetDistribution(entries, media, totalBudget) {
  const weights = {};
  entries.forEach((seg) => {
    let segMedia = media[seg.type];
    if (!segMedia) {
      const prefix = seg.type[0];
      const matchKey = Object.keys(media).find((k) => k.startsWith(prefix));
      segMedia = media[matchKey];
    }
    if (segMedia) {
      segMedia.forEach((item) => {
        // Only allocate budget to channels with an index over 100
        if (item.index > 100) {
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

const fs = require('fs');
function loadCounts() {
  const totals = {};
  let groupNames = {};
  if (fs.existsSync('primary_content.json')) {
    let text = fs.readFileSync('primary_content.json', 'utf8');
    text = text.replace(/NaN/g, 'null');
    const idx = text.lastIndexOf(']');
    const slice = idx !== -1 ? text.slice(0, idx + 1) : text;
    let groups = [];
    try {
      groups = JSON.parse(slice);
    } catch (e) {
      groups = [];
    }
    groupNames = Object.fromEntries(groups.map(g => [g.group_code, g.group_name]));
  }
  for (let i = 1; i <= 9; i++) {
    const file = `${i}.json`;
    if (!fs.existsSync(file)) continue;
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    Object.values(data).forEach(entries => {
      entries.forEach(item => {
        const type = item.type || '';
        const count = item.count || 0;
        const match = type.match(/^[A-Z][0-9]{2}/);
        if (match) {
          const sub = match[0];
          const group = sub[0];
          totals[group] = totals[group] || { name: groupNames[group] || '', total: 0, sub: {} };
          totals[group].total += count;
          totals[group].sub[sub] = (totals[group].sub[sub] || 0) + count;
        }
      });
    });
  }
  return totals;
}

if (require.main === module) {
  console.log(JSON.stringify(loadCounts(), null, 2));
} else {
  module.exports = { loadCounts };
}

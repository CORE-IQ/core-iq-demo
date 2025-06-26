function renderAudienceResults(data) {
  const root = document.getElementById('resultsRoot');
  if (!root) return;
  root.innerHTML = '';

  const html = `
    <div style="text-align: center;">
      <h2 style="font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; color: #00ffae;">${data.mosaic_group}</h2>
      <p style="color: #aaa; font-size: 1.2rem; max-width: 720px; margin: 12px auto 0;">${data.description}</p>
    </div>
    <div style="background: #111; border-left: 4px solid #00ffae; border-radius: 12px; padding: 24px; box-shadow: 0 0 16px rgba(0,255,174,0.3);">
      <h3 style="color: #00ffae; margin-bottom: 8px;">What is an Index?</h3>
      <p style="margin: 0; color: #ccc;">An index score compares this group’s likelihood of a behaviour or trait against the UK average (100). An index of 130 means this group is 30% more likely than average to exhibit that trait.</p>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px;">
      ${data.demographics.map(d => `<div style="background: #111; border-radius: 12px; padding: 24px; box-shadow: 0 0 16px rgba(0,255,174,0.3);"><p style="color: #00ffae; font-weight: 600; margin-bottom: 4px;">${d.label}</p><p>${d.value} <span style="color:#aaa">(Index: ${d.index})</span></p></div>`).join('')}
    </div>
    <div style="background: #111; border-radius: 12px; padding: 24px; box-shadow: 0 0 16px rgba(0,255,174,0.3);">
      <h4 style="color: #00ffae; margin-bottom: 12px;">Key Features</h4>
      <ul style="margin: 0; padding-left: 20px; color: #ccc; line-height: 1.6;">
        ${data.key_features.map(f => `<li>${f}</li>`).join('')}
      </ul>
    </div>
    <div>
      <h3 style="font-size: 1.5rem; font-weight: 700; color: #00ffae;">Media Channel Effectiveness</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 24px; margin-top: 20px;">
        ${data.media_channels.map(m => {
          const high = m.index > 100;
          const color = high ? '#00ffae' : 'red';
          const shadow = high ? '0 0 24px rgba(0,255,174,0.5)' : '0 0 24px rgba(255,0,0,0.5)';
          return `<div style="background: #111; border-radius: 12px; padding: 20px; text-align: center; box-shadow: ${shadow};"><p style="margin: 0; color: #ccc;">${m.label}</p><p style="color: #aaa; font-size: 0.9rem; margin: 4px 0;">Index: ${m.index}</p><p style="color: ${color}; font-weight: bold;">${m.index}</p></div>`;
        }).join('')}
      </div>
    </div>
    <div style="background: #111; border-left: 4px solid #00ffae; border-radius: 16px; padding: 32px; box-shadow: 0 0 24px rgba(0,255,174,0.2);">
      <h3 style="font-size: 1.6rem; font-weight: 800; color: #00ffae; margin-bottom: 20px; text-align: center;">\uD83D\uDCCD Postcode Reach & \uD83C\uDF09 Media Plan Allocation</h3>
      <div style="margin-bottom: 32px;">
        <h4 style="color: #ccc; font-size: 1.2rem; font-weight: 600; margin-bottom: 12px;">Top Performing Postcode Areas:</h4>
        <ul style="list-style: none; padding-left: 0; color: #fff; display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px;">
          ${data.top_postcodes.map(p => `<li style="background:#000; padding: 16px; border-radius: 12px; box-shadow: 0 0 12px rgba(0,255,174,0.2);"><strong>${p.code}:</strong> ${p.count} households</li>`).join('')}
        </ul>
      </div>
      <div>
        <h4 style="color: #ccc; font-size: 1.2rem; font-weight: 600; margin-bottom: 12px;">Media Channel Effectiveness & Spend:</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px;">
          ${data.media_plan_allocation.map(p => {
            const high = p.index > 100;
            const bg = high ? '#001f1a' : '#1a0000';
            const border = high ? '#00ffae' : 'red';
            const text = high ? '#00ffae' : 'red';
            const budget = high ? p.budget : 0;
            return `<div style="background: ${bg}; border-left: 4px solid ${border}; padding: 20px; border-radius: 12px;"><p style="color: ${text}; font-weight: 600; margin: 0 0 8px;">${p.channel}</p><p style="margin: 0; color: #ccc;">Index: <strong>${p.index}</strong></p><p style="margin: 0; color: #ccc;">Budget Allocation: <strong>£${budget.toFixed(2)}</strong></p></div>`;
          }).join('')}
        </div>
      </div>
    </div>
  `;

  root.innerHTML = html;
}

const stored = localStorage.getItem('audienceResult');
if (stored) {
  renderAudienceResults(JSON.parse(stored));
} else {
  fetch('sample_result.json').then(r => r.json()).then(data => renderAudienceResults(data));
}

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[c]);
}

function renderAudienceResults(data) {
  const root = document.getElementById('resultsRoot');
  if (!root) return;
  root.innerHTML = '';

  const html = `
    <div style="text-align: center;">
      <h2 style="font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; color: #00ffae;">Top Fit Group: ${data.mosaic_group}</h2>
      ${data.rationale ? `<p style="margin:0;color:#ccc;">${escapeHTML(data.rationale)}</p>` : ''}
      ${data.target ? `<p style="margin:0;color:#ccc;font-size:1rem;">Target: ${data.target}</p>` : ''}
      <p style="color: #aaa; font-size: 1.2rem; max-width: 720px; margin: 12px auto 0;">${data.description}</p>
    </div>
    ${typeof data.total_budget === 'number' ? `<div style="background:#111; border-radius:12px; padding:24px; box-shadow:0 0 16px rgba(0,255,174,0.3); text-align:center;"><p style="margin:0;color:#00ffae;font-weight:600;">Total Media Budget</p><p style="margin:0;font-size:1.4rem;">£${data.total_budget.toFixed(2)}</p></div>` : ''}
    ${typeof data.total_households === 'number' ? `<div style="background:#111; border-radius:12px; padding:24px; box-shadow:0 0 16px rgba(0,255,174,0.3); text-align:center;"><p style="margin:0;color:#00ffae;font-weight:600;">Total Households</p><p style="margin:0;font-size:1.4rem;">${data.total_households.toLocaleString()}</p></div>` : ''}
    <div style="background: #111; border-left: 4px solid #00ffae; border-radius: 12px; padding: 24px; box-shadow: 0 0 16px rgba(0,255,174,0.3);">
      <h3 style="color: #00ffae; margin-bottom: 8px;">What is an Index?</h3>
      <p style="margin: 0; color: #ccc;">An index score compares this group’s likelihood of a behaviour or trait against the UK average (100). An index of 130 means this group is 30% more likely than average to exhibit that trait.</p>
    </div>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px;">
      ${data.demographics.map(d => `<div style="background: #111; border-radius: 12px; padding: 24px; box-shadow: 0 0 16px rgba(0,255,174,0.3);"><p style="color: #00ffae; font-weight: 600; margin-bottom: 4px;">${d.label}</p><p>${d.value}${d.index !== undefined ? ` <span style="color:#aaa">(Index: ${d.index})</span>` : ''}</p></div>`).join('')}
    </div>
    <div>
      <h4 style="color: #00ffae; margin-bottom: 12px;">Key Features</h4>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;">
        ${data.key_features.map(f => `
          <div style="background:#111;border-radius:12px;padding:24px;box-shadow:0 0 16px rgba(0,255,174,0.3);">
            <p style="margin:0;color:#ccc;">${f}</p>
          </div>
        `).join('')}
      </div>
    </div>
    ${Array.isArray(data.type_breakdown) ? `<div><h3 style="color:#00ffae;text-align:center;">Mosaic Type Breakdown</h3><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;">${data.type_breakdown.map((t,i)=>{const color=t.percent<25?'red':'#00ffae';const border=i===0?'4px solid #00ffae':'none';return `<div style=\"background:#111;border-radius:12px;padding:16px;border-left:${border};\"><p style=\"margin:0;color:${color};font-weight:600;\">${t.type}</p><p style=\"margin:0;color:${color};\">${t.percent.toFixed(0)}%</p></div>`}).join('')}</div></div>`:''}
    ${Array.isArray(data.ranked_groups) ? `<div><h3 style="color:#00ffae;text-align:center;">All Mosaic Groups</h3><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;">${data.ranked_groups.map(g => `<div style="background:#111;border-radius:12px;padding:16px;border-left:4px solid #00ffae;"><p style="margin:0;font-weight:600;">${g.code} - ${g.name}</p><p style="margin:0;color:#ccc;">Score ${(g.score*100).toFixed(0)}</p></div>`).join('')}</div></div>` : ''}
    ${data.household_technology ? `<div style="background:#111;border-radius:12px;padding:24px;box-shadow:0 0 16px rgba(0,255,174,0.3);text-align:center;"><p style="margin:0;color:#ccc;">Household Technology Level</p><p style="margin:0;font-size:1.2rem;color:#00ffae;font-weight:600;">${data.household_technology}</p></div>` : ''}
    ${Array.isArray(data.noticed_channels) && data.noticed_channels.length ? `<div><h3 style="font-size:1.5rem;font-weight:700;color:#00ffae;">Advertising Mediums Noticed</h3><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:24px;margin-top:20px;">${data.noticed_channels.map(r => { const high = r.index >= 100; const color = high ? '#00ffae' : 'red'; const shadow = high ? '0 0 24px rgba(0,255,174,0.5)' : '0 0 24px rgba(255,0,0,0.5)'; return `<div style="background:#111;border-radius:12px;padding:20px;text-align:center;box-shadow:${shadow};"><p style="margin:0;color:#ccc;">${r.channel}</p><p style="color:${color};font-weight:bold;">${r.index}</p></div>`; }).join('')}</div></div>` : ''}
    ${Array.isArray(data.helpful_channels) && data.helpful_channels.length ? `<div><h3 style="font-size:1.5rem;font-weight:700;color:#00ffae;">Advertising Mediums Found Helpful</h3><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:24px;margin-top:20px;">${data.helpful_channels.map(r => { const high = r.index >= 100; const color = high ? '#00ffae' : 'red'; const shadow = high ? '0 0 24px rgba(0,255,174,0.5)' : '0 0 24px rgba(255,0,0,0.5)'; return `<div style="background:#111;border-radius:12px;padding:20px;text-align:center;box-shadow:${shadow};"><p style="margin:0;color:#ccc;">${r.channel}</p><p style="color:${color};font-weight:bold;">${r.index}</p></div>`; }).join('')}</div></div>` : ''}
    ${Array.isArray(data.response_channels) && data.response_channels.length ? `<div><h3 style="font-size:1.5rem;font-weight:700;color:#00ffae;">Advertising Response Channels</h3><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:24px;margin-top:20px;">${data.response_channels.map(r => { const high = r.index >= 100; const color = high ? '#00ffae' : 'red'; const shadow = high ? '0 0 24px rgba(0,255,174,0.5)' : '0 0 24px rgba(255,0,0,0.5)'; return `<div style="background:#111;border-radius:12px;padding:20px;text-align:center;box-shadow:${shadow};"><p style="margin:0;color:#ccc;">${r.channel}</p><p style="color:${color};font-weight:bold;">${r.index}</p></div>`; }).join('')}</div></div>` : ''}
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
      <h3 style="font-size: 1.6rem; font-weight: 800; color: #00ffae; margin-bottom: 20px; text-align: center;">📍 Postcode Reach & 🌍 Media Plan Allocation</h3>
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
    <div id="openAIInfoCard" style="background:#111;border-radius:12px;padding:24px;box-shadow:0 0 16px rgba(0,255,174,0.3);">
      <p style="margin:0;color:#00ffae;font-weight:600;">Core-IQ™ Insight</p>
      <div id="openAIContent" style="margin-top:10px;color:#ccc;">Loading details...</div>
      <div style="margin-top:12px;display:flex;gap:8px;">
        <input id="openAIQuestion" placeholder="Ask more about this group" style="flex:1;padding:8px;border-radius:8px;border:none;background:#222;color:#fff;" />
        <button id="openAIAskBtn" style="background:#00ffae;color:#000;border:none;padding:8px 12px;border-radius:8px;font-weight:bold;">Ask</button>
      </div>
    </div>
  `;

  root.innerHTML = html;

  const infoEl = document.getElementById('openAIContent');
  fetch('/api/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: `Tell me about Experian Mosaic ${data.mosaic_group}` })
  })
    .then(r => r.json())
    .then(d => {
      infoEl.innerHTML = escapeHTML(d.answer || d.error || 'Core-IQ service unavailable.');
    })
    .catch(err => {
      console.error('OpenAI fetch failed:', err);
      infoEl.textContent = 'Core-IQ service unavailable.';
    });

  const ask = () => {
    const qInput = document.getElementById('openAIQuestion');
    const question = qInput.value.trim();
    if (!question) return;
    qInput.value = '';
    const append = txt => {
      const p = document.createElement('p');
      p.style.margin = '4px 0';
      p.innerHTML = escapeHTML(txt);
      infoEl.appendChild(p);
    };
    append('You: ' + question);
    fetch('/api/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: `${question} (about Experian Mosaic ${data.mosaic_group})` })
    })
      .then(r => r.json())
      .then(d => append('AI: ' + (d.answer || d.error || 'error')))
      .catch(err => {
        console.error('OpenAI follow-up failed:', err);
        append('AI: error retrieving answer');
      });
  };
  document.getElementById('openAIAskBtn').addEventListener('click', ask);
  document.getElementById('openAIQuestion').addEventListener('keydown', e => {
    if (e.key === 'Enter') ask();
  });
}

function renderOpenAIResult(data) {
  const root = document.getElementById('resultsRoot');
  if (!root) return;
  const html = `
    <div id="openAIInfoCard" style="background:#111;border-radius:12px;padding:24px;box-shadow:0 0 16px rgba(0,255,174,0.3);">
      <p style="margin:0;color:#00ffae;font-weight:600;">Core-IQ™ Insight</p>
      <div id="openAIContent" style="margin-top:10px;color:#ccc;"></div>
      <div style="margin-top:12px;display:flex;gap:8px;">
        <input id="openAIQuestion" placeholder="Ask a follow-up question" style="flex:1;padding:8px;border-radius:8px;border:none;background:#222;color:#fff;" />
        <button id="openAIAskBtn" style="background:#00ffae;color:#000;border:none;padding:8px 12px;border-radius:8px;font-weight:bold;">Ask</button>
      </div>
    </div>`;
  root.innerHTML = html;

  const infoEl = document.getElementById('openAIContent');
  infoEl.innerHTML = escapeHTML(data.answer || '');

  const ask = () => {
    const qInput = document.getElementById('openAIQuestion');
    const question = qInput.value.trim();
    if (!question) return;
    qInput.value = '';
    const append = txt => {
      const p = document.createElement('p');
      p.style.margin = '4px 0';
      p.innerHTML = escapeHTML(txt);
      infoEl.appendChild(p);
    };
    append('You: ' + question);
    fetch('/api/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: `${question} (context: ${data.query})` })
    })
      .then(r => r.json())
      .then(d => append('AI: ' + (d.answer || d.error || 'error')))
      .catch(err => {
        console.error('OpenAI follow-up failed:', err);
        append('AI: error retrieving answer');
      });
  };
  document.getElementById('openAIAskBtn').addEventListener('click', ask);
  document.getElementById('openAIQuestion').addEventListener('keydown', e => {
    if (e.key === 'Enter') ask();
  });
}

const stored = localStorage.getItem('audienceResult');
const openStored = localStorage.getItem('openAIResult');
if (stored) {
  renderAudienceResults(JSON.parse(stored));
  localStorage.removeItem('openAIResult');
} else if (openStored) {
  renderOpenAIResult(JSON.parse(openStored));
  localStorage.removeItem('openAIResult');
} else {
  fetch('sample_result.json').then(r => r.json()).then(data => renderAudienceResults(data));
}

function setupROICalc() {
  const btn = document.getElementById('roiButton');
  const container = document.getElementById('roiContainer');
  if (!btn || !container) return;
  container.style.display = 'block';
  btn.addEventListener('click', () => {
    const budget = document.getElementById('budgetInput').value;
    const productPrice = document.getElementById('productPriceInput').value;
    const servicePrice = document.getElementById('servicePriceInput').value;
    const targetSales = document.getElementById('salesInput').value;
    const reach = document.getElementById('reachInput').value;
    const res = calculateROIForecast({ budget, productPrice, servicePrice, targetSales, reach });
    container.innerHTML = `
      <h3 style="color:#00ffae;text-align:center;margin-top:0;">ROI Forecast</h3>
      <p style="margin:0;color:#ccc;">Required Conversion: ${res.requiredConversion.toFixed(2)}%</p>
      <p style="margin:0;color:#ccc;">Total Revenue: £${res.totalRevenue.toFixed(2)}</p>
      <p style="margin:0;color:#ccc;">Net Profit: £${res.netProfit.toFixed(2)}</p>
      <p style="margin:0;color:#ccc;">ROAS: ${res.roas.toFixed(2)}x</p>
    `;
  });
}

setupROICalc();

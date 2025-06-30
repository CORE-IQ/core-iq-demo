// main.js

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[c]);
}

async function runSearch() {
  // start a fresh search and clear any stored result
  localStorage.removeItem('audienceResult');
  const rawInput = document.getElementById("targetAreaInput").value;
  const query = rawInput.toUpperCase().trim();
  const safeQuery = escapeHTML(query);
  const postcode = query.replace(/\s+/g, "");
  const postcodeData = loadPostcodeData(postcode);
  const areaData = loadAreaMapping(query);
  const cityPostcodeData = loadCityPostcodeEntries(query);

  const noticedData = fetch("noticed_adverts.json").then((r) => {
    if (!r.ok) throw new Error("Media file not found");
    return r.json();
  });

  const helpfulData = fetch("helpful_adverts.json").then((r) => {
    if (!r.ok) throw new Error("Helpful file not found");
    return r.json();
  });

  const responseData = fetch("response_channel.json").then((r) => {
    if (!r.ok) throw new Error("Response file not found");
    return r.json();
  });

  const featureData = fetch("key_features.json").then((r) => {
    if (!r.ok) throw new Error("Feature file not found");
    return r.json();
  });

  const groupData = fetch("primary_content.json").then((r) => {
    if (!r.ok) throw new Error("Group file not found");
    return r.json();
  });

  Promise.all([
    postcodeData,
    areaData,
    cityPostcodeData,
    noticedData,
    helpfulData,
    responseData,
    featureData,
    groupData,
  ]).then(async ([data, area, cityCodes, noticed, helpful, response, features, groups]) => {
      const resultContainer = document.getElementById("resultContainer");
      resultContainer.classList.remove("hidden");
      resultContainer.innerHTML = "";

      let entries = [];
      const pcEntries = findPostcodeEntries(data, postcode);
      if (pcEntries) entries = entries.concat(pcEntries);
      if (Array.isArray(area)) entries = entries.concat(area);
if (Array.isArray(cityCodes)) entries = entries.concat(cityCodes);

if (entries.length === 0) {
  searchVariable(query, resultContainer);
  return;
}

entries = mergeEntries(entries);

      const groupNames = Object.fromEntries(groups.map(g => [g.group_code, g.group_name]));
      const groupsSorted = aggregateGroupCounts(entries);
      const topSegments = entries
        .filter((e) => e.type)
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);
      const budget = parseFloat(document.getElementById("budgetInput").value) || 0;

      let html = `<h2 class="result-heading">Insights for ${safeQuery}</h2>`;
      html += `<div class="summary-card">Total Media Budget: £${budget.toFixed(2)}</div>`;
      html += `<div class='card-wrap'>`;

      // Area 1: Mosaic Groups
      html += groupsSorted
        .slice(0, 3)
        .map(g => `<div class="insight-card"><div class="insight-title">${g.code} - ${groupNames[g.code] || ''}</div><div class="insight-index">Count = ${g.count}</div></div>`)
        .join("");

      // Area 2: Mosaic Segments
      html += topSegments
        .map(
          (entry) => `
        <div class="insight-card">
          <div class="insight-title">${entry.type}</div>
          <div class="insight-index">Count = ${entry.count ?? "—"}</div>
        </div>
      `
        )
        .join("");

      // Area 2: Media Weighting from separate file
      topSegments.forEach((segment) => {
        const items = findMediaItems(segment.type, noticed);
        if (items) {
          html += `<h3 class='insight-subtitle'>Media Index for ${segment.type}</h3>`;
          html += items
            .map(
              (it) => {
                const indexClass = it.index > 300 ? 'high-index' : 'low-index';
                return `
          <div class="insight-card ${indexClass}">
            <div class="insight-title">${it.channel}</div>
            <div class="insight-index">Index = ${it.index ?? "—"}</div>
            <div class="insight-message">${it.message ?? ""}</div>
          </div>
        `;
              }
            )
            .join("");
        }
      });

      const { totalIndex, distribution } = calculateBudgetDistribution(topSegments, noticed, budget);
      html += `<h3 class='insight-subtitle'>Total Media Index: ${totalIndex}</h3>`;
      html += Object.entries(distribution)
        .map(
          ([channel, info]) => `
          <div class="insight-card">
            <div class="insight-title">${channel}</div>
            <div class="insight-index">Budget £${info.budget.toFixed(2)}</div>
          </div>
        `
        )
        .join("");

      // Area 3: Summary CTA
      html += `</div><button id="resetButton" class="reset-btn">Try another search</button>`;
      resultContainer.innerHTML = html;

      document.getElementById("resetButton").addEventListener("click", () => {
        document.getElementById("targetAreaInput").value = "";
        resultContainer.classList.add("hidden");
        resultContainer.innerHTML = "";
        document.getElementById("targetAreaInput").focus();
        localStorage.removeItem('audienceResult');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      window.scrollTo({ top: document.getElementById("resultContainer").offsetTop - 50, behavior: 'smooth' });

      // Build detailed result object for results.html
      const groupCode = topSegments[0].type[0];
      const groupInfo = groups.find((g) => g.group_code === groupCode) || {};
      const featureInfo = features.find((f) => f.group_code === groupCode) || {};
      const mainMedia = findMediaItems(topSegments[0].type, noticed) || [];
      const helpfulMedia = findMediaItems(topSegments[0].type, helpful) || [];
      let responseChannels = [];
      if (responseChannels.length === 0) {
        responseChannels = findMediaItems(topSegments[0].type, response) || [];
      }

      const totalCount = entries.reduce((sum, e) => sum + (e.count || 0), 0);
      const plan = mainMedia.map((m) => {
        const dist = distribution[m.channel];
        return {
          channel: m.channel,
          index: m.index,
          budget: dist ? parseFloat(dist.budget.toFixed(2)) : 0,
        };
      });

      const groupName = groupInfo.group_name || topSegments[0].type;
      let detailedFeatures = featureInfo.features || [];
      let whoWeAre = [];
      let householdTech = '';
      try {
        const detailFile = `${groupName.replace(/ /g, '_')}_Detailed.json`;
        const r = await fetch(detailFile);
        if (r.ok) {
          const detail = await r.json();
          if (Array.isArray(detail["Key Features"])) {
            detailedFeatures = detail["Key Features"];
          }
          if (detail["Who We Are"] && typeof detail["Who We Are"] === 'object') {
            whoWeAre = Object.entries(detail["Who We Are"]).map(([label, value]) => ({ label, value }));
          }
          if (detail["Advert Response Channel Index"] && typeof detail["Advert Response Channel Index"] === 'object') {
            responseChannels = Object.entries(detail["Advert Response Channel Index"]).map(([channel, index]) => ({ channel, index }));
          }
          if (typeof detail["Household Technology"] === 'string') {
            householdTech = detail["Household Technology"];
          }
        }
      } catch (_) {
        // ignore missing detailed features
      }

      const resultObj = {
        mosaic_group: `${groupName} (Group ${groupCode})`,
        description: groupInfo.description || '',
        demographics: whoWeAre,
        key_features: detailedFeatures,
        media_channels: mainMedia.map((m) => ({ label: m.channel, index: m.index })),
        noticed_channels: mainMedia.map((m) => ({ channel: m.channel, index: m.index })),
        helpful_channels: helpfulMedia.map((m) => ({ channel: m.channel, index: m.index })),
        response_channels: responseChannels,
        household_technology: householdTech,
        target: query,
        top_postcodes: [{ code: postcode || query, count: totalCount }],
        media_plan_allocation: plan,
        total_budget: budget,
      };

      localStorage.setItem('audienceResult', JSON.stringify(resultObj));
      window.location.href = 'results.html';
    })
    .catch((error) => {
      console.error("Error loading data:", error);
      const resultContainer = document.getElementById("resultContainer");
      resultContainer.classList.remove("hidden");
      resultContainer.innerHTML = `<p>There was an error loading insights.</p>`;
    });
}

document.getElementById("submitButton").addEventListener("click", runSearch);

function askOpenAI() {
  const q = document.getElementById('openAIInput').value.trim();
  if (!q) return;
  document.getElementById('openAIInput').value = '';
  const container = document.getElementById('resultContainer');
  container.classList.remove('hidden');
  container.innerHTML = '<p>Loading...</p>';
  queryOpenAI(q, container);
}

const askBtn = document.getElementById('openAIAskButton');
if (askBtn) {
  askBtn.addEventListener('click', askOpenAI);
  document.getElementById('openAIInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') askOpenAI();
  });
}

["targetAreaInput", "budgetInput"].forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      runSearch();
    }
  });
});

function searchVariable(query, container) {
  const safeQuery = escapeHTML(query);
  fetch("primary_content.json")
    .then((r) => {
      if (!r.ok) throw new Error("Variable file not found");
      return r.json();
    })
    .then((data) => {
      const results = data.filter((entry) =>
        Object.values(entry).some(
          (v) => typeof v === "string" && v.toUpperCase().includes(query)
        )
      );

      if (results.length === 0) {
        queryOpenAI(query, container);
        return;
      }

      let html = `<h2 class="result-heading">Results for ${safeQuery}</h2><div class='card-wrap'>`;
      html += results
        .slice(0, 5)
        .map(
          (e) => `
        <div class="insight-card">
          <div class="insight-title">${e["Unnamed: 1"] ?? ""} ${e["Unnamed: 2"] ?? ""}</div>
          <div class="insight-message">${e["Unnamed: 3"] ?? ""}</div>
        </div>`
        )
        .join("");
      html += `</div><button id="resetButton" class="reset-btn">Try another search</button>`;

      container.innerHTML = html;

      document.getElementById("resetButton").addEventListener("click", () => {
        document.getElementById("targetAreaInput").value = "";
        container.classList.add("hidden");
        container.innerHTML = "";
        document.getElementById("targetAreaInput").focus();
        localStorage.removeItem('audienceResult');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      window.scrollTo({ top: container.offsetTop - 50, behavior: 'smooth' });
    })
    .catch((error) => {
      console.error("Variable search error:", error);
      container.innerHTML = `<p>There was an error searching data.</p>`;
    });
}

function determineBatchFile(postcode) {
  const firstLetter = postcode[0].toUpperCase();
  const map = {
    A: "1", B: "1", C: "2", D: "2", E: "3", F: "3",
    G: "4", H: "4", I: "5", J: "5", K: "6", L: "6",
    M: "7", N: "7", O: "8", P: "8", Q: "9", R: "9",
    S: "9", T: "9", U: "9", V: "9", W: "9", X: "9", Y: "9", Z: "9"
  };
  return map[firstLetter] || "1";
}

async function loadAreaMapping(query) {
  const files = [
    'city_to_mosaic.json',
    'region_to_mosaic.json',
    'local_authority_to_mosaic.json'
  ];
  const key = query.toUpperCase();
  for (const f of files) {
    try {
      const r = await fetch(f);
      if (!r.ok) continue;
      const data = await r.json();
      if (data[key]) return data[key];
      const partialKey = Object.keys(data).find(k => k.includes(key));
      if (partialKey) return data[partialKey];
    } catch (_) {
      // ignore
    }
  }
  return null;
}

async function loadCityPostcodes(city) {
  try {
    const r = await fetch('city_to_postcodes.json');
    if (!r.ok) return [];
    const data = await r.json();
    return data[city.toUpperCase()] || [];
  } catch (_) {
    return [];
  }
}

async function loadPrefixEntries(prefix) {
  const file = `${determineBatchFile(prefix)}.json`;
  try {
    const r = await fetch(file);
    if (!r.ok) return [];
    const data = await r.json();
    const entries = [];
    for (const [pc, list] of Object.entries(data)) {
      if (pc.startsWith(prefix)) entries.push(...list);
    }
    return entries;
  } catch (_) {
    return [];
  }
}

async function loadCityPostcodeEntries(city) {
  const prefixes = await loadCityPostcodes(city);
  if (!Array.isArray(prefixes) || prefixes.length === 0) return [];
  let results = [];
  for (const pre of prefixes) {
    const entries = await loadPrefixEntries(pre);
    results = results.concat(entries);
  }
  return results;
}

function postcodeCandidates(postcode) {
  const normalized = postcode.toUpperCase().replace(/\s+/g, '');
  const match = normalized.match(/^([A-Z]{1,2}[0-9][0-9A-Z]?)([0-9])/);
  const candidates = new Set();
  if (match) {
    candidates.add(match[1] + match[2]);
    candidates.add(match[1]);
  }
  candidates.add(normalized);
  return Array.from(candidates);
}

function findPostcodeEntries(data, postcode) {
  const cands = postcodeCandidates(postcode);
  for (const c of cands) {
    if (data[c]) return data[c];
  }
  return null;
}
function mergeEntries(entries) {
  const merged = new Map();
  entries.forEach(e => {
    if (!e || !e.type) return;
    const key = e.type;
    const count = e.count || 0;
    if (!merged.has(key)) {
      merged.set(key, { type: e.type, count });
    } else {
      merged.get(key).count += count;
    }
  });
  return Array.from(merged.values());
}

function aggregateGroupCounts(entries) {
  const totals = {};
  entries.forEach(e => {
    if (!e || !e.type) return;
    const group = e.type.trim()[0];
    const cnt = e.count || 0;
    totals[group] = (totals[group] || 0) + cnt;
  });
  return Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .map(([code, count]) => ({ code, count }));
}
}

async function loadPostcodeData(postcode) {
  const primary = `${determineBatchFile(postcode)}.json`;
  try {
    const r = await fetch(primary);
    if (r.ok) {
      const data = await r.json();
      if (findPostcodeEntries(data, postcode)) return data;
    }
  } catch (e) {
    console.warn('Primary file failed', e);
  }

  for (let i = 1; i <= 9; i++) {
    const file = `${i}.json`;
    if (file === primary) continue;
    try {
      const r = await fetch(file);
      if (!r.ok) continue;
      const json = await r.json();
      if (findPostcodeEntries(json, postcode)) return json;
    } catch (_) {
      // ignore errors
    }
  }
  return {};
}

function findMediaItems(segmentType, mediaData) {
  if (mediaData[segmentType]) return mediaData[segmentType];
  const code = segmentType[0];
  const matchKey = Object.keys(mediaData).find((k) => k.startsWith(code));
  return mediaData[matchKey];
}

function queryOpenAI(query, container) {
  fetch('/api/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  })
    .then(r => r.json())
    .then(data => {
      localStorage.setItem('openAIResult', JSON.stringify({ query, answer: data.answer || data.error || 'No answer' }));
      window.location.href = 'results.html';
    })
    .catch(err => {
      console.error('OpenAI request failed', err);
      const budget = parseFloat(document.getElementById("budgetInput").value) || 0;
      Promise.all([
        fetch('/api/groupcounts').then(r => r.json()),
        fetch('noticed_adverts.json').then(r => r.json())
      ]).then(([counts, noticed]) => {
        displayGroupCounts(counts, noticed, budget, container);
      }).catch(() => {
        container.innerHTML = `<p>There was an error processing your query.</p>`;
      });
    });
}

function displayGroupCounts(data, noticed, budget, container) {
  const groupsSorted = Object.entries(data)
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 3)
    .map(([code, info]) => ({
      type: `${code} - ${info.name} (15+)`,
      count: info.total
    }));

  let html = `<h2 class="result-heading">Top Mosaic Groups</h2>`;
  html += `<div class="summary-card">Total Media Budget: £${budget.toFixed(2)}</div>`;
  html += `<div class='card-wrap'>`;
  html += groupsSorted
    .map(e => `<div class="insight-card"><div class="insight-title">${e.type}</div><div class="insight-index">Count = ${e.count}</div></div>`)
    .join('');

  groupsSorted.forEach(seg => {
    const items = findMediaItems(seg.type, noticed);
    if (items) {
      html += `<h3 class='insight-subtitle'>Media Index for ${seg.type}</h3>`;
      html += items.map(it => `<div class="insight-card"><div class="insight-title">${it.channel}</div><div class="insight-index">Index = ${it.index}</div><div class="insight-message">${it.message ?? ''}</div></div>`).join('');
    }
  });

  const { totalIndex, distribution } = calculateBudgetDistribution(groupsSorted, noticed, budget);
  html += `<h3 class='insight-subtitle'>Total Media Index: ${totalIndex}</h3>`;
  html += Object.entries(distribution)
    .map(([channel, info]) => `<div class="insight-card"><div class="insight-title">${channel}</div><div class="insight-index">Budget £${info.budget.toFixed(2)}</div></div>`)
    .join('');
  html += `</div><button id="resetButton" class="reset-btn">Try another search</button>`;

  container.innerHTML = html;
  document.getElementById("resetButton").addEventListener("click", () => {
    document.getElementById("targetAreaInput").value = "";
    container.classList.add("hidden");
    container.innerHTML = "";
    document.getElementById("targetAreaInput").focus();
    localStorage.removeItem('audienceResult');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.scrollTo({ top: container.offsetTop - 50, behavior: 'smooth' });
}


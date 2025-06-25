// main.js

document.getElementById("submitButton").addEventListener("click", () => {
  const rawInput = document.getElementById("postcodeInput").value;
  const query = rawInput.toUpperCase().trim();
  const postcode = query.replace(/\s+/g, "");
  const batchFile = determineBatchFile(postcode);

  const postcodeData = fetch(`${batchFile}.json`).then((r) => {
    if (!r.ok) throw new Error("File not found");
    return r.json();
  });

  const mediaData = fetch("media.json").then((r) => {
    if (!r.ok) throw new Error("Media file not found");
    return r.json();
  });

  Promise.all([postcodeData, mediaData]).then(([data, media]) => {
      const resultContainer = document.getElementById("resultContainer");
      resultContainer.classList.remove("hidden");
      resultContainer.innerHTML = "";

      if (!data[postcode]) {
        searchVariable(query, resultContainer);
        return;
      }

      const entries = data[postcode];
      const topSegments = entries
        .filter((e) => e.type)
        .sort((a, b) => b.count - a.count)
        .slice(0, 3);
      const budget = parseFloat(document.getElementById("budgetInput").value) || 0;

      let html = `<h2 class="result-heading">Insights for ${postcode}</h2>`;
      html += `<div class="summary-card">Total Media Budget: £${budget.toFixed(2)}</div>`;
      html += `<div class='card-wrap'>`;

      // Area 1: Mosaic Segments
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
        const items = media[segment.type];
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

      const { totalIndex, distribution } = calculateBudgetDistribution(topSegments, media, budget);
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
        document.getElementById("postcodeInput").value = "";
        resultContainer.classList.add("hidden");
        resultContainer.innerHTML = "";
        document.getElementById("postcodeInput").focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      window.scrollTo({ top: document.getElementById("resultContainer").offsetTop - 50, behavior: 'smooth' });
    })
    .catch((error) => {
      console.error("Error loading data:", error);
      document.getElementById("resultContainer").innerHTML = `<p>There was an error loading insights.</p>`;
    });
});

function searchVariable(query, container) {
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
        container.innerHTML = `
          <div class="centered-card">
            <p>No results found for <strong>${query}</strong>.</p>
          </div>`;
        return;
      }

      let html = `<h2 class="result-heading">Results for ${query}</h2><div class='card-wrap'>`;
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
        document.getElementById("postcodeInput").value = "";
        container.classList.add("hidden");
        container.innerHTML = "";
        document.getElementById("postcodeInput").focus();
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


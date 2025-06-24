// main.js

document.getElementById("submitButton").addEventListener("click", () => {
  const rawInput = document.getElementById("postcodeInput").value;
  const postcode = rawInput.toUpperCase().replace(/\s+/g, '');
  const batchFile = determineBatchFile(postcode);

  fetch(`${batchFile}.json`)
    .then((response) => {
      if (!response.ok) throw new Error("File not found");
      return response.json();
    })
    .then((data) => {
      const resultContainer = document.getElementById("resultContainer");
      resultContainer.classList.remove("hidden");
      resultContainer.innerHTML = "";

      if (!data[postcode]) {
        resultContainer.innerHTML = `
          <div class="centered-card">
            <p>No data found for postcode <strong>${postcode}</strong>.</p>
          </div>`;
        return;
      }

      const entries = data[postcode];
      let html = `<h2 class="result-heading">Insights for ${postcode}</h2><div class='card-wrap'>`;

      // Area 1: Mosaic Segments
      html += entries.filter(entry => entry.type && entry.count >= 500).map(entry => `
        <div class="insight-card" data-aos="fade-up">
          <div class="insight-title">${entry.type}</div>
          <div class="insight-index">Count = ${entry.count ?? '—'}</div>
        </div>
      `).join('');

      // Area 2: Media Weighting
      html += entries.filter(entry => entry.channel && entry.index >= 500).map(entry => `
        <div class="insight-card" data-aos="fade-up">
          <div class="insight-title">${entry.channel}</div>
          <div class="insight-index">Index = ${entry.index ?? '—'}</div>
          <div class="insight-message">${entry.message ?? ''}</div>
        </div>
      `).join('');

      // Area 3: Summary CTA
      html += `</div><button id="resetButton" class="reset-btn">Try another postcode</button>`;
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


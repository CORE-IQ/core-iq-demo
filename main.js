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
        resultContainer.innerHTML = `<p>No data found for postcode <strong>${postcode}</strong>.</p>`;
        return;
      }

      const entries = data[postcode];
      let html = `<h2>Insights for <span class="highlight">${postcode}</span></h2><div class="card-wrap">`;

      entries.forEach((entry) => {
        const channel = entry.channel || entry.type || "Unknown";
        const count = entry.count !== undefined ? entry.count : entry.index || "—";
        const message = entry.message || "";

        html += `
          <div class="insight-card compact">
            <div class="insight-title">${channel}</div>
            <div class="insight-index">Count = ${count}</div>
            ${message ? `<div class="insight-message">${message}</div>` : ""}
          </div>
        `;
      });

      html += `</div><button id="resetButton" class="reset-btn">Try another postcode</button>`;
      resultContainer.innerHTML = html;

      document.getElementById("resetButton").addEventListener("click", () => {
        document.getElementById("postcodeInput").value = "";
        resultContainer.classList.add("hidden");
        resultContainer.innerHTML = "";
        document.getElementById("postcodeInput").focus();
      });
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

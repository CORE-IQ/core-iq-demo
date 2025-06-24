document.getElementById("submitButton").addEventListener("click", () => {
  const postcode = document.getElementById("postcodeInput").value.toUpperCase().trim();
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const resultContainer = document.getElementById("resultContainer");
      resultContainer.classList.remove("hidden");

      if (!data[postcode]) {
        resultContainer.innerHTML = `<p>No data found for ${postcode}.</p>`;
        return;
      }

      const entries = data[postcode];
      let html = `<h2>Insights for ${postcode}</h2>`;
      html += "<ul>";
      entries.forEach((entry) => {
        html += `<li><strong>${entry.channel}</strong>: Index = ${entry.index} — ${entry.message}</li>`;
      });
      html += "</ul>";
      resultContainer.innerHTML = html;
    })
    .catch((error) => {
      console.error("Error loading data:", error);
      document.getElementById("resultContainer").innerHTML = `<p>There was an error loading insights.</p>`;
    });
});

document.getElementById("submitButton").addEventListener("click", () => {
  const postcode = document.getElementById("postcodeInput").value.toUpperCase().trim();

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      const result = data.find(entry => entry.postcode === postcode);
      const resultContainer = document.getElementById("resultContainer");
      resultContainer.classList.remove("hidden");

      if (!result) {
        resultContainer.innerHTML = `<p>No data found for ${postcode}.</p>`;
        return;
      }

      resultContainer.innerHTML = `
        <h2>Insights for ${postcode}</h2>
        <p><strong>Mosaic Group:</strong> ${result.group}</p>
        <p><strong>Mosaic Types:</strong> ${result.types.join(', ')}</p>
        <h3>Media Consumption</h3>
        <ul>
          <li><strong>TV & CTV:</strong> ${result.tv}</li>
          <li><strong>Programmatic Display:</strong> ${result.display}</li>
          <li><strong>Social (Meta, TikTok):</strong> ${result.social}</li>
          <li><strong>Search & YouTube:</strong> ${result.search}</li>
        </ul>
      `;
    })
    .catch((error) => {
      console.error("Error loading data:", error);
      document.getElementById("resultContainer").innerHTML = `<p>There was an error loading insights.</p>`;
    });
});

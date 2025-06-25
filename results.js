function renderAudienceResults(data) {
  const container = document.getElementById('resultContainer');
  container.classList.remove('hidden');
  container.innerHTML = '';

  const heading = document.createElement('h2');
  heading.className = 'result-heading';
  heading.textContent = data.mosaic_group;
  container.appendChild(heading);

  const desc = document.createElement('p');
  desc.textContent = data.description;
  container.appendChild(desc);

  // Demographics
  const demoSection = document.createElement('section');
  const demoTitle = document.createElement('h3');
  demoTitle.textContent = 'Demographic Indices';
  demoSection.appendChild(demoTitle);
  const demoList = document.createElement('ul');
  data.demographics.forEach((d) => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${d.label}:</strong> ${d.value} <span class="index-val" data-index="${d.index}">${d.index}</span>`;
    demoList.appendChild(li);
  });
  demoSection.appendChild(demoList);
  container.appendChild(demoSection);

  // Key features
  const featureSection = document.createElement('section');
  const featureTitle = document.createElement('h3');
  featureTitle.textContent = 'Key Features';
  featureSection.appendChild(featureTitle);
  const featureList = document.createElement('ul');
  data.key_features.forEach((f) => {
    const li = document.createElement('li');
    li.textContent = f;
    featureList.appendChild(li);
  });
  featureSection.appendChild(featureList);
  container.appendChild(featureSection);

  // Media channels
  const mediaSection = document.createElement('section');
  const mediaTitle = document.createElement('h3');
  mediaTitle.textContent = 'Media Channel Effectiveness';
  mediaSection.appendChild(mediaTitle);
  const mediaList = document.createElement('ul');
  data.media_channels.forEach((m) => {
    const li = document.createElement('li');
    li.innerHTML = `${m.label} <span class="index-val" data-index="${m.index}">${m.index}</span>`;
    mediaList.appendChild(li);
  });
  mediaSection.appendChild(mediaList);
  container.appendChild(mediaSection);

  // Postcodes
  const postSection = document.createElement('section');
  const postTitle = document.createElement('h3');
  postTitle.textContent = 'Postcode Reach';
  postSection.appendChild(postTitle);
  const postList = document.createElement('ul');
  data.top_postcodes.forEach((p) => {
    const li = document.createElement('li');
    li.textContent = `${p.code} - ${p.count}`;
    postList.appendChild(li);
  });
  postSection.appendChild(postList);
  container.appendChild(postSection);

  // Media plan
  const planSection = document.createElement('section');
  const planTitle = document.createElement('h3');
  planTitle.textContent = 'Weighted Media Budget Allocation';
  planSection.appendChild(planTitle);
  const planList = document.createElement('ul');
  data.media_plan_allocation.forEach((p) => {
    const budget = p.index < 100 ? 0 : p.budget;
    const li = document.createElement('li');
    li.innerHTML = `${p.channel}: <span class="index-val" data-index="${p.index}">${p.index}</span> - £${budget}`;
    planList.appendChild(li);
  });
  planSection.appendChild(planList);
  container.appendChild(planSection);

  applyIndexStyles(container);
}

function applyIndexStyles(container) {
  const spans = container.querySelectorAll('.index-val');
  spans.forEach((el) => {
    const val = parseFloat(el.dataset.index);
    if (val > 100) {
      el.style.color = '#00ffae';
      el.style.textShadow = '0 0 6px #00ffae';
    } else {
      el.style.color = 'red';
      el.style.textShadow = '0 0 6px red';
    }
  });
}

const stored = localStorage.getItem('audienceResult');
if (stored) {
  const data = JSON.parse(stored);
  renderAudienceResults(data);
} else {
  // Fallback to sample data when no stored result exists
  fetch('sample_result.json')
    .then((r) => r.json())
    .then((data) => {
      renderAudienceResults(data);
    });
}

// onboarding.js - Client onboarding form handler

function getVal(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function showStatus(type, message) {
  const el = document.getElementById('statusMsg');
  el.className = type;
  el.textContent = message;
  el.style.display = 'block';
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function hideStatus() {
  const el = document.getElementById('statusMsg');
  el.style.display = 'none';
  el.className = '';
}

function validate(data) {
  if (!data.firstname) return 'First name is required.';
  if (!data.lastname) return 'Last name is required.';
  if (!data.email) return 'Email address is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return 'Please enter a valid email address.';
  if (!data.company) return 'Company name is required.';
  return null;
}

document.getElementById('onboardForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  hideStatus();

  const data = {
    firstname:      getVal('firstname'),
    lastname:       getVal('lastname'),
    email:          getVal('email'),
    phone:          getVal('phone'),
    company:        getVal('company'),
    targetArea:     getVal('targetArea'),
    budget:         getVal('budget'),
    product:        getVal('product'),
    goals:          getVal('goals'),
    dealStage:      getVal('dealStage'),
    dealValue:      getVal('dealValue'),
    closeDate:      getVal('closeDate'),
    industry:       getVal('industry'),
    targetAudience: getVal('targetAudience'),
    regions:        getVal('regions')
  };

  const error = validate(data);
  if (error) {
    showStatus('error', error);
    return;
  }

  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.textContent = 'SYNCING…';

  try {
    const res = await fetch('/api/hubspot/onboard', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const json = await res.json();

    if (!res.ok || json.error) {
      showStatus('error', json.error || 'Something went wrong. Please try again.');
      return;
    }

    const action = json.action === 'updated' ? 'updated' : 'created';
    showStatus('success', `Contact ${action} in HubSpot successfully.`);
    document.getElementById('onboardForm').reset();
  } catch (err) {
    console.error('Onboard submit error:', err);
    showStatus('error', 'Network error — please check your connection and try again.');
  } finally {
    btn.disabled = false;
    btn.textContent = 'SYNC TO HUBSPOT';
  }
});

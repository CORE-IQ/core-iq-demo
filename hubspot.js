// hubspot.js - Server-side HubSpot Contacts API client
const https = require('https');

const HUBSPOT_TOKEN = process.env.HUBSPOT_PRIVATE_APP_TOKEN;
const HS_HOST = 'api.hubapi.com';

function hubspotRequest(method, path, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : null;
    const options = {
      hostname: HS_HOST,
      path,
      method,
      headers: {
        'Authorization': `Bearer ${HUBSPOT_TOKEN}`,
        'Content-Type': 'application/json',
        ...(data ? { 'Content-Length': Buffer.byteLength(data) } : {})
      }
    };

    const req = https.request(options, res => {
      let raw = '';
      res.on('data', chunk => (raw += chunk));
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(raw) });
        } catch {
          resolve({ status: res.statusCode, body: raw });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function findContactByEmail(email) {
  const res = await hubspotRequest('POST', '/crm/v3/objects/contacts/search', {
    filterGroups: [{
      filters: [{ propertyName: 'email', operator: 'EQ', value: email }]
    }],
    properties: ['email']
  });
  if (res.body.results && res.body.results.length > 0) {
    return res.body.results[0].id;
  }
  return null;
}

// Build a human-readable description field from campaign + brand data
function buildDescription({ product, goals, targetAudience, regions, dealStage, dealValue, closeDate, budget }) {
  const lines = [];
  if (product) lines.push(`Product/Service: ${product}`);
  if (goals) lines.push(`Campaign Goals: ${goals}`);
  if (targetAudience) lines.push(`Target Audience: ${targetAudience}`);
  if (regions) lines.push(`Regions of Interest: ${regions}`);
  if (dealStage) lines.push(`Deal Stage: ${dealStage}`);
  if (dealValue) lines.push(`Deal Value: £${dealValue}`);
  if (closeDate) lines.push(`Expected Close Date: ${closeDate}`);
  if (budget) lines.push(`Media Budget: £${budget}`);
  return lines.join('\n');
}

async function upsertContact(formData) {
  if (!HUBSPOT_TOKEN) {
    throw new Error('HUBSPOT_PRIVATE_APP_TOKEN is not configured');
  }

  const {
    firstname, lastname, email, phone, company,
    industry, targetArea, budget,
    product, goals, targetAudience, regions,
    dealStage, dealValue, closeDate
  } = formData;

  const properties = {
    firstname,
    lastname,
    email,
    phone: phone || '',
    company,
    industry: industry || '',
    city: targetArea || '',
    annualrevenue: dealValue || '',
    hs_lead_status: 'NEW',
    description: buildDescription({ product, goals, targetAudience, regions, dealStage, dealValue, closeDate, budget })
  };

  // Remove empty strings so we don't overwrite existing HubSpot values with blanks
  Object.keys(properties).forEach(k => {
    if (properties[k] === '') delete properties[k];
  });

  const existingId = await findContactByEmail(email);

  if (existingId) {
    const res = await hubspotRequest('PATCH', `/crm/v3/objects/contacts/${existingId}`, { properties });
    return { action: 'updated', contactId: existingId, hubspotStatus: res.status };
  }

  const res = await hubspotRequest('POST', '/crm/v3/objects/contacts', { properties });
  if (res.status !== 201) {
    throw new Error(`HubSpot API error ${res.status}: ${JSON.stringify(res.body)}`);
  }
  return { action: 'created', contactId: res.body.id, hubspotStatus: res.status };
}

module.exports = { upsertContact };

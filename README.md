# CORE-IQ Demo

This is a lightweight demo that displays audience insights by UK postcode or US ZIP code. Enter a code to see the relevant Experian Mosaic groups and media consumption indices.

## Usage
1. Install Node.js (v18 or newer is recommended). If you must use an older version, install the `node-fetch` package so the OpenAI requests work.
2. Run `npm start` from the project root to launch a small local server.
3. Open `http://localhost:8000` in your browser.
4. Enter a postcode, city, or region to view the Mosaic groups and weighted media budget.

### OpenAI integration
To enable natural language queries processed via OpenAI, set environment variables `OPENAI_API_KEY` and `OPENAI_ASSISTANT_ID` before starting the server:

```bash
export OPENAI_API_KEY=<your-api-key>
export OPENAI_ASSISTANT_ID=<your-assistant-id>
npm start
```

When a search term does not match local data, the server forwards the query to
your configured OpenAI Assistant. Postcode lookups support partial codes like
"EC1", and Mosaic group codes (such as "A" for City Prosperity) automatically
map to their detailed JSON. The assistant handles these questions using the
data uploaded to it.

You can test the endpoint directly with `curl`:

```bash
curl -X POST http://localhost:8000/api/openai \
  -H 'Content-Type: application/json' \
  -d '{"query":"Females in Cardiff"}'
```

The results page includes a **Core-IQ™ Insight** card that shows the OpenAI
response for the most relevant Mosaic group. You can ask follow‑up questions in
the card’s input field or use the **Ask Core-IQ** box on the home page to query
the assistant directly. If the OpenAI request fails (for example, if the API
key is missing or the network is down), a helpful error message appears instead.
Server-side responses now check for OpenAI errors and return that message in an
`error` field so the page can surface the issue.
If you start the server without the required environment variables, the response
will contain `{ "error": "Core-IQ service unavailable" }` to make troubleshooting
clear.

If the UI shows **"Core-IQ service unavailable"**, it usually means the page
couldn't reach the local Node server or the server couldn't contact OpenAI. Make
sure `npm start` is running and that your `.env` file contains valid
`OPENAI_API_KEY` and `OPENAI_ASSISTANT_ID` values. When running without network
access, execute `./setup.sh` first
to install stub modules so the demo can still respond.

### Python assistant script
If you prefer using Python, the `assistant_python.py` utility demonstrates
how to call an OpenAI Assistant. Install the requirement with:

```bash
pip install -r requirements.txt
```

Then run the script:

```bash
python assistant_python.py
```

It expects the `OPENAI_API_KEY` environment variable (and optionally
`OPENAI_ASSISTANT_ID`) to be set, mirroring the Node example.

The application is static and loads JSON data client-side, so it can be embedded in other pages (for example, within a HubSpot iframe).

Animations rely on simple CSS transitions, so no external libraries such as AOS are required.

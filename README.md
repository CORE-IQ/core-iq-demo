# CORE-IQ Demo

This is a lightweight demo that displays audience insights by UK postcode or US ZIP code. Enter a code to see the relevant Experian Mosaic groups and media consumption indices.

## Usage
1. Install Node.js (v18 or newer is recommended). If you must use an older version, install the `node-fetch` package so the OpenAI requests work.
2. Run `npm install` (or `./setup.sh`) to install the `openai` and `dotenv` packages.
3. Run `npm start` from the project root to launch a small local server.
4. Open `http://localhost:8000` in your browser.
5. Enter a postcode or search term to view the Mosaic groups and weighted media budget.

### OpenAI integration
To enable natural language queries processed via OpenAI, set an environment variable `OPENAI_API_KEY` before starting the server:

```bash
export OPENAI_API_KEY=<your-api-key>
npm start
```

When a search term does not match local data, the server forwards the query
with snippets from **every** JSON file in the project so OpenAI has the full
dataset. Postcode lookups support partial codes like "EC1", and Mosaic group
codes (such as "A" for City Prosperity) automatically map to their detailed
JSON. The server uses the `gpt-4o` (ChatGPT 4.0) model to generate responses.

You can test the endpoint directly with `curl`:

```bash
curl -X POST http://localhost:8000/api/openai \
  -H 'Content-Type: application/json' \
  -d '{"query":"Females in Cardiff"}'
```

The results page includes a **Core-IQ™ Insight** card that shows the OpenAI
response for the most relevant Mosaic group. You can ask follow‑up questions in
the card’s input field. If the OpenAI request fails (for example, if the API
key is missing or the network is down), a helpful error message appears instead.
Server-side responses now check for OpenAI errors and return that message in an
`error` field so the page can surface the issue.
If you start the server without an API key, the response will
contain `{ "error": "AI service not configured" }` to help troubleshoot.

If the UI shows **"Core-IQ service unavailable"**, it usually means the page
couldn't reach the local Node server or the server couldn't contact OpenAI.
Make sure `npm start` is running and that your `.env` file contains a valid
`OPENAI_API_KEY`. The server will return an error message if the key is missing
or the request fails.

You can also test the SDK locally with `node assistant.js`.

The application is static and loads JSON data client-side, so it can be embedded in other pages (for example, within a HubSpot iframe).

Animations rely on simple CSS transitions, so no external libraries such as AOS are required.

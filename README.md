# CORE-IQ Demo

This is a lightweight demo that displays audience insights by UK postcode or US ZIP code. Enter a code to see the relevant Experian Mosaic groups and media consumption indices.

## Usage
1. Install Node.js (v18 or newer is recommended). If you must use an older version, install the `node-fetch` package so the OpenAI requests work.
2. Run `npm start` from the project root to launch a small local server.
3. Open `http://localhost:8000` in your browser.
4. Enter a postcode or search term to view the Mosaic groups and weighted media budget.

### OpenAI integration
To enable natural language queries processed via OpenAI, set an environment variable `OPENAI_API_KEY` before starting the server:

```bash
export OPENAI_API_KEY=<your-api-key>
npm start
```

When a search term does not match local data, the server forwards the query
with excerpts from up to three JSON files selected using the query text and
Mosaic group names. This keeps requests focused on the most relevant data and
helps avoid conflicting information in answers. The server uses the `gpt-4o`
(ChatGPT 4.0) model to generate responses.

The application is static and loads JSON data client-side, so it can be embedded in other pages (for example, within a HubSpot iframe).

Animations rely on simple CSS transitions, so no external libraries such as AOS are required.

# CORE-IQ Demo

This is a lightweight demo that displays audience insights by UK postcode or US ZIP code. Enter a code to see the relevant Experian Mosaic groups and media consumption indices.

## Usage
1. Install Node.js if you have not already.
2. Run `npm start` from the project root to launch a small local server.
3. Open `http://localhost:8000` in your browser.
4. Enter a postcode or search term to view the Mosaic groups and weighted media budget.

### OpenAI integration
To enable natural language queries processed via OpenAI, set an environment variable `OPENAI_API_KEY` before starting the server:

```bash
export OPENAI_API_KEY=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
npm start
```

When a search term does not match local data, the server will forward the query and a snippet of the JSON files to OpenAI and display the response.

The application is static and loads JSON data client-side, so it can be embedded in other pages (for example, within a HubSpot iframe).

Animations rely on simple CSS transitions, so no external libraries such as AOS are required.

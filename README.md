# CORE-IQ Demo

This is a lightweight demo that displays audience insights by UK postcode or US ZIP code. Enter a code to see the relevant Experian Mosaic groups and media consumption indices.

## Usage
1. Open `index.html` in a browser.
2. Enter a postcode or ZIP code.
3. Review the Mosaic groups and media index information.

The application is static and loads JSON data client-side, so it can be embedded in other pages (for example, within a HubSpot iframe).

Animations rely on simple CSS transitions, so no external libraries such as AOS are required.

## Requirements
This project requires **Node.js** and **npm** to run the automated tests.

## Running Tests
Install the dependencies and execute the test suite using:

```bash
npm test
```

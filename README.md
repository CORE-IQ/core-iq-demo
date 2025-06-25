# CORE-IQ Demo

This is a lightweight demo that displays audience insights by UK postcode or US ZIP code. Enter a code to see the relevant Experian Mosaic groups and media consumption indices.

## Usage
1. Open `index.html` in a browser.
2. Enter a postcode or ZIP code.
3. Review the Mosaic groups and media index information.
4. The results highlight the top three Mosaic segments and calculate budget distribution based only on these groups.
5. Media items with an index above 300 contribute to the weighting and appear in green, while lower-index items appear in red.

The application is static and loads JSON data client-side, so it can be embedded in other pages (for example, within a HubSpot iframe).

Animations rely on simple CSS transitions, so no external libraries such as AOS are required.

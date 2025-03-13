# CSV to GeoJSON Merger

This script merges a CSV file with a GeoJSON file based on a common identifier column. It finds matching entries from the CSV and adds additional properties to the corresponding GeoJSON features.

## Installation

1. **Install Node.js** (if not already installed):
   - Download and install from [nodejs.org](https://nodejs.org/)
   - Verify installation by running:
     ```sh
     node -v
     ```

2. **Clone or Download the Script**
   - Place your `data.csv` and `data.geojson` in the same directory as the script.

3. **Install Dependencies**
   - Navigate to the script's directory and install the required package:
     ```sh
     npm install csv-parser
     ```

## Usage

1. **Update File Paths and Identifiers**
   - Open `index.js`
   - Modify the following variables to match your files:
     ```javascript
     const csvFilePath = 'data.csv'; // Path to CSV file
     const geojsonFilePath = 'data.geojson'; // Path to GeoJSON file
     const geojsonIdentifier = 'geojson_id'; // Column in GeoJSON used for matching
     const outputFilePath = 'output.geojson'; // Output file name
     ```

2. **Run the Script**
   ```sh
   node index.js
   ```

3. **Check the Output**
   - The merged GeoJSON file will be saved as `output.geojson` in the same directory.

## Notes

- The script assumes the first column in the CSV file is the matching identifier.
- If no match is found for a GeoJSON feature, a warning will be logged.
- Ensure your CSV and GeoJSON identifiers are correctly formatted (trimmed and lowercase for consistency).

## Troubleshooting

- If the script does not merge correctly:
  - Check for case-sensitive mismatches in identifiers.
  - Ensure CSV and GeoJSON files are properly formatted.
  - Add `console.log(csvData);` inside `readCSV()` for debugging.

## License

This script is open-source and can be modified freely.


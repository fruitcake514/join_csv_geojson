const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const csvFilePath = 'in.csv'; // Update with your CSV file path
const geojsonFilePath = 'in.geojson'; // Update with your GeoJSON file path

const geojsonIdentifier = 'column name'; // Column in GeoJSON to join on
const outputFilePath = 'output.geojson';
// Read CSV into a dictionary (use first column for matching, keep column names for extra fields)
function readCSV(filePath) {
    return new Promise((resolve, reject) => {
        const data = {};
        let headers;
        fs.createReadStream(filePath)
            .pipe(csv()) // Read with headers
            .on('data', (row) => {
                if (!headers) {
                    headers = Object.keys(row); // Capture column names
                }
                const key = row[headers[0]]?.trim().toLowerCase(); // Use first column as key
                if (key) {
                    data[key] = row; // Store entire row to keep additional fields
                }
            })
            .on('end', () => resolve(data))
            .on('error', reject);
    });
}

// Read GeoJSON and merge with CSV data
async function mergeGeoJSON() {
    try {
        const csvData = await readCSV(csvFilePath);
        const geojson = JSON.parse(fs.readFileSync(geojsonFilePath, 'utf8'));
        
        geojson.features = geojson.features.map(feature => {
            const featureId = feature.properties[geojsonIdentifier]?.trim().toLowerCase(); // Normalize case and trim
            if (featureId && csvData[featureId]) {
                // Merge CSV properties excluding the identifier itself to avoid duplication
                const csvEntry = { ...csvData[featureId] };
                delete csvEntry[Object.keys(csvEntry)[0]]; // Remove identifier column
                feature.properties = { ...feature.properties, ...csvEntry };
            } else {
                console.warn(`No match found for GeoJSON ID: ${featureId}`); // Debugging line
            }
            return feature;
        });

        fs.writeFileSync(outputFilePath, JSON.stringify(geojson, null, 2));
        console.log(`Merged GeoJSON saved to ${outputFilePath}`);
    } catch (error) {
        console.error('Error merging files:', error);
    }
}

mergeGeoJSON();

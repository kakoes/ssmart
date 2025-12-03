const fs = require('fs');
const path = require('path');

// File paths
const inputFile = path.join(__dirname, 'str.txt');
const outputFile = path.join(__dirname, 'stores.json');

// Read the text file
fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  try {
    // Split lines and convert into JSON
    const lines = data.split(/\r?\n/).filter(line => line.trim() !== '');
    const stores = {};

    lines.forEach(line => {
      // Example line: "20887 HIGHWAY 35": "Store 2741910"
      const match = line.match(/"(.+?)"\s*:\s*"Store (\d+)"/);
      if (match) {
        const address = match[1].trim();
        const storeId = match[2].trim();
        stores[address] = storeId;
      }
    });

    // Save JSON file
    fs.writeFile(outputFile, JSON.stringify(stores, null, 2), 'utf8', err => {
      if (err) {
        console.error('Error writing JSON file:', err);
      } else {
        console.log(`JSON file created successfully at ${outputFile}`);
      }
    });
  } catch (error) {
    console.error('Error processing data:', error);
  }
});

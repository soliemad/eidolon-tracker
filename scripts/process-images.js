
const fs = require('fs');
const path = require('path');

// --- Configuration ---
const eidolonsJsonPath = path.join(__dirname, '../src/assets/eidolons.json');
const itemsJsonPath = path.join(__dirname, '../src/assets/items.json');
const eidolonImagesDir = path.join(__dirname, '../public/image/eidolons');
const itemImagesDir = path.join(__dirname, '../public/image/items');
// --- End Configuration ---

/**
 * Processes a JSON file, extracts Base64 image strings, and saves them as PNG files.
 * @param {string} jsonPath - The absolute path to the input JSON file.
 * @param {string} outputDir - The absolute path to the directory where images will be saved.
 */
function processJsonFile(jsonPath, outputDir) {
  console.log(`Processing file: ${jsonPath}`);

  // 1. Create the output directory if it doesn't exist
  try {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`Ensured directory exists: ${outputDir}`);
  } catch (error) {
    console.error(`Error creating directory ${outputDir}:`, error);
    return;
  }

  // 2. Read and parse the JSON file
  let data;
  try {
    const fileContent = fs.readFileSync(jsonPath, 'utf8');
    data = JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading or parsing ${jsonPath}:`, error);
    return;
  }

  if (!Array.isArray(data)) {
    data = Object.values(data); // Convert object to array if necessary
  }

  if (!Array.isArray(data)) {
    
    console.error(`Error: The JSON file at ${jsonPath} is not an array.`);
    return;
  
  }

  // 3. Iterate over each item, decode Base64, and save the image
  let successCount = 0;
  for (const item of data) {
    const { id, thumbnail } = item;

    if (!id || !thumbnail) {
      console.warn(`Skipping item due to missing 'id' or 'thumbnail'. Item:`, item);
      continue;
    }

    // The thumbnail might be a data URI (e.g., "data:image/png;base64,..."). We only need the part after the comma.
    const base64Data = thumbnail.split(',').pop();
    const imageBuffer = Buffer.from(base64Data, 'base64');
    const outputPath = path.join(outputDir, `${id}.png`);

    try {
      fs.writeFileSync(outputPath, imageBuffer);
      // console.log(`Successfully saved image: ${outputPath}`);
      successCount++;
    } catch (error) {
      console.error(`Error writing file for id ${id}:`, error);
    }
  }
  console.log(`Successfully processed and saved ${successCount} images from ${path.basename(jsonPath)}.`);
  console.log('---');
}

// --- Main Execution ---
console.log('Starting image processing script...');
processJsonFile(eidolonsJsonPath, eidolonImagesDir);
processJsonFile(itemsJsonPath, itemImagesDir);
console.log('Image processing complete.');

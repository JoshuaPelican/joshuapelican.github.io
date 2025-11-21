/**
 * Fetch and parse a YAML file from a URL
 * @param {string} url - URL or path to the YAML file
 * @returns {Promise<Object>} Parsed JavaScript object
 */
async function parseYamlFile(url) {
    try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const text = await response.text();
    const data = jsyaml.load(text);
    return data;
    } catch (e) {
    console.error(`Error parsing YAML file: ${e.message}`);
    throw e;
    }
}
const axios = require('axios');
const yaml = require('js-yaml');

async function downloadAndParseSwagger(url) {
  try {
    const ext = url.slice(url.lastIndexOf('.')).toLowerCase();

    const response = await axios.get(url, { responseType: 'text' });
    const data = response.data;

    let parsedSpec;
    if (ext === '.json') {
      parsedSpec = typeof data === 'string' ? JSON.parse(data) : data;
    } else if (ext === '.yaml' || ext === '.yml') {
      parsedSpec = yaml.load(data);
    } else {
      throw new Error('Unsupported file extension');
    }

    return parsedSpec;
  } catch (error) {
    throw new Error(`Failed to download or parse Swagger: ${error.message}`);
  }
}

module.exports = { downloadAndParseSwagger };

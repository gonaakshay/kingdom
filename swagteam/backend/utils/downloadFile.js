const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const config = require('../config');

async function downloadFile(url) {
  const ext = path.extname(url).toLowerCase() || '.yaml';
  if (!config.ALLOWED_EXTENSIONS.includes(ext)) {
    throw new Error(`Unsupported file extension: ${ext}`);
  }

  if (!fs.existsSync(config.UPLOADS_PATH)) {
    fs.mkdirSync(config.UPLOADS_PATH, { recursive: true });
  }

  const filepath = path.join(config.UPLOADS_PATH, `${uuidv4()}${ext}`);

  const response = await axios.get(url, {
    responseType: 'stream',
    timeout: config.UPLOAD_TIMEOUT,
  });

  await new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);
    writer.on('finish', resolve);
    writer.on('error', reject);
  });

  return filepath;
}

module.exports = { downloadFile };

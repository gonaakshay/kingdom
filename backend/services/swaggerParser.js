const SwaggerParser = require('@apidevtools/swagger-parser');

async function parseSwagger(input) {
  let api;

  // If input is a string, treat it as a file path or URL and validate using SwaggerParser
  if (typeof input === 'string') {
    api = await SwaggerParser.validate(input);
  } else if (typeof input === 'object' && input !== null) {
    // If input is an already parsed spec object, use it directly
    api = input;
  } else {
    throw new Error('Invalid input to parseSwagger. Expecting file path string or parsed object.');
  }

  // Extract endpoints array for UI display
  const endpoints = [];
  for (const pathKey in api.paths) {
    for (const method of Object.keys(api.paths[pathKey])) {
      endpoints.push({
        path: pathKey,
        method: method.toUpperCase(),
        summary: api.paths[pathKey][method].summary || '',
      });
    }
  }
  return endpoints;
}

module.exports = { parseSwagger };

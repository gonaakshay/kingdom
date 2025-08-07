const axios = require('axios');
const config = require('../config');

function extractEndpointsFromSwagger(specContent) {
  let spec;
  try {
    spec = JSON.parse(specContent);
  } catch (e) {
    throw new Error('Invalid Swagger spec format');
  }
  if (!spec.paths) throw new Error('No paths found in Swagger spec');
  let summary = 'API Endpoints:\n';
  for (const [path, methods] of Object.entries(spec.paths)) {
    for (const [method, details] of Object.entries(methods)) {
      summary += `${method.toUpperCase()} ${path}`;
      if (details.parameters) {
        const bodyParam = details.parameters.find(p => p.in === 'body');
        if (bodyParam && bodyParam.schema) {
          summary += ` BODY: ${JSON.stringify(bodyParam.schema)}`;
        }
      }
      summary += '\n';
    }
  }
  return summary;
}

function extractJsonArray(text) {
  const start = text.indexOf('[');
  const end = text.lastIndexOf(']');
  if (start === -1 || end === -1 || end < start) throw new Error('No JSON array found in AI response');
  const jsonStr = text.substring(start, end + 1);
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    throw new Error('Failed to parse JSON array from AI response');
  }
}

async function generateTestCases(specContent, testType = 'comprehensive') {
  let endpointsSummary;
  let baseUrl = '';
  
  try {
    const spec = JSON.parse(specContent);
    endpointsSummary = extractEndpointsFromSwagger(specContent);
    
    // Extract base URL from the spec
    if (spec.servers && Array.isArray(spec.servers) && spec.servers.length > 0) {
      // OpenAPI 3.x format
      baseUrl = spec.servers[0].url;
    } else if (spec.host) {
      // Swagger 2.0 format
      const scheme = (spec.schemes && spec.schemes[0]) || 'https';
      baseUrl = `${scheme}://${spec.host}${spec.basePath || ''}`;
    }
    
    // Check if the base URL is a placeholder and replace with working alternatives
    const isPlaceholderUrl = baseUrl && (
      baseUrl.includes('api.example.com') || 
      baseUrl.includes('example.com') || 
      baseUrl.includes('placeholder.com') ||
      baseUrl.includes('mock.com')
    );
    
    if (isPlaceholderUrl) {
      console.log('Detected placeholder URL in AI service:', baseUrl);
      // Replace with working API endpoints for test generation
      if (baseUrl.includes('/v1') || baseUrl.includes('/users')) {
        baseUrl = 'https://jsonplaceholder.typicode.com';
      } else if (baseUrl.includes('/products')) {
        baseUrl = 'https://dummyjson.com';
      } else {
        baseUrl = 'https://jsonplaceholder.typicode.com';
      }
      console.log('Replaced with working API for test generation:', baseUrl);
    }
  } catch (e) {
    throw new Error('Failed to extract endpoints: ' + e.message);
  }
  
  const baseUrlInfo = baseUrl ? `\nBase URL: ${baseUrl}\n` : '';
  const prompt = `Generate both positive and negative ${testType} test cases for the following API endpoints.${baseUrlInfo}For each test case, provide: method, endpoint, expectedStatus, type (positive or negative), and if applicable, a body object matching the schema, and a headers object for authentication or custom headers. Include negative cases for missing/invalid fields, unauthorized, and forbidden access if the endpoint requires authentication.

CRITICAL INSTRUCTIONS:
1. If a base URL is provided above, use it to construct full URLs for the endpoints (e.g., if base URL is "https://jsonplaceholder.typicode.com" and endpoint is "/users", use "https://jsonplaceholder.typicode.com/users")
2. If no base URL is provided, use relative paths starting with / (e.g., "/users", "/users/123")
3. NEVER use placeholder URLs like "api.example.com" or "example.com" - always use the actual base URL provided or relative paths
4. The endpoint field should contain the full URL (if base URL provided) or the relative path (if no base URL)
5. For JSONPlaceholder API, use endpoints like /users, /posts, /comments, /albums, /photos, /todos
6. For DummyJSON API, use endpoints like /products, /carts, /users, /posts, /quotes, /todos

Return ONLY the test cases as a valid JSON array of objects, with no extra text, Markdown, or explanation. Do not include any text before or after the JSON array.

${endpointsSummary}`;

  const response = await axios.post(
    `${config.OPENROUTER_BASE_URL}/chat/completions`,
    {
      model: config.QWEN3_MODEL,
      messages: [
        { role: 'system', content: 'You are an expert API testing engineer. CRITICAL: Always use the actual base URL provided in the prompt for generating test cases. NEVER use placeholder URLs like api.example.com, example.com, or any other placeholder domains. If a base URL is provided, construct full URLs by combining the base URL with the endpoint path. If no base URL is provided, use relative paths starting with /. For JSONPlaceholder API (jsonplaceholder.typicode.com), use endpoints like /users, /posts, /comments, /albums, /photos, /todos. For DummyJSON API (dummyjson.com), use endpoints like /products, /carts, /users, /posts, /quotes, /todos.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 4000,
      temperature: 0.7,
      top_p: 0.9,
    },
    {
      headers: { Authorization: `Bearer ${config.OPENROUTER_API_KEY}` },
      timeout: config.AI_TIMEOUT,
    }
  );

  // Post-process: extract the first JSON array from the AI response
  const aiText = response.data.choices[0].message.content;
  try {
    const testCasesArray = extractJsonArray(aiText);
    return testCasesArray;
  } catch (err) {
    console.error('AI raw output (for debugging):', aiText);
    throw new Error('Failed to parse JSON array from AI response. Raw output: ' + aiText);
  }
}

module.exports = { generateTestCases };

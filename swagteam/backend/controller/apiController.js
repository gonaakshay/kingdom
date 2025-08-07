const fs = require('fs');
const config = require('../config');
const { downloadAndParseSwagger } = require('../utils/swaggerDownloader');
const { parseSwagger } = require('../services/swaggerParser');
const { generateTestCases } = require('../services/aiService');
const { runTests } = require('../services/testRunner');

async function uploadSwagger(req, res) {
  try {
    let parsedSpec;

    if (req.file) {
      // Read and parse uploaded file
      const fileContent = fs.readFileSync(req.file.path, 'utf-8');
      const ext = req.file.originalname.slice(req.file.originalname.lastIndexOf('.')).toLowerCase();

      if (ext === '.json') {
        parsedSpec = JSON.parse(fileContent);
      } else if (ext === '.yaml' || ext === '.yml') {
        const yaml = require('js-yaml');
        parsedSpec = yaml.load(fileContent);
      } else {
        return res.status(400).json({ error: 'Unsupported file extension' });
      }
    } else if (req.body.swaggerUrl) {
      // Download and parse from URL
      parsedSpec = await downloadAndParseSwagger(req.body.swaggerUrl);
    } else {
      return res.status(400).json({ error: 'No Swagger file or URL provided' });
    }

    // Extract endpoints from parsed spec
    const endpoints = await parseSwagger(parsedSpec);

    // Include full Swagger spec in the response for frontend use
    res.json({
      success: true,
      endpoints,
      swaggerFile: parsedSpec
    });
  } catch (error) {
    console.error('Error in uploadSwagger:', error);
    res.status(500).json({ error: error.message });
  }
}


async function generateTestCasesController(req, res) {
  try {
    const { swaggerSpec, testType } = req.body;

    if (!swaggerSpec) {
      return res.status(400).json({ error: 'Swagger spec missing or invalid' });
    }

    const testCases = await generateTestCases(JSON.stringify(swaggerSpec), testType);

    res.json({ success: true, testCases });
  } catch (error) {
    console.error('Error in generateTestCasesController:', error);
    if (error.response && error.response.status === 400) {
      return res.status(400).json({ error: 'Prompt too large or invalid for AI service.' });
    }
    res.status(500).json({ error: error.message });
  }
}

async function runTestsController(req, res) {
  try {
    const { testCases, swaggerSpec } = req.body;
    if (!Array.isArray(testCases) || testCases.length === 0) {
      return res.status(400).json({ error: 'No test cases provided' });
    }
    
    // Dynamically extract base URL from swaggerSpec if provided
    let baseUrl = '';
    if (swaggerSpec) {
      // Handle OpenAPI 3.x format (servers array)
      if (swaggerSpec.servers && Array.isArray(swaggerSpec.servers) && swaggerSpec.servers.length > 0) {
        baseUrl = swaggerSpec.servers[0].url;
      }
      // Handle Swagger 2.0 format (host, schemes, basePath)
      else if (swaggerSpec.host) {
        const scheme = (swaggerSpec.schemes && swaggerSpec.schemes[0]) || 'https';
        baseUrl = `${scheme}://${swaggerSpec.host}${swaggerSpec.basePath || ''}`;
      }
    }
    
    // Check if the base URL is a placeholder (like api.example.com)
    const isPlaceholderUrl = baseUrl && (
      baseUrl.includes('api.example.com') || 
      baseUrl.includes('example.com') || 
      baseUrl.includes('placeholder.com') ||
      baseUrl.includes('mock.com')
    );
    
    if (isPlaceholderUrl) {
      console.log('Detected placeholder URL:', baseUrl);
      // Replace with a working API endpoint for testing
      // Using JSONPlaceholder as a working example API
      if (baseUrl.includes('/v1') || baseUrl.includes('/users')) {
        baseUrl = 'https://jsonplaceholder.typicode.com';
        console.log('Replaced with working API:', baseUrl);
      } else if (baseUrl.includes('/products')) {
        baseUrl = 'https://dummyjson.com';
        console.log('Replaced with working API:', baseUrl);
      } else {
        baseUrl = 'https://jsonplaceholder.typicode.com';
        console.log('Replaced with default working API:', baseUrl);
      }
    }
    
    console.log('Final base URL:', baseUrl);
    const results = await runTests(testCases, baseUrl);
    res.json({ success: true, results });
  } catch (error) {
    console.error('Error in runTestsController:', error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { uploadSwagger, generateTestCasesController, runTestsController };

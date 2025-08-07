const axios = require('axios');

function isFullUrl(url) {
  return /^https?:\/\//i.test(url);
}

// Map common endpoint paths to working API endpoints
function mapEndpointPath(endpoint, baseUrl) {
  if (!endpoint) return endpoint;
  
  // If using JSONPlaceholder API, map common paths
  if (baseUrl.includes('jsonplaceholder.typicode.com')) {
    // Map common paths to JSONPlaceholder endpoints
    if (endpoint.includes('/users')) {
      return endpoint.replace(/\/users(\/\d+)?$/, '/users$1');
    } else if (endpoint.includes('/posts')) {
      return endpoint.replace(/\/posts(\/\d+)?$/, '/posts$1');
    } else if (endpoint.includes('/comments')) {
      return endpoint.replace(/\/comments(\/\d+)?$/, '/comments$1');
    } else if (endpoint.includes('/albums')) {
      return endpoint.replace(/\/albums(\/\d+)?$/, '/albums$1');
    } else if (endpoint.includes('/photos')) {
      return endpoint.replace(/\/photos(\/\d+)?$/, '/photos$1');
    } else if (endpoint.includes('/todos')) {
      return endpoint.replace(/\/todos(\/\d+)?$/, '/todos$1');
    }
  }
  
  // If using DummyJSON API, map common paths
  if (baseUrl.includes('dummyjson.com')) {
    if (endpoint.includes('/products')) {
      return endpoint.replace(/\/products(\/\d+)?$/, '/products$1');
    } else if (endpoint.includes('/carts')) {
      return endpoint.replace(/\/carts(\/\d+)?$/, '/carts$1');
    } else if (endpoint.includes('/users')) {
      return endpoint.replace(/\/users(\/\d+)?$/, '/users$1');
    } else if (endpoint.includes('/posts')) {
      return endpoint.replace(/\/posts(\/\d+)?$/, '/posts$1');
    } else if (endpoint.includes('/quotes')) {
      return endpoint.replace(/\/quotes(\/\d+)?$/, '/quotes$1');
    } else if (endpoint.includes('/todos')) {
      return endpoint.replace(/\/todos(\/\d+)?$/, '/todos$1');
    }
  }
  
  return endpoint;
}

async function runTests(testCases, baseUrl = '') {
  console.log('Running tests with base URL:', baseUrl);
  
  // Each testCase may have: method, endpoint, expectedStatus, body, type, headers, etc.
  const results = await Promise.all(testCases.map(async (tc) => {
    let actualStatus = null;
    let result = 'FAIL';
    let error = null;
    let finalUrl = '';
    
    try {
      let url = tc.endpoint;
      
      if (!isFullUrl(url)) {
        if (baseUrl) {
          // Map the endpoint path to a working API endpoint
          const mappedEndpoint = mapEndpointPath(url, baseUrl);
          finalUrl = baseUrl.replace(/\/$/, '') + '/' + mappedEndpoint.replace(/^\//, '');
        } else {
          // If no base URL is provided, we can't run the test
          error = 'No base URL provided. Cannot run test without a valid base URL.';
          actualStatus = 'ERROR';
          return {
            ...tc,
            actualStatus,
            result,
            error,
            finalUrl: url
          };
        }
      } else {
        finalUrl = url;
      }
      
      console.log(`Running test: ${tc.method || 'GET'} ${finalUrl}`);
      
      const response = await axios({
        method: tc.method || 'get',
        url: finalUrl,
        data: tc.body || undefined,
        headers: tc.headers || undefined,
        validateStatus: () => true, // allow all status codes
        timeout: 10000 // 10 second timeout
      });
      
      actualStatus = response.status;
      if (actualStatus === tc.expectedStatus) {
        result = 'PASS';
      }
    } catch (e) {
      error = e.message;
      actualStatus = 'ERROR';
      console.error(`Test failed for ${tc.method || 'GET'} ${finalUrl}:`, e.message);
    }
    
    return {
      ...tc,
      actualStatus,
      result,
      error,
      finalUrl
    };
  }));
  
  return results;
}

module.exports = { runTests };
  
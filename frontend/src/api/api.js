import axios from 'axios';

const baseUrl = 'https://kingdom-olj1.onrender.com';

export async function uploadSwaggerFile(file) {
  const formData = new FormData();
  formData.append('swagger', file);

  const response = await axios.post(`${baseUrl}/api/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  console.log('Raw upload API response:', response.data); // Add this log here to debug
  
  return response.data;
}

export async function uploadSwaggerUrl(swaggerUrl) {
  const response = await axios.post(
    `${baseUrl}/api/upload`,
    { swaggerUrl },
    { headers: { 'Content-Type': 'application/json' } }
  );
  return response.data;
}

export async function generateTestCases(swaggerFile, testType = 'comprehensive') {
  const response = await axios.post(
    `${baseUrl}/api/generate-test-cases`,
    {
      swaggerSpec: swaggerFile, // note: backend expects swaggerSpec as property name
      testType,
    }
  );
  return response.data;
}

export async function runTests(testCases, swaggerSpec) {
  const response = await axios.post(`${baseUrl}/api/test`, { testCases, swaggerSpec });
  return response.data;
}

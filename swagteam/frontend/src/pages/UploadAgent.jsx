import React, { useState } from 'react';
import UploadForm from '../components/UploadForm';
import EndpointsList from '../components/EndpointsList';
import TestCaseGenerator from '../components/TestCaseGenerator';
import TestResultsTable from '../components/TestResultsTable';
import DownloadButton from '../components/DownloadButton';
import StatsBanner from '../components/StatsBanner';
import { runTests } from '../api/api';

const UploadAgent = () => {
  // Holds the full swagger info: endpoints and swaggerFile
  const [swaggerInfo, setSwaggerInfo] = useState(null);
  const [testCases, setTestCases] = useState('');
  const [testResults, setTestResults] = useState([]);
  const [runLoading, setRunLoading] = useState(false);
  const [runError, setRunError] = useState('');

  // Upload success handler - logs backend response and stores in state
  const handleUploadSuccess = (data) => {
    console.log('Upload response received in handleUploadSuccess:', data);
    setSwaggerInfo({
      success: data.success,
      endpoints: data.endpoints,
      swaggerFile: data.swaggerFile,
    });
    setTestCases('');
    setTestResults([]);
  };

  // Log current swaggerInfo on every render for debugging
  console.log('Current swaggerInfo state:', swaggerInfo);

  const handleTestCasesGenerated = (rawTestCases) => {
    let parsed;
    try {
      parsed = typeof rawTestCases === 'string' ? JSON.parse(rawTestCases) : rawTestCases;
      setTestCases(JSON.stringify(parsed, null, 2));
      setRunError('');
    } catch (e) {
      setTestCases(rawTestCases);
      setRunError('Test cases are not in a valid JSON format. Please check the AI output.');
    }
  };

  const handleRunTests = async () => {
    setRunError('');
    setRunLoading(true);
    try {
      let parsedTestCases = testCases;
      if (typeof testCases === 'string') {
        try {
          parsedTestCases = JSON.parse(testCases);
        } catch {
          setRunError('Test cases are not in a valid format for running.');
          setRunLoading(false);
          return;
        }
      }
      const response = await runTests(parsedTestCases, swaggerInfo?.swaggerFile);
      if (response.success) {
        setTestResults(response.results);
      } else {
        setRunError('Failed to run test cases.');
      }
    } catch (err) {
      setRunError('Error running test cases.');
      console.error('Error during runTests:', err);
    } finally {
      setRunLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UploadForm onUploadSuccess={handleUploadSuccess} />

        {swaggerInfo && swaggerInfo.endpoints && (
          <div className="mt-12 space-y-8">
            <EndpointsList endpoints={swaggerInfo.endpoints} />

            <TestCaseGenerator
              swaggerFile={swaggerInfo.swaggerFile}
              onTestCasesGenerated={handleTestCasesGenerated}
            />

            {testCases && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    Generated Test Cases
                  </h3>
                  <div className="flex space-x-4">
                    <DownloadButton content={testCases} filename="test-cases.md" />
                    <button
                      onClick={handleRunTests}
                      disabled={runLoading}
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {runLoading ? 'Running...' : 'Run Tests'}
                    </button>
                  </div>
                </div>
                
                {runError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                    <p className="text-red-600">{runError}</p>
                  </div>
                )}
                
                <div className="bg-gray-50 rounded-lg p-6">
                  <pre className="whitespace-pre-wrap text-sm text-gray-800 overflow-x-auto">
                    {testCases}
                  </pre>
                </div>
              </div>
            )}

            {testResults.length > 0 && (
              <div className="space-y-8">
                <StatsBanner results={testResults} />
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                    Test Results
                  </h3>
                  <TestResultsTable results={testResults} />
                  <div className="mt-6">
                    <DownloadButton content={JSON.stringify(testResults, null, 2)} filename="test-results.json" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadAgent;

import React from 'react';
import DownloadButton from './DownloadButton';

const ResultsSummary = ({ results }) => {
  if (!results || results.length === 0) {
    return <p className="text-center text-gray-500">No test results available.</p>;
  }

  const total = results.length;
  const passed = results.filter(r => r.result === 'PASS').length;
  const failed = results.filter(r => r.result === 'FAIL').length;
  const warnings = results.filter(r => r.result === 'WARNING').length;
  const successRate = Math.round((passed / total) * 100);

  return (
    <div className="p-6 border rounded shadow bg-white space-y-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-900">Test Summary</h2>
      <div className="flex justify-around text-center text-sm">
        <div>
          <p className="font-bold text-green-600">{passed}</p>
          <p>Passed</p>
        </div>
        <div>
          <p className="font-bold text-red-600">{failed}</p>
          <p>Failed</p>
        </div>
        <div>
          <p className="font-bold text-yellow-600">{warnings}</p>
          <p>Warnings</p>
        </div>
        <div>
          <p className="font-bold text-blue-600">{total}</p>
          <p>Total Tests</p>
        </div>
        <div>
          <p className="font-bold text-gray-700">{successRate}%</p>
          <p>Success Rate</p>
        </div>
      </div>
      <DownloadButton content={JSON.stringify(results, null, 2)} filename="test-results.json" />
    </div>
  );
};

export default ResultsSummary;

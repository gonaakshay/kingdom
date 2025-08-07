import React from 'react';

const EndpointsList = ({ endpoints }) => {
  if (!endpoints || endpoints.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Extracted Endpoints
        </h3>
        <p className="text-gray-600">No endpoints extracted yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        Extracted Endpoints
      </h3>
      <div className="overflow-hidden border border-gray-200 rounded-lg">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-gray-900">Method</th>
              <th className="px-6 py-4 text-sm font-semibold text-gray-900">Path</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {endpoints.map(({ method, path }, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold text-white ${getMethodColorClass(method)}`}>
                    {method}
                  </span>
                </td>
                <td className="px-6 py-4 font-mono text-sm text-gray-900">{path}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function getMethodColorClass(method) {
  switch (method.toUpperCase()) {
    case 'GET': return 'bg-green-600';
    case 'POST': return 'bg-blue-600';
    case 'PUT': return 'bg-yellow-600';
    case 'DELETE': return 'bg-red-600';
    case 'PATCH': return 'bg-purple-600';
    default: return 'bg-gray-600';
  }
}

export default EndpointsList;

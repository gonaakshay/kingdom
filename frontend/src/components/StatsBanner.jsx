import React from 'react';
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const StatsBanner = ({ results }) => {
  const total = results.length;
  const passed = results.filter(r => r.result === 'PASS').length;
  const failed = results.filter(r => r.result === 'FAIL').length;
  const warnings = results.filter(r => r.result === 'WARNING').length;

  const stats = [
    {
      label: 'Passed',
      value: passed,
      icon: CheckCircleIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      label: 'Failed',
      value: failed,
      icon: XCircleIcon,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      label: 'Warnings',
      value: warnings,
      icon: ExclamationTriangleIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      label: 'Total',
      value: total,
      icon: ChartBarIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        Test Results Summary
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${stat.bgColor} mb-4`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBanner;

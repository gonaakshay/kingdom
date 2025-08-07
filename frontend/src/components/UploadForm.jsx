import React, { useState } from 'react';
import { uploadSwaggerFile, uploadSwaggerUrl } from '../api/api';
import { CloudArrowUpIcon, LinkIcon } from '@heroicons/react/24/outline';

const UploadForm = ({ onUploadSuccess }) => {
  const [useUrl, setUseUrl] = useState(false);
  const [file, setFile] = useState(null);
  const [swaggerUrl, setSwaggerUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let data;
      if (useUrl) {
        if (!swaggerUrl) throw new Error('Please enter a Swagger URL');
        data = await uploadSwaggerUrl(swaggerUrl);
      } else {
        if (!file) throw new Error('Please select a file');
        data = await uploadSwaggerFile(file);
      }
      onUploadSuccess(data);
    } catch (err) {
      setError(err.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.name.endsWith('.json') || droppedFile.name.endsWith('.yaml') || droppedFile.name.endsWith('.yml'))) {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Your Testing Workspace
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Upload your Swagger files, extract endpoints, and generate comprehensive test cases with AI-powered intelligence.
        </p>
      </div>

      {/* Upload Card */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
          Upload Swagger Specification
        </h2>
        <p className="text-gray-600 text-center mb-8">
          Choose your preferred method to upload your API specification
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Upload Method Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <button
              type="button"
              onClick={() => setUseUrl(false)}
              className={`p-6 border-2 rounded-lg text-left transition-all ${
                !useUrl
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center mb-2">
                <CloudArrowUpIcon className="w-6 h-6 mr-3" />
                <span className="font-semibold">Upload File</span>
              </div>
              <p className="text-sm text-gray-600">JSON, YAML, YML</p>
            </button>

            <button
              type="button"
              onClick={() => setUseUrl(true)}
              className={`p-6 border-2 rounded-lg text-left transition-all ${
                useUrl
                  ? 'border-blue-600 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center mb-2">
                <LinkIcon className="w-6 h-6 mr-3" />
                <span className="font-semibold">Upload URL</span>
              </div>
              <p className="text-sm text-gray-600">Direct link to spec</p>
            </button>
          </div>

          {/* File Upload Area */}
          {!useUrl && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select File
              </label>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors"
                onDrop={handleFileDrop}
                onDragOver={(e) => e.preventDefault()}
              >
                <CloudArrowUpIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  Drop your Swagger file here or click to browse files
                </p>
                <input
                  type="file"
                  onChange={handleFileSelect}
                  accept=".json,.yaml,.yml"
                  className="hidden"
                  id="file-upload"
                  disabled={loading}
                />
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  <CloudArrowUpIcon className="w-4 h-4 mr-2" />
                  Choose File
                </label>
                {file && (
                  <p className="mt-2 text-sm text-gray-500">
                    Selected: {file.name}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* URL Input */}
          {useUrl && (
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Swagger URL
              </label>
              <input
                type="url"
                value={swaggerUrl}
                onChange={(e) => setSwaggerUrl(e.target.value)}
                placeholder="https://example.com/swagger.json"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                disabled={loading}
                required={useUrl}
              />
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || (!useUrl && !file) || (useUrl && !swaggerUrl)}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Uploading...' : 'Upload and Extract Endpoints'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;

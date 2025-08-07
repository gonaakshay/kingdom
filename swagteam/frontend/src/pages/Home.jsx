import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  SparklesIcon, 
  ArrowRightIcon, 
  InformationCircleIcon,
  CloudArrowUpIcon,
  LinkIcon,
  CodeBracketIcon,
  PlayIcon,
  ChartBarIcon,
  BoltIcon,
  ShieldCheckIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  const [showLearnMore, setShowLearnMore] = useState(false);

  const howItWorksSteps = [
    {
      icon: CloudArrowUpIcon,
      title: "Upload Swagger Files",
      description: "Upload your OpenAPI YAML or JSON files with drag-and-drop ease"
    },
    {
      icon: LinkIcon,
      title: "URL Swagger Extraction",
      description: "Extract endpoints directly from Swagger URLs using Qwen3 AI"
    },
    {
      icon: CodeBracketIcon,
      title: "Extract Endpoints",
      description: "Automatically extract and display all API endpoints from your specification"
    },
    {
      icon: PlayIcon,
      title: "One-Click Testing",
      description: "Test all endpoints with a single click and get instant results"
    },
    {
      icon: ChartBarIcon,
      title: "Detailed Results",
      description: "View comprehensive test results with status codes and response times"
    }
  ];

  const features = [
    {
      icon: SparklesIcon,
      title: "AI-Powered",
      description: "Leverage artificial intelligence for intelligent API testing"
    },
    {
      icon: BoltIcon,
      title: "Lightning Fast",
      description: "Get results in seconds, not minutes"
    },
    {
      icon: ShieldCheckIcon,
      title: "Secure",
      description: "Your API specifications are processed securely"
    },
    {
      icon: DocumentTextIcon,
      title: "Comprehensive",
      description: "Support for all OpenAPI specification formats"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="text-center py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-4xl mx-auto">
          {/* Central Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
              <SparklesIcon className="w-12 h-12 text-white" />
            </div>
          </div>
          
          {/* Welcome Message */}
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to <span className="text-blue-600">Swagosaur</span>
          </h1>
          
          {/* Description */}
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The intelligent API testing platform that simplifies your workflow. Upload Swagger files, extract endpoints, and test with confidence.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/upload-agent"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              <SparklesIcon className="w-5 h-5 mr-2" />
              Get Started
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
            <button
              onClick={() => setShowLearnMore(!showLearnMore)}
              className="inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              <InformationCircleIcon className="w-5 h-5 mr-2" />
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Learn More Section */}
      {showLearnMore && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            {/* AI-Powered API Testing Section */}
            <div className="text-center mb-16">
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg">
                  <SparklesIcon className="w-10 h-10 text-white" />
                </div>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                AI-Powered API Testing
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The intelligent API testing platform that simplifies your workflow. Upload Swagger files, extract endpoints, and test with confidence.
              </p>
            </div>

            {/* How It Works Section */}
            <div className="text-center mb-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                How It Works
              </h3>
              <p className="text-lg text-gray-600 mb-12">
                Five simple steps to transform your API testing experience
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                {howItWorksSteps.map((step, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Why Choose Swagosaur Section */}
            <div className="text-center">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Swagosaur?
              </h3>
              <p className="text-lg text-gray-600 mb-12">
                Built for developers who demand speed, accuracy, and simplicity
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Transform Your API Testing?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of developers who trust Swagosaur for their API testing needs
          </p>
          <Link
            to="/upload-agent"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            <BoltIcon className="w-5 h-5 mr-2" />
            Start Testing Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

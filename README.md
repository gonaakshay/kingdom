# Swaggoz - AI-Powered API Testing Platform

A modern, AI-powered API testing platform that automatically generates and executes comprehensive test cases from Swagger/OpenAPI specifications.

## 🚀 Features

- **AI-Powered Test Generation**: Automatically generates positive and negative test cases using AI
- **Swagger/OpenAPI Support**: Supports both Swagger 2.0 and OpenAPI 3.x specifications
- **Smart URL Handling**: Automatically detects and replaces placeholder URLs with working APIs
- **Real-time Test Execution**: Run tests against actual APIs with detailed results
- **Modern UI**: Beautiful, responsive interface built with React and Tailwind CSS
- **Comprehensive Reporting**: Detailed test results with pass/fail status and error messages

## 🏗️ Architecture

- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js with Express
- **AI Integration**: OpenRouter API with Qwen3 model
- **Testing**: Axios for HTTP requests

## 📁 Project Structure

```
swagteam1c/
├── swagteam/
│   ├── backend/           # Node.js Express server
│   │   ├── controller/    # API controllers
│   │   ├── services/      # Business logic
│   │   ├── routes/        # API routes
│   │   ├── utils/         # Utility functions
│   │   └── uploads/       # Uploaded files
│   └── frontend/          # React application
│       ├── src/
│       │   ├── components/ # React components
│       │   ├── pages/      # Page components
│       │   └── api/        # API client
│       └── public/         # Static assets
```

## 🛠️ Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Backend Setup

1. Navigate to the backend directory:
```bash
cd swagteam/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with your configuration:
```env
PORT=5000
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
QWEN3_MODEL=qwen/qwen3-coder
CORS_ORIGINS=http://localhost:3000
```

4. Start the development server:
```bash
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd swagteam/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm start
```

## 🚀 Deployment

### Frontend Deployment (Vercel)

1. Connect your GitHub repository to Vercel
2. Set the following environment variables in Vercel:
   - `REACT_APP_BACKEND_URL`: Your backend URL (e.g., `https://your-app.onrender.com`)

3. Deploy the frontend directory (`swagteam/frontend`)

### Backend Deployment (Render)

1. Connect your GitHub repository to Render
2. Set the following environment variables in Render:
   - `PORT`: 5000
   - `OPENROUTER_API_KEY`: Your OpenRouter API key
   - `OPENROUTER_BASE_URL`: https://openrouter.ai/api/v1
   - `QWEN3_MODEL`: qwen/qwen3-coder
   - `CORS_ORIGINS`: Your frontend URL (e.g., `https://your-app.vercel.app`)

3. Set the build command: `npm install`
4. Set the start command: `node server.js`
5. Deploy the backend directory (`swagteam/backend`)

## 🔧 Configuration

### Environment Variables

#### Backend
- `PORT`: Server port (default: 5000)
- `OPENROUTER_API_KEY`: Your OpenRouter API key
- `OPENROUTER_BASE_URL`: OpenRouter API base URL
- `QWEN3_MODEL`: AI model to use
- `CORS_ORIGINS`: Allowed CORS origins

#### Frontend
- `REACT_APP_BACKEND_URL`: Backend API URL

## 📊 API Endpoints

### Backend API

- `POST /api/upload` - Upload Swagger/OpenAPI specification
- `POST /api/generate-test-cases` - Generate test cases using AI
- `POST /api/test` - Execute test cases

### Frontend Routes

- `/` - Home page
- `/upload-agent` - Main testing interface

## 🤖 AI Integration

The platform uses OpenRouter's Qwen3 model to generate comprehensive test cases. The AI:

- Analyzes Swagger/OpenAPI specifications
- Generates positive and negative test cases
- Handles authentication scenarios
- Creates realistic test data

## 🔍 Smart URL Handling

The platform automatically detects placeholder URLs (like `api.example.com`) and replaces them with working APIs:

- **JSONPlaceholder**: For user/post/comment endpoints
- **DummyJSON**: For product/cart endpoints

## 📝 Usage

1. **Upload Specification**: Upload a Swagger/OpenAPI JSON or YAML file
2. **Generate Tests**: Click "Generate Test Cases" to create AI-powered tests
3. **Run Tests**: Execute the generated tests against real APIs
4. **View Results**: Analyze test results with detailed reporting

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure `CORS_ORIGINS` is set correctly
2. **AI Generation Fails**: Check your OpenRouter API key
3. **Tests Fail**: Verify the API endpoints are accessible

### Debug Mode

Enable debug logging by setting `NODE_ENV=development` in your environment variables.

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

For support, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ by the Swaggoz Team**

#!/bin/bash

echo "🚀 Starting Swaggoz AI API Testing Platform..."

# Start backend
echo "📡 Starting backend server on port 5001..."
cd backend
PORT=5001 node server.js &
BACKEND_PID=$!
cd ..

# Wait a moment for backend to start
sleep 2

# Start frontend
echo "🌐 Starting frontend server on port 3000..."
cd frontend
REACT_APP_BACKEND_URL=http://localhost:5001 npm start &
FRONTEND_PID=$!
cd ..

echo "✅ Both servers are starting..."
echo "📡 Backend: http://localhost:5001"
echo "🌐 Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './pages/Home';
import UploadAgent from './pages/UploadAgent';

const App = () => (
  <ErrorBoundary>
    <Router>
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload-agent" element={<UploadAgent />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  </ErrorBoundary>
);

export default App;

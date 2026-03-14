import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategorySelectionPage from './pages/CategorySelectionPage';
import StudyPage from './pages/StudyPage';
import './App.css';

// Placeholder components to satisfy routing temporarily
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h2>{title}</h2>
    <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>Back to Home</a>
  </div>
);

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/study" element={<CategorySelectionPage mode="study" />} />
          <Route path="/study/:category" element={<StudyPage />} />
          <Route path="/quiz" element={<CategorySelectionPage mode="quiz" />} />
          <Route path="/stats" element={<PlaceholderPage title="Statistics Page" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

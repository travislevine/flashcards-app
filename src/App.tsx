import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategorySelectionPage from './pages/CategorySelectionPage';
import StudyPage from './pages/StudyPage';
import RedoPage from './pages/RedoPage';
import QuizSelectionPage from './pages/QuizSelectionPage';
import QuizPage from './pages/QuizPage';
import './App.css';

/**
 * Temporary component for pages that are not yet implemented.
 */
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="page-container mt-2 text-center">
    <h2>{title}</h2>
    <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>Back to Home</a>
  </div>
);

/**
 * Main application component responsible for routing.
 */
function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/study" element={<CategorySelectionPage mode="study" />} />
          <Route path="/study/:category" element={<StudyPage />} />
          <Route path="/redo/:category" element={<RedoPage />} />
          <Route path="/quiz" element={<QuizSelectionPage />} />
          <Route path="/quiz/:category" element={<QuizPage />} />
          <Route path="/stats" element={<PlaceholderPage title="Statistics Page" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CategorySelectionPage from './pages/CategorySelectionPage';
import StudyPage from './pages/StudyPage';
import RedoPage from './pages/RedoPage';
import QuizSelectionPage from './pages/QuizSelectionPage';
import QuizPage from './pages/QuizPage';
import StatsPage from './pages/StatsPage';
import './App.css';

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
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

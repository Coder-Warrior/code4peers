import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainComponent from './components/main-component.jsx';
import Results from './components/results-component.jsx';
import ResultsGuide from './components/results-guide.jsx';
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<MainComponent />} />
      <Route path="/results-guide" element={<ResultsGuide />} />
      <Route path="/results" element={<Results />}/>
    </Routes>
  </Router>
);
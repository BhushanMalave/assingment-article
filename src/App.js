import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Articles from './pages/Articles/Articles';
import ArticleDetails from './pages/ArticlesDetails/ArticlesDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Articles />} />
        <Route path="/articleDetails/:articleId" element={<ArticleDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

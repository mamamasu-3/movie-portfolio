// src/App.js
import React from 'react';
import MovieCarousel from './components/MovieCarousel';
import MovieSearch from './components/MovieSearch';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header>
        <h1>私の映画ポートフォリオ</h1>
      </header>
      <main>
        <MovieSearch />
        <MovieCarousel />
      </main>
      <footer>
        <p>© 2025 My Movie Portfolio</p>
      </footer>
    </div>
  );
}

export default App;

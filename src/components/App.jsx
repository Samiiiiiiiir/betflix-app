import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Main page</h1>} />
        <Route path="/movies" element={<h1>Movie page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

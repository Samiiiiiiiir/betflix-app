import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

import { ActorDetail } from './pages/ActorDetail/ActorDetail';
import { MovieDetail } from './pages/MovieDetail/MovieDetail';
import { Movies } from './pages/Movies/Movies';
import { Footer } from './ui/Footer/Footer';
import { Navbar } from './ui/Navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/actor/:id" element={<ActorDetail />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

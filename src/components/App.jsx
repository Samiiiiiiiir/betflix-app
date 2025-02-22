import { Box, Container } from '@mui/material';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';

import { MOVIE_LISTS, TOP_LISTS } from '../constanst';
import { ActorDetail } from './pages/ActorDetail/ActorDetail';
import { MovieDetail } from './pages/MovieDetail/MovieDetail';
import { Movies } from './pages/Movies/Movies';
import MoviesListMain from './pages/MoviesListMain/MoviesListMain';
import MoviesListTop from './pages/MoviesListTop/MoviesListTop';
import { Footer } from './ui/Footer/Footer';
import { Navbar } from './ui/Navbar/Navbar';

function App() {
  return (
    <BrowserRouter>
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ p: 4 }} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/actor/:id" element={<ActorDetail />} />
          {TOP_LISTS.map((item) => {
            return (
              <Route
                key={item.title}
                path={item.url}
                element={<MoviesListTop />}
              />
            );
          })}
          {MOVIE_LISTS.map((item) => {
            return (
              <Route
                key={item.title}
                path={item.url}
                element={<MoviesListMain />}
              />
            );
          })}
        </Routes>
        <Footer />
      </Container>
    </BrowserRouter>
  );
}

export default App;

import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/App';

createRoot(document.getElementById('root')).render(
  <>
    <CssBaseline />
    <App />
  </>,
);

import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './app/store';
import App from './components/App';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>,
);

import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './app/store';
import App from './components/App';
import ToggleColorTheme from './context/ToggleColorTheme';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ToggleColorTheme>
      <CssBaseline />
      <App />
    </ToggleColorTheme>
  </Provider>,
);

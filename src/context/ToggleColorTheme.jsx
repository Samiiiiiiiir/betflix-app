import { createTheme, ThemeProvider } from '@mui/material';
import React, { createContext, useEffect, useState } from 'react';

export const ColorModeContext = createContext();

const ToggleColorTheme = ({ children }) => {
  const [mode, setMode] = useState('dark');

  const theme = createTheme({ palette: { mode } });

  useEffect(() => {
    localStorage.setItem('theme', mode);
  }, [mode]);

  useEffect(() => {
    const themeFromLocalStorage = localStorage.getItem('theme');
    if (themeFromLocalStorage) {
      setMode(themeFromLocalStorage);
    } else {
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  const toggleColorMode = () => {
    setMode((prevState) => (prevState == 'light' ? 'dark' : 'light'));
  };

  return (
    <ColorModeContext.Provider value={{ mode, toggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ToggleColorTheme;

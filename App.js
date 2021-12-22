import React, { useEffect } from 'react';
import Routes from './src/routes';
import { StatusBar } from "react-native"
import { Provider as PaperProvider, DefaultTheme, DarkTheme } from "react-native-paper"
import Providers from './src/providers';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary_700: '#3700b3',
    success: '#04b60c'
  },
}
export default function App() {
  StatusBar.setBackgroundColor(theme.colors.primary_700)
  StatusBar.setBarStyle('light-content')
  return (
    <PaperProvider theme={theme}>
      <Providers>
        <Routes />
      </Providers>
    </PaperProvider>
  );
}

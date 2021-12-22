import React, { useEffect } from 'react';
import Routes from './src/routes';
import { Dimensions, StatusBar } from "react-native"
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper"
import { WastingsProvider } from './src/providers/Wastings'
import FlashMessage from 'react-native-flash-message';
import {  SnackProvider } from './src/providers/SnackBarContext'
import SnackBar from './src/Components/SnackBar';
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
      <WastingsProvider>
        <SnackProvider>
          <Routes />
          <SnackBar />
        </SnackProvider>
      </WastingsProvider>
    </PaperProvider>
  );
}

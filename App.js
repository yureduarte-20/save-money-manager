import React, { useEffect } from 'react';
import Routes from './src/routes';
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper"
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary_700: '#3700b3',
    success:'#04b60c'
  },
}
export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Routes />
    </PaperProvider>
  );
}

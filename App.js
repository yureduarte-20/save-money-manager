import React, { useEffect } from 'react';
import Routes from './src/routes';
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper"
const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    backgroundBarColor: '#3700b3'
  },
}
export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Routes />
    </PaperProvider>
  );
}

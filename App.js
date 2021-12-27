import React, { useEffect } from 'react';
import Routes from './src/routes';
import { StatusBar } from "react-native"
import { Provider as PaperProvider, DefaultTheme, DarkTheme } from "react-native-paper"
import Providers from './src/providers';

export default function App() {
  
  return (
      <Providers>
        <Routes />
      </Providers>
  );
}

import React from 'react';
import Router from "./components/other/Router/Router";
import { SessionHandlerContextProvider } from './components/other/Context/SessionHandlerContext';

export default function App() {
  return (
    <SessionHandlerContextProvider>
      <Router />
    </SessionHandlerContextProvider>
  );
};
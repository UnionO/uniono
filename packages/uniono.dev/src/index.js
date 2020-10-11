import { DIProvider } from '@uniono/react'
import React from 'react';
import ReactDOM from 'react-dom';

import App from './app';

ReactDOM.render(
  <React.StrictMode>
    <DIProvider>
      <App />
    </DIProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
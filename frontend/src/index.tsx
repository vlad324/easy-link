import React from 'react';
import ReactDOM from 'react-dom/client';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import DApp from './components/DApp';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DApp/>
  </React.StrictMode>
);

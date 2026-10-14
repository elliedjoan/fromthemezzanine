import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { Portfolio } from './Portfolio.jsx';
import './styles/theme.css';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {window.location.pathname.replace(/\/$/, '') === '/fromthemezzanine' ? <App /> : <Portfolio />}
  </StrictMode>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App';

import './styles/index.css';

// Import les variables d'environnement
//require('dotenv').config();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
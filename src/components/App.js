import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Container } from '@mui/material';
import * as React from 'react';

import SignUp from './SignUp';
import SignIn from './SignIn';
import Game from './game/Game';
import '../styles/App.css';

function App() {
	// Ajout du snackbar par défaut du composant App
	const defaultMessages = {
		severity: "info",
		message: "Bienvenue sur My Idle Farm !"
	};

	// C'est un state qui va permettre de stocker les informations du snackbar et de l'afficher ou non
	const [snackbar, setSnackbar] = React.useState({
		open: true,
		...defaultMessages
	});

	return (
		<HelmetProvider>
		<Container>
		{renderHelmet()}
		<Router>
		<Routes>
			<Route exact path="/" element={<Game snackbar={snackbar} setSnackbar={setSnackbar}/>}/>
			<Route path="/inscription" element={<SignUp snackbar={snackbar} setSnackbar={setSnackbar}/>}/>
			<Route path="/connexion" element={<SignIn snackbar={snackbar} setSnackbar={setSnackbar}/>}/>
		</Routes>
		</Router>
		</Container>
		</HelmetProvider>
	);
}

function renderHelmet(){
	return (
		<Helmet>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
				/>
		</Helmet>
	)
}

export default App;
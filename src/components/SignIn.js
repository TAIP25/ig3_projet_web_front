import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import theme from './Theme';
import { Navigate } from 'react-router-dom';
import GlobalSnackbar from './GlobalSnackbar';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="http://localhost:3000/">
                My Idle Farm
            </Link>
            {' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignUp({ snackbar, setSnackbar }) {

    React.useEffect(() => {
        setSnackbar({
            open: true,
            severity: "info",
            message: "Veuillez remplir le formulaire pour vous connecter"
        });
    }, [setSnackbar]);

    /*
    React.useEffect(() => {
        if(snackbar.open === false){
            setSnackbar({
                open: true,
                severity: "info",
                message: "Veuillez remplir le formulaire pour vous connecter"
            });
        }
    }, [setSnackbar]);
    */

    // State qui va permettre de savoir si la personne est connectée ou non
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);

    // Fonction qui va permettre de gérer la soumission du formulaire
    const handleSubmit = (event) => {
        // On empêche le comportement par défaut du formulaire
        // Le comportement par défaut du formulaire est de recharger la page à la soumission
        event.preventDefault();

        // On récupère les données du formulaire
        // event est l'événement qui a été déclenché, ici la soumission du formulaire
        // event.currentTarget est l'élément qui a déclenché l'événement, ici le formulaire
        const data = new FormData(event.currentTarget);

        if(data.get('email') === "" || data.get('password') === ""){
            setSnackbar({
                open: true,
                severity: "error",
                message: "Veuillez remplir tous les champs obligatoires"
            });
            return;
        }

        axios.post('http://localhost:7778/auth/signin', {
            email: data.get('email'),
            password: data.get('password'),
        }, { withCredentials: true })
        .then(response => {
            // On ajoute un snackbar pour indiquer à l'utilisateur la réponse du serveur
            setSnackbar({
                open: true, 
                severity: response.data.severity, 
                message: response.data.result
            });
            setIsAuthenticated(true);
        })
        .catch(error => {
            // On ajoute un snackbar pour indiquer à l'utilisateur la réponse du serveur
            setSnackbar({
                open: true, 
                severity: error.response.data.severity, 
                message: error.response.data.result
            });
        });
          
    };

    if(isAuthenticated){
        return <Navigate to="/" />;
    }

    return (
        <ThemeProvider theme={theme}>
        {/* On affiche tous les snackbar de la liste des snackbar */}
        <GlobalSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />


        {/* On utilise le composant Container de Material UI pour gérer le centrage de notre formulaire */}
        {/* component="main" permet de préciser que c'est le composant principal de la page */}
        {/* Le fait de mettre un composant principal permet de gérer la navigation au clavier */}
        {/* maxWidth="xs" permet de préciser que la largeur max de notre formulaire est de 600px */}
        {/* xs veut dire extra small*/}
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ mt: 3, mb: 6 }}>
                Bon retour parmi nous,<br />
                Connectez-vous pour accéder à votre ferme.
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="email"
                    label="Adresse email"
                    autoComplete="email"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="password"
                    label="Mot de passe"
                    type="password"
                    autoComplete="new-password"
                    />
                </Grid>
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color='primary'
                >
                Connexion
                </Button>
                <Grid container>
                <Grid item xs>
                    {/* TODO : Mettre un lien vers la page de récupération de mot de passe */}
                    <Link href="#" variant="body2">
                    Mot de passe oublié ?
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="/inscription" variant="body2">
                    Pas encore de compte ? Inscrivez-vous.
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
        </ThemeProvider>
    );
}
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import SlideTransition from '@mui/material/Slide';
import theme from './Theme';

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

export default function SignUp({ snackbar, setSnackbar, defaultMessages }) {

    // C'est un state qui va permettre d'afficher ou non le champ adminCode
    const [admin, setAdmin] = React.useState(false);

    // Fonction qui va permettre de changer la valeur du state admin
    const handleChangeAdmin = (event) => {
        // On va changer la valeur du state admin en fonction de la valeur de event.target.checked
        // event est l'événement qui a été déclenché, ici le changement de valeur de la checkbox
        // event.target est l'élément qui a déclenché l'événement, ici la checkbox
        // event.target.checked est la valeur de la checkbox, true si elle est cochée, false sinon
        setAdmin(event.target.checked);
    };

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

        if(data.get('email') === "" || data.get('password') === "" || data.get('passwordConfirm') === ""){
            setSnackbar({
                open: true,
                severity: "error",
                message: "Veuillez remplir tous les champs obligatoires"
            });
            return;
        }
        else if(data.get('password') !== data.get('passwordConfirm')){
            setSnackbar({
                open: true,
                severity: "error",
                message: "Les mots de passe ne correspondent pas, veuillez réessayer"
            });
            return;
        }
        else if(data.get('admin') === "true"  && data.get('adminCode') === ""){
            setSnackbar({
                open: true,
                severity: "error",
                message: "Veuillez entrer le code administrateur, sinon décochez la case administrateur"
            });
            return;
        }

        axios.post('http://localhost:7778/auth/signup', {
            email: data.get('email'),
            password: data.get('password'),
            adminCode: data.get('adminCode') ? data.get('adminCode') : ""
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

    /*
    if(isAuthenticated){
        return redirect('/');
    }
    */
   
    return (
        /* On enveloppe notre formulaire dans le ThemeProvider*/
        <ThemeProvider theme={theme}>
    
        {/* On affiche tous les snackbar de la liste des snackbar */}
        
        { snackbar.open && 
        <Snackbar
            open={true}
            autoHideDuration={6000}
            severity={snackbar.severity}
            message={snackbar.message}
            onClose={() => setSnackbar({...snackbar, open: false})}
            TransitionComponent={SlideTransition}
        >
            <Alert severity={snackbar.severity} onClose={() => setSnackbar({...snackbar, open: false})}>
                {snackbar.message}
            </Alert>
        </Snackbar>
        }


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
            <Typography component="h1" variant="h5">
                Inscription
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
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    name="passwordConfirm"
                    label="Confirmer le mot de passe"
                    type="password" 
                    autoComplete="new-password"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControlLabel
                    control={<Checkbox value={true} />}
                    name='admin'
                    label="Je suis un administrateur"
                    onChange={handleChangeAdmin}
                    />
                </Grid>
                { admin &&
                    <Grid item xs={12} sm={6}>
                    <TextField
                    required
                    fullWidth
                    name="adminCode"
                    label="Code administrateur" 
                    type='password'
                    autoComplete='new-password'
                    />
                    </Grid>
                }
                </Grid>
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                color='primary'
                >
                Inscription
                </Button>
                <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href="/connexion" variant="body2">
                    Vous avez déjà un compte ? Connectez-vous
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
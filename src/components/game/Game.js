import React from 'react';

import { Box, Grid } from '@mui/material';
import { Container, CssBaseline, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import GlobalSnackbar from '../GlobalSnackbar';
import Plot from './Plot';
import theme from '../Theme';
import StorageBar from './StorageBar';
import PurchaseButtons from './PurchaseButtons';
import DisplayCurrency from './DisplayCurrency';

import logo from '../../assets/radis.png';
// imortation du style Image.css
import '../../styles/Image.css'
import axios from 'axios';

// onPurchase() fait un effet bizarre, il fait apparaitre le snackbar 1 fois sur 2
// Il faut donc le mettre dans un useEffect pour qu'il ne soit appelé qu'une seule fois
// useEffect(() => {
//     onPurchase({setSnackbar});
// }, []);
//


export default function Game({snackbar, setSnackbar}){
    // Création d'un state pour afficher des informations sur le jeu lorsque on passe la souris sur un élément particulier
    const [gameInfo, setGameInfo] = React.useState({
        message: "Passer la souris sur un le radis pour commencer à jouer !",
    });

    // Création d'un state pour stocker quel multiple de radis on a achete
    const [turnipMultiple, setTurnipMultiple] = React.useState(1);

    // Création d'un state pour l'argent du joueur
    const [money, setMoney] = React.useState(0);

    // Création d'un state pour le token du joueur
    const [token, setToken] = React.useState(0);

    // Création d'un state pour le stockage du joueur
    const [storage, setStorage] = React.useState(0);

    // Création d'un localstorage pour stocker les informations des cultures
    const cropsData = JSON.parse(localStorage.getItem('cropsData'));

    // Création d'un localstorage pour stocker les informations des cultures des joueurs
    //let userCropsData = JSON.parse(localStorage.getItem('userCropsData'));

    const click = (tierActualCrop, amountActualCrop) => {
        const bodyJson = (tierActualCrop === undefined && amountActualCrop === undefined) ? {
            "tier": 0,
            "amount": turnipMultiple
        } : {
            "tier": tierActualCrop,
            "amount": amountActualCrop
        };
        axios.post('http://localhost:7778/userGame/upgrade', bodyJson, { withCredentials: true })
        .then((response) => {
            setSnackbar(prevState => ({
                ...prevState,
                open: true,
                severity: response.data.severity,
                message: response.data.result,
            }));
            setMoney(response.data.money);
            setToken(response.data.token);
            setStorage(response.data.amountCrop);
            const crops = response.data.crops;
            let userCropsData = JSON.parse(localStorage.getItem('userCropsData'));
            if(!userCropsData){
                userCropsData = {};
            }
            crops.forEach(crop => {
                const { cropTier, cropPNGName, userCropQuantity } = crop;
                userCropsData[parseInt(cropTier)] = { cropPNGName, cropTier, userCropQuantity };
            })
            for(let i = 1; i < 21; i++){
                if(!userCropsData[i]){
                    userCropsData[i] = { cropPNGName: 'empty', cropTier: i, userCropQuantity: 0 };
                }
            }
            localStorage.setItem('userCropsData', JSON.stringify(userCropsData));
        });
    }

    // Création d'un state pour le stockage du joueur lorsqu'il arrive sur la page
    React.useEffect(() => {
        axios.get('http://localhost:7778/crop', { withCredentials: true })
        .then((response) => {
            localStorage.setItem('cropsData', JSON.stringify(response.data.crops));
        });

        axios.put('http://localhost:7778/userGame/', null, { withCredentials: true })
        .then((response) => {
            setSnackbar(prevState => ({
                ...prevState,
                open: true,
                severity: response.data.severity,
                message: response.data.result,
            }));
            setMoney(response.data.money);
            setToken(response.data.token);
            setStorage(response.data.amountCrop);
        })
        .catch((error) => {
            if(error.response.status === 401){
                setSnackbar(prevState => ({
                    ...prevState,
                    open: true,
                    severity: 'error',
                    message: 'Vous n\'êtes pas connecté !',
                }));
                // Redirection vers la page de connexion
                window.location.href = '/connexion';
            }
        });
    }, [setSnackbar]);

    // Création d'un intervalle pour mettre à jour le stockage du joueur toutes les 6 secondes
    React.useEffect(() => {
        const interval = setInterval(() => {
            axios.put('http://localhost:7778/userGame/', null, { withCredentials: true })
            .then((response) => {
                setSnackbar(prevState => ({
                    ...prevState,
                    open: true,
                    severity: response.data.severity,
                    message: response.data.result,
                }));
                setMoney(response.data.money);
                setToken(response.data.token);
                setStorage(response.data.amountCrop);
            })
            .catch((error) => {
                if(error.response.status === 401){
                    setSnackbar(prevState => ({
                        ...prevState,
                        open: true,
                        severity: 'error',
                        message: 'Vous n\'êtes pas connecté !',
                    }));
                    // Redirection vers la page de connexion
                    setTimeout(() => {
                        window.location.href = '/connexion';
                    }, 2000);
                }
            });
        }, 6000);
        
        return () => {
            clearInterval(interval); // Nettoyage de l'intervalle lors du démontage du composant
        };
    }, [setSnackbar]);

    return (
        <ThemeProvider theme={theme}>   
        <Grid container>
            <Container>
            <CssBaseline />
            <GlobalSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <Box 
                    onMouseEnter={() => setGameInfo({message: `Money: ${cropsData[0].cropMoneyPrice}, Token: ${cropsData[0].cropTokenPrice}`})} 
                    onMouseLeave={() => setGameInfo({})}
                    onClick={() => click()}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                <img src={logo} alt='radis' width='64' height='64' />
                </Box>
                <Typography component="h1" variant="h5">
                    Clicker <br />
                    Turnip
                </Typography>
                < DisplayCurrency money={money} token={token} />
                <PurchaseButtons turnipMultiple={turnipMultiple} setTurnipMultiple={setTurnipMultiple} />
            </Box>
                <Typography component="h1" variant="h5" sx={{
                    visibility: `${gameInfo.message ? "visible" : "hidden"}`,
                    pointerEvents: 'none',
                }}>
                    {gameInfo.message ? gameInfo.message : "invisible message"}
                </Typography>
            <StorageBar nbCrops={storage} />
            <Box align='right' sx={{ 
                marginTop: 10,
            }}>
                <Plot 
                    setGameInfo={setGameInfo} 
                    setSnackbar={setSnackbar}
                    setMoney={setMoney}
                    setToken={setToken}
                    setStorage={setStorage}
                    click={click}

                />
            </Box>
            </Container>
        </Grid>
        </ThemeProvider>
    );
}
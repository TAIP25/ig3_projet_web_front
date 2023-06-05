import React from 'react';

import { Box, Grid, Button } from '@mui/material';
import { Container, CssBaseline, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import GlobalSnackbar from '../GlobalSnackbar';
import Plot from './Plot';
import theme from '../Theme';
import StorageBar from './StorageBar';
import PurchaseButtons from './PurchaseButtons';
import DisplayCurrency from './DisplayCurrency';
import InfoBuy from './InfoBuy';
import CropInfo from './CropInfo';

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
        message: "welcome",
    });

    // Création d'un state pour stocker quel multiple de radis on a achete
    const [turnipMultiple, setTurnipMultiple] = React.useState(1);

    // Création d'un state pour l'argent du joueur
    const [money, setMoney] = React.useState(0);

    // Création d'un state pour le token du joueur
    const [token, setToken] = React.useState(0);

    // Création d'un state pour le stockage du joueur
    const [storage, setStorage] = React.useState(0);

    // Création d'un state pour l'argent gagné par 6 secondes
    const [moneyPerSecond, setMoneyPerSecond] = React.useState(0);

    // Création d'un state pour les tokens gagnés par 6 secondes
    const [tokenPerSecond, setTokenPerSecond] = React.useState(0);

    // Création d'un state pour la barre de progression
    const [progressBar, setProgressBar] = React.useState(0);

    // Création d'un localstorage pour stocker les informations des cultures
    const cropsData = JSON.parse(localStorage.getItem('cropsData'));

    // Création d'un localstorage pour stocker les informations des cultures des joueurs
    //let userCropsData = JSON.parse(localStorage.getItem('userCropsData'));

    function getCookieValue(name) {
        const cookies = document.cookie.split(';');
        console.log(cookies);
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }

    function getCropAndNextCrop(cropPNGName){
        if(cropsData){
            let currentCrop = cropsData.find(crop => crop.cropPNGName === cropPNGName);
            if(currentCrop){
                if(currentCrop.cropPNGName !== 'turnip'){
                    let previousCrop = cropsData.find(crop => crop.cropTier === currentCrop.cropTier - 1);
                    if(previousCrop){
                        return [previousCrop, currentCrop];
                    }
                }
                else if(currentCrop.cropPNGName === 'turnip'){
                    return [currentCrop, undefined];
                }
            }
        }
        return [undefined, undefined];
    }

    const click = (tierActualCrop, amountActualCrop) => {
        const bodyJson = (tierActualCrop === undefined && amountActualCrop === undefined) ? {
            "tier": 0,
            "amount": turnipMultiple
        } : {
            "tier": tierActualCrop,
            "amount": amountActualCrop
        };
        axios.post(`${process.env.REACT_APP_API_URL}/userGame/upgrade`, bodyJson, { withCredentials: true })
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
        })
    }

    const disconnect = () => {
        localStorage.clear();
        document.cookie = "isAdmin=; path=/; max-age=-1";
        // Redirection vers la page de connexion
        window.location.href = '/connexion';
    }

    // Création d'un state pour le stockage du joueur lorsqu'il arrive sur la page
    React.useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/crop`.toString(), { withCredentials: true })
        .then((response) => {
            localStorage.setItem('cropsData', JSON.stringify(response.data.crops));
        });

        axios.put(`${process.env.REACT_APP_API_URL}/userGame/`, null, { withCredentials: true })
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

    // Création d'un intervalle pour mettre à jour le stockage du joueur toutes les secondes 
    // Puis toutes les 6 secondes demande au serveur de mettre à jour le stockage du joueur
    React.useEffect(() => {
        const interval = setInterval(() => {
            if(progressBar >= 100){
                setProgressBar(0);
                axios.put(`${process.env.REACT_APP_API_URL}/userGame/`, null, { withCredentials: true })
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
                    setMoneyPerSecond(response.data.moneyEarnedPerTick);
                    setTokenPerSecond(response.data.tokenEarnedPerTick);
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
            }
            else{
                setProgressBar(progressBar + (100 / 3));
            }
        }, 1500);
        
        return () => {
            clearInterval(interval);
        }
    }, [progressBar, setSnackbar]);

    console.log(getCookieValue('isAdmin'))
    console.log(getCookieValue('authcookie'))

    return (
        <ThemeProvider theme={theme}>   
        <Grid container>
            <Container>
            <CssBaseline />
            <GlobalSnackbar snackbar={snackbar} setSnackbar={setSnackbar} />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
            {/* Ajoute un bouton panel dans le cas ou l'utilisateur est admin */}
            {getCookieValue('isAdmin') === "true" && <Button variant='outlined' size='small' color='warning' sx={{ ml:'auto', mt:'25px' }} onClick={() => window.location.href = '/panel'}>Panel</Button>}
            <Button variant='outlined' size='small' color='error' sx={{ ml:'auto', mt:'25px' }} onClick={() => disconnect()}>Déconnexion</Button>
            </Box>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center'
                }}
            >
                <Box 
                    onMouseEnter={() => {
                        const newGameInfo = {
                            message: "buy",
                            money: cropsData[0].cropMoneyPrice*turnipMultiple,
                            token: cropsData[0].cropTokenPrice*turnipMultiple,
                            equality: turnipMultiple,
                            crop: cropsData[0].cropPNGName,
                        };
                        setGameInfo(newGameInfo);
                    }}
                    onMouseLeave={() => { 
                        const newGameInfo = {};
                        setGameInfo(newGameInfo);
                    }}
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
                <DisplayCurrency money={money} token={token} moneyPerSecond={moneyPerSecond} tokenPerSecond={tokenPerSecond} />
                <PurchaseButtons turnipMultiple={turnipMultiple} setTurnipMultiple={setTurnipMultiple} />    
            </Box>
                <Box sx={{ marginTop: 1, marginBottom: 1}}>
                <InfoBuy gameInfo={gameInfo} />
                </Box>
            <StorageBar nbCrops={storage} progressBar={progressBar} />
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
            <CropInfo currentCrop={getCropAndNextCrop(gameInfo.crop)[0]} nextCrop={getCropAndNextCrop(gameInfo.crop)[1]} />
            </Container>
        </Grid>
        </ThemeProvider>
    );
}
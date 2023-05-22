import React from 'react';

import { Box, Grid } from '@mui/material';
import { Container, CssBaseline, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import GlobalSnackbar from '../GlobalSnackbar';
import Plot from './Plot';
import theme from '../Theme';
import StorageBar from './StorageBar';
import { cropsList } from '../../data/CropsList';
import PurchaseButtons from './PurchaseButtons';
import DisplayCurrency from './DisplayCurrency';

import logo from '../../assets/radis.png';
// imortation du style Image.css
import '../../styles/Image.css'

function onPurchase(snackbar, setSnackbar, qty) {
    const turnipCrop = cropsList.find(crop => crop.imgName === 'turnip');

    if (turnipCrop) {
        console.log(turnipCrop.qty);
        turnipCrop.qty += qty;
    } else {
        cropsList.push({ name: 'Naver', imgName: 'turnip', qty: qty });
    }

    if(snackbar.open === false){
        setSnackbar(prevState => ({
            ...prevState,
            open: true,
            severity: 'success',
            message: 'Vous avez acheté un radis !',
        }));
    }
}

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
    const [money, setMoney] = React.useState(100);
    
    // Création d'un state pour le stockage du joueur
    React.useEffect(() => {
        const interval = setInterval(() => {
          setMoney((prevMoney) => prevMoney + 100); // Augmentation de l'argent
        }, 2000); // Délai de 10 secondes (10000 millisecondes)
      
        return () => {
          clearInterval(interval); // Nettoyage de l'intervalle lors du démontage du composant
        };
      }, []);

    const coutDuRadis = 10;
    const token = 100;

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
                    onMouseEnter={() => setGameInfo({message: `Cout: ${coutDuRadis}`})} 
                    onMouseLeave={() => setGameInfo({})}
                    onClick={() => onPurchase(snackbar, setSnackbar, turnipMultiple)}
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
            <StorageBar nbCrops={0.001} />
            <Box align='right' sx={{ 
                marginTop: 10,
            }}>
                <Plot gameInfo={gameInfo} setGameInfo={setGameInfo} />
            </Box>
            </Container>
        </Grid>
        </ThemeProvider>
    );
}
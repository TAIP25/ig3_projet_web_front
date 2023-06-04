import { Typography, Grid, Box } from "@mui/material";
import EuroIcon from '@mui/icons-material/Euro';
import { green, yellow } from '@mui/material/colors';
import InfoIcon from '@mui/icons-material/Info';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

import formatNumber from '../../utils/NumberTranslate';

export default function InfoBuy({gameInfo}){
    return (
        <Typography component="h1" variant="h5" sx={{
            visibility: `${gameInfo.message ? "visible" : "hidden"}`,
            pointerEvents: 'none',
        }}> 
            {gameInfo.message ?
                <div></div>
            :
                <Grid item sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                {/* Ici on affiche un message invisible si on a pas de message à afficher, pour éviter que le texte ne bouge */}
                <InfoIcon color='info' sx={{ fontSize: 30 }} />
                <Typography component="h1" variant="h5" sx={{color: '#4b5975'}}>
                    é
                </Typography>
                </Grid>
            }
            
            {gameInfo.message === 'buy' ?
                <Grid item sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <InfoIcon color='info' sx={{ fontSize: 30 }} />
                <Box sx={{ marginLeft: 1 }}>
                    <Typography component="h1" variant="h5" sx={{color: '#4b5975'}}>
                        Achat (
                    </Typography>
                </Box>
                <Typography component="h1" variant="h5">
                    x{gameInfo.equality}
                </Typography>
                <Box sx={{ marginRight: 1 }}>
                    <Typography component="h1" variant="h5" sx={{color: '#4b5975'}}>
                        ):
                    </Typography>
                </Box>
                <Typography component="h1" variant="h5" sx={{color: green[500]}}>
                    {formatNumber(gameInfo.money)}
                </Typography>
                <EuroIcon sx={{ fontSize: 30, color: green[500] }} />
                <Box sx={{ marginRight: 1, marginLeft: 1 }}>
                <Typography component="h1" variant="h5" sx={{color: '#4b5975'}}>
                    et
                </Typography>
                </Box>
                <Typography component="h1" variant="h5" sx={{color: yellow[500]}}>
                    {formatNumber(gameInfo.token)}
                </Typography>
                <MonetizationOnIcon sx={{ fontSize: 30, color: yellow[500] }} />
                </Grid>
            :
                <div></div>
            }

            {gameInfo.message === 'upgrade' ?
                <Grid item sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <InfoIcon color='info' sx={{ fontSize: 30 }} />
                <Box sx={{ marginLeft: 1 }}>
                    <Typography component="h1" variant="h5" sx={{color: '#4b5975'}}>
                        Achat (
                    </Typography>
                </Box>
                <Typography component="h1" variant="h5">
                    x{gameInfo.equality}
                </Typography>
                <Box sx={{ marginRight: 1 }}>
                    <Typography component="h1" variant="h5" sx={{color: '#4b5975'}}>
                        ):
                    </Typography>
                </Box>
                <Typography component="h1" variant="h5" sx={{color: green[500]}}>
                    {formatNumber(gameInfo.money)}
                </Typography>
                <EuroIcon sx={{ fontSize: 30, color: green[500] }} />
                <Box sx={{ marginRight: 1, marginLeft: 1 }}>
                <Typography component="h1" variant="h5" sx={{color: '#4b5975'}}>
                    et
                </Typography>
                </Box>
                <Typography component="h1" variant="h5" sx={{color: yellow[500]}}>
                    {formatNumber(gameInfo.token)}
                </Typography>
                <MonetizationOnIcon sx={{ fontSize: 30, color: yellow[500] }} />
                </Grid>
            :
                <div></div>
            }

            {gameInfo.message === 'welcome' ?
                <Grid item sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <InfoIcon color='info' sx={{ fontSize: 30 }} />
                <Box sx={{ marginRight: 1, marginLeft: 1 }}>
                <Typography component="h1" variant="h5" sx={{color: '#4b5975'}}>
                    Passer la souris sur un le radis pour commencer à jouer !
                </Typography>
                </Box>
                </Grid>
            :
                <div></div>
            }

        </Typography>
    );
};
import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EuroIcon from '@mui/icons-material/Euro';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { green, yellow } from '@mui/material/colors';

import formatNumber from '../../utils/NumberTranslate';

export default function CropInfo({ currentCrop, nextCrop }) {
    return (
        <Grid container alignItems="center" justifyContent="center" sx={{ marginTop: 5 }}>
        { currentCrop &&
            <Grid item xs={12} sm={5}>
            <Box sx={{ border: '1px solid black', padding: 2 }}>
                <img
                    height={64}
                    width={64}
                    src={require(`../../assets/uniqueCrops/${currentCrop.cropPNGName}1.png`)}
                    alt={currentCrop.cropName}
                />
                <Grid item sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                }}> 
                    <Box sx={{ marginRight: 1}}>
                    <Typography component="h1" variant="h5" sx={{color: '#4b5975'}}>Nom: </Typography>
                    </Box>
                    <Typography component="h1" variant="h5" >{currentCrop.cropName}</Typography>
                </Grid>
                <Grid item sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                }}> 
                    <Box sx={{ marginRight: 1}}>
                        <Typography component="h1" variant="h5" sx={{color: '#4b5975'}}>Prix: </Typography>
                    </Box>
                    <Typography component="h1" variant="h5" sx={{color: green[500]}}>
                        {formatNumber(parseInt(currentCrop.cropMoneyPrice))}
                    </Typography>
                    <EuroIcon sx={{ fontSize: 30, color: green[500] }} />
                    <Box sx={{ marginLeft: 1 }}>
                        <Typography component="h1" variant="h5" sx={{color: '#4b5975'}}>
                            et
                        </Typography>
                    </Box>
                    </Grid>
            <Grid item sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
            }}>
                    <Typography component="h1" variant="h5" sx={{color: yellow[500]}}>
                        {formatNumber(parseInt(currentCrop.cropTokenPrice))}
                    </Typography>
                    <MonetizationOnIcon sx={{ fontSize: 30, color: yellow[500] }} />
                </Grid>
                <Grid item sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                }}> 
                    <Box sx={{ marginRight: 1}}>
                        <Typography component="h1" variant="h5" sx={{color: '#4b5975'}}>Gain: </Typography>
                    </Box>
                    </Grid>
            <Grid item sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
            }}>
                    <Typography component="h1" variant="h5" sx={{color: green[500]}}>
                        {formatNumber(parseInt(currentCrop.cropMoneyEarning))}
                    </Typography>
                    <EuroIcon sx={{ fontSize: 30, color: green[500] }} />
                    <Box sx={{ marginRight: 1, marginLeft: 1 }}>
                        <Typography component="h1" variant="h5" sx={{color: '#4b5975'}}>
                            /
                        </Typography>
                    </Box>
                    <Typography component="h1" variant="h5">
                        6 sec
                    </Typography>
                    <Box sx={{ marginLeft: 1 }}>
                        <Typography component="h1" variant="h5" sx={{color: '#4b5975'}}>
                            et
                        </Typography>
                    </Box>
                </Grid>
                <Grid item sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                }}> 
                    <Typography component="h1" variant="h5" sx={{color: yellow[500]}}>
                        1
                    </Typography>
                    <MonetizationOnIcon sx={{ fontSize: 30, color: yellow[500] }} />
                    <Box sx={{ marginRight: 1, marginLeft: 1 }}>
                    <Typography component="h1" variant="h5" sx={{color: '#4b5975'}}>
                        /  
                    </Typography>
                    </Box>
                    <Typography component="h1" variant="h5">
                        {currentCrop.cropAmountEarningOneToken} cultures
                    </Typography>
                </Grid>
                <Grid item sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                }}>
                    <Typography component="h1" variant="h5" sx={{color: '#4b5975'}}>Tier: </Typography>
                    <Box sx={{ marginLeft: 1}}>
                        <Typography component="h1" variant="h5"> {currentCrop.cropTier} </Typography>
                    </Box>
                </Grid>
            </Box>
            </Grid>
        }
        { nextCrop &&
            <Grid item>
            <ArrowForwardIcon color='info' sx={{ fontSize: 50 }} />
            </Grid>
        } 
        { nextCrop &&
        <Grid item xs={12} sm={5}>
        <Box sx={{ border: '1px solid black', padding: 2 }}>
            <img
                height={64}
                width={64}
                src={require(`../../assets/uniqueCrops/${nextCrop.cropPNGName}1.png`)}
                alt={nextCrop.cropName}
            />
            <Grid item sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
            }}> 
                <Box sx={{ marginRight: 1}}>
                <Typography component="h1" variant="h5" sx={{color: '#4b5975'}}>Nom: </Typography>
                </Box>
                <Typography component="h1" variant="h5" >{nextCrop.cropName}</Typography>
            </Grid>
            <Grid item sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
            }}> 
                <Box sx={{ marginRight: 1}}>
                    <Typography component="h1" variant="h5" sx={{color: '#4b5975'}}>Prix: </Typography>
                </Box>
                <Typography component="h1" variant="h5" sx={{color: green[500]}}>
                    {formatNumber(parseInt(nextCrop.cropMoneyPrice))}
                </Typography>
                <EuroIcon sx={{ fontSize: 30, color: green[500] }} />
                <Box sx={{ marginLeft: 1 }}>
                    <Typography component="h1" variant="h5" sx={{color: '#4b5975'}}>
                        et
                    </Typography>
                </Box>
                </Grid>
                <Grid item sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                }}> 
                <Typography component="h1" variant="h5" sx={{color: yellow[500]}}>
                    {formatNumber(parseInt(nextCrop.cropTokenPrice))}
                </Typography>
                <MonetizationOnIcon sx={{ fontSize: 30, color: yellow[500] }} />
            </Grid>
            <Grid item sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
            }}> 
                <Box sx={{ marginRight: 1}}>
                    <Typography component="h1" variant="h5" sx={{color: '#4b5975'}}>Gain: </Typography>
                </Box>
                </Grid>
                <Grid item sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                }}> 
                <Typography component="h1" variant="h5" sx={{color: green[500]}}>
                    {formatNumber(parseInt(nextCrop.cropMoneyEarning))}
                </Typography>
                <EuroIcon sx={{ fontSize: 30, color: green[500] }} />
                <Box sx={{ marginRight: 1, marginLeft: 1 }}>
                    <Typography component="h1" variant="h5" sx={{color: '#4b5975'}}>
                        /
                    </Typography>
                </Box>
                <Typography component="h1" variant="h5">
                    6 sec
                </Typography>
                <Box sx={{ marginLeft: 1 }}>
                    <Typography component="h1" variant="h5" sx={{color: '#4b5975'}}>
                        et
                    </Typography>
                </Box>
            </Grid>
            <Grid item sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <Typography component="h1" variant="h5" sx={{color: yellow[500]}}>
                    1
                </Typography>
                <MonetizationOnIcon sx={{ fontSize: 30, color: yellow[500] }} />
                <Box sx={{ marginRight: 1, marginLeft: 1 }}>
                <Typography component="h1" variant="h5" sx={{color: '#4b5975'}}>
                    /  
                </Typography>
                </Box>
                <Typography component="h1" variant="h5">
                    {nextCrop.cropAmountEarningOneToken} cultures
                </Typography>
            </Grid>
            <Grid item sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
            }}>
                <Typography component="h1" variant="h5" sx={{color: '#4b5975'}}>Tier: </Typography>
                <Box sx={{ marginLeft: 1}}>
                    <Typography component="h1" variant="h5"> {nextCrop.cropTier} </Typography>
                </Box>
            </Grid>
        </Box>
        </Grid>
        }
        </Grid>
    );
};
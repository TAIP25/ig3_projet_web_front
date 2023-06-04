import { Grid, Typography, Box } from '@mui/material';
import EuroIcon from '@mui/icons-material/Euro';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { green, yellow } from '@mui/material/colors';

import formatNumber from '../../utils/NumberTranslate';

export default function DisplayCurrency({money, token, moneyPerSecond, tokenPerSecond}) {
    return (
        <Grid container justifyContent='center' spacing={1} sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Grid item sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}>
            <Typography component="h1" variant="h5" sx={{color: green[500]}}>
                {formatNumber(money)}
            </Typography>
            <EuroIcon sx={{ fontSize: 30, color: green[500] }} />
            <Box sx={{ marginLeft: 1 }}>
            <Typography component="h1" variant="h5" sx={{color: '#4b5975'}}>
                (+{formatNumber(moneyPerSecond/6)}/sec)
            </Typography>
            </Box>
            </Grid>
            <Grid item sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}>
            <Typography component="h1" variant="h5" sx={{color: yellow[500]}}>
                {formatNumber(token)}
            </Typography>
            <MonetizationOnIcon sx={{ fontSize: 30, color: yellow[500] }} />
            <Box sx={{ marginLeft: 1 }}>
            <Typography component="h1" variant="h5" sx={{color: '#4b5975'}}>
                (+{formatNumber(tokenPerSecond/6)}/sec)
            </Typography>
            </Box>
            </Grid>
        </Grid>
    );
}
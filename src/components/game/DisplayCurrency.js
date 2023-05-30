import { Grid, Typography } from '@mui/material';
import EuroIcon from '@mui/icons-material/Euro';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';


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
            <Typography component="h1" variant="h5">
                {money}(+{moneyPerSecond}/6s)
            </Typography>
            <EuroIcon sx={{ fontSize: 30 }} />
            </Grid>
            <Grid item sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}>
            <Typography component="h1" variant="h5">
                {token}(+{tokenPerSecond}/6s)
            </Typography>
            <MonetizationOnIcon sx={{ fontSize: 30 }} color='green' />
            </Grid>
        </Grid>
    );
}
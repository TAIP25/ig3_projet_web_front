import { ThemeProvider } from '@mui/material/styles'
import { Typography } from '@mui/material'
import { CssBaseline } from '@mui/material'
import { Box } from '@mui/system'

import logo from '../assets/radis.png'
import GlobalSnackbar from './GlobalSnackbar'
import theme from './Theme'
import StorageBar from './StorageBar'

// imortation du style Image.css
import '../styles/Image.css'

function Banner({ snackbar, setSnackbar }){
    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <GlobalSnackbar snackbar={snackbar} setSnackbar={setSnackbar}/>
            <img src={logo} alt='radis' width='160' max-height='160' />
            <Typography component="h1" variant="h5" sx={{ mt: 3, mb: 6 }}>
                My Idle Game App
            </Typography>
            <StorageBar />
        </Box>
        </ThemeProvider>
    )
}

export default Banner
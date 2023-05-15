import { createTheme } from '@mui/material/styles';
import { blueGrey, deepPurple, red } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        type: 'dark',
        primary: {
            main: blueGrey[500],
        },
        secondary: {
            main: deepPurple[500],
        },
        background: {
            default: '#0a1929',
            paper: '#424242',
        },
        text: {
            primary: '#ffffff',
            secondary: '#bdbdbd',
        },
    },
    typography: {
        fontFamily: 'Roboto',
    },
    components: {
        MuiGrid: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        borderColor: red[500],
                    },
                    '&:active': {
                        borderColor: red[500],
                    },
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderColor: deepPurple[500],
                        },
                        '&:hover fieldset': {
                            borderColor: blueGrey[500],
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: red[500],
                        },
                    },
                },
            },
        },
    },
});

export default theme;
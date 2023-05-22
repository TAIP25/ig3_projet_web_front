import { createTheme } from '@mui/material/styles';
import { blueGrey, deepPurple, red } from '@mui/material/colors';

// TODO bien mettre en place le theme qui provient de devTheme.css

const theme = createTheme({
    palette: {
        type: 'dev theme',
        primary: {
            main: '#23a9d5',
        },
        secondary: {
            main: '#4b5975',
        },
        background: {
            default: '#1b2028'
        },
        text: {
            primary: '#ccccb5',
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
        MuiLinearProgress: {
            height: 10,
            borderRadius: 5,
        },
    },
});

export default theme;
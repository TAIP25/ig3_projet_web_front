import { createTheme } from '@mui/material/styles';
import { blueGrey, deepPurple, red } from '@mui/material/colors';

// TODO bien mettre en place le theme qui provient de devTheme.css

const theme = createTheme({
    palette: {
        type: 'dev theme',
        primary: {
            main: '#2Ea9d5',
        },
        secondary: {
            main: '#4b5975',
        },
        background: {
            default: '#1b2028',
        },
        text: {
            primary: '#ccccb5',
            secondary: '#bdbdbd',
        },
        bouton: {
            primary: '#23a9d5',
            error: '#b81b2c',
            extraerror: '#84131f',
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
        MuiButton: {
            variants: [
              {
                props: { variant: 'theme1' },
                style: {
                  backgroundColor: '#ff0000', // Couleur du thème 1
                  // Autres styles spécifiques au thème 1
                },
              },
              {
                props: { variant: 'theme2' },
                style: {
                  backgroundColor: '#00ff00', // Couleur du thème 2
                  // Autres styles spécifiques au thème 2
                },
              },
            ],
        },
    },
});

/*
:root {
    --bg-color: #1b2028;
    --main-color: #23a9d5;
    --caret-color: #4b5975;
    --sub-color: #4b5975;
    --sub-alt-color: #151a21;
    --text-color: #ccccb5;
    --error-color: #b81b2c;
    --error-extra-color: #84131f;
    --colorful-error-color: #b81b2c;
    --colorful-error-extra-color: #84131f;
}
*/

export default theme;
import { createTheme } from '@mui/material'
import { blue, cyan, green } from '@mui/material/colors';

export const LihtTheme = createTheme({
    palette:{
        primary: {
            main: green[400],
            dark: green[500],
            light: green[800],
            contrastText: '#f7f6f3',
        },
        secondary: {
            main: blue[800],
            dark: blue[900],
            light: blue[50],
            contrastText: '#f7f6f3',
        },
        background:{
            default: '#f7f6f3',
            paper:'#f7f6f3',
        }
    }
});
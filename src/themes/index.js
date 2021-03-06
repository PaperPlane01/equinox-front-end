import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

const pink = createMuiTheme({
    palette: {
        primary: {
            main: '#d81b60',
        },
        secondary: {
            main: '#9c27b0',
        },
    },
});

const yellow = createMuiTheme({
    "palette":{
        "common":{
            "black":"#000",
            "white":"#fff"
        },
        "background": {
            "paper":"#fff","default":"#fafafa"
        },
        "primary":{
            "light":"rgba(255, 242, 99, 1)",
            "main":"rgba(251, 192, 45, 1)",
            "dark":"rgba(196, 144, 0, 1)",
            "contrastText":"rgba(0, 0, 0, 1)"
        },
        "secondary": {
            "light":"rgba(249, 104, 58, 1)",
            "main":"rgba(191, 54, 12, 1)",
            "dark":"rgba(135, 0, 0, 1)",
            "contrastText":"#fff"
        },
        "error":{
            "light":"#e57373",
            "main":"#f44336",
            "dark":"#d32f2f",
            "contrastText":"#fff"
        },
        "text":{
            "primary":"rgba(0, 0, 0, 0.87)",
            "secondary":"rgba(0, 0, 0, 0.54)",
            "disabled":"rgba(0, 0, 0, 0.38)",
            "hint":"rgba(0, 0, 0, 0.38)"
        }
    }
});

const green = createMuiTheme({
    "palette": {
        "common": {
            "black": "#000",
            "white": "#fff"
        },
        "background": {
            "paper": "#fff",
            "default": "#fafafa"
        },
        "primary": {
            "light": "rgba(79, 179, 191, 1)",
            "main": "rgba(0, 131, 143, 1)",
            "dark": "rgba(0, 86, 98, 1)",
            "contrastText": "#fff"
        },
        "secondary": {
            "light": "rgba(94, 146, 243, 1)",
            "main": "rgba(21, 101, 192, 1)",
            "dark": "rgba(0, 60, 143, 1)",
            "contrastText": "#fff"
        },
        "error": {
            "light": "#e57373",
            "main": "#f44336",
            "dark": "#d32f2f",
            "contrastText": "#fff"
        },
        "text": {
            "primary": "rgba(0, 0, 0, 0.87)",
            "secondary": "rgba(0, 0, 0, 0.54)",
            "disabled": "rgba(0, 0, 0, 0.38)",
            "hint": "rgba(0, 0, 0, 0.38)"
        }
    }
});

export default {
    green,
    pink,
    yellow
}
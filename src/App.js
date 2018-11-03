import React, {Component} from 'react';
import {createMuiTheme, MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import {MobxRouter} from 'mobx-router';
import DateFnsUtils from 'material-ui-pickers/utils/date-fns-utils';
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';
import {inject, observer} from 'mobx-react';
import {Helmet} from 'react-helmet';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#d81b60',
        },
        secondary: {
            main: '#9c27b0',
        },
    },
});

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

const muiPickersLocaleMap = {
    ru: ruLocale,
    en: enLocale
};

@inject('authStore')
@inject('localeStore')
@observer
class App extends Component {
    componentDidMount() {
        const {authStore} = this.props;
        const {loggedIn, currentUser} = authStore;

        if (loggedIn && !currentUser) {
            authStore.fetchCurrentUser();
        }
    }

    render() {
        const {localeStore} = this.props;
        const pickersLocale = muiPickersLocaleMap[localeStore.currentLocale] || enLocale;

        return <div style={{
            flexGrow: 1
        }}>
            <Helmet>
                <meta name="theme-color" content={theme.palette.primary.main}/>
            </Helmet>
            <MuiThemeProvider theme={theme}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={pickersLocale}>
                    <MobxRouter/>
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        </div>
    }
}

export default withStyles(styles)(App);
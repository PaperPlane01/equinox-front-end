import React, {Component} from 'react';
import {MuiThemeProvider, withStyles} from '@material-ui/core/styles';
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
import {MobxRouter} from 'mobx-router';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import ruLocale from 'date-fns/locale/ru';
import enLocale from 'date-fns/locale/en-US';
import {inject, observer} from 'mobx-react';
import {Helmet} from 'react-helmet';
import themes from './themes';
import {WEB_APP_BASE_URL} from "./Api/Routes";

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

const __dirtyFixUrl = () => {
    if (window && window.location.href.includes(`${WEB_APP_BASE_URL}/auth/google/`)) {
        let location = window.location.href;
        const length = `${WEB_APP_BASE_URL}/auth/google/`.length - 1;
        location = location.substring(0, length) + '?' + location.substring(length + 1);
        window.location.href = location;
    }
};

@inject('settingsStore')
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

        __dirtyFixUrl();
    }

    render() {
        const {localeStore, settingsStore} = this.props;
        const pickersLocale = muiPickersLocaleMap[localeStore.currentLocale] || enLocale;
        const theme = themes[settingsStore.colorTheme] || themes.pink;

        return <div id="app" style={{
            flexGrow: 1
        }}>
            <Helmet>
                <meta name="theme-color" content={theme.palette.primary.main}/>
            </Helmet>
            <MuiThemeProvider theme={theme}>
                <MuiPickersUtilsProvider utils={MomentUtils} locale={pickersLocale}>
                    <MobxRouter/>
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        </div>
    }
}

export default withStyles(styles)(App);
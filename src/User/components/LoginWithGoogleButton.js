import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Button from '@material-ui/core/Button';
import {withLocale} from "../../localization";

@withLocale
@inject('googleAuthStore')
@inject('store')
@observer
class LoginWithGoogleButton extends React.Component {
    handleClick = () => {
        const {store, googleAuthStore} = this.props;
        const currentPath = store.router.currentView.path;
        const currentParams = store.router.params;
        const currentQueryParams = store.router.queryParams;

        googleAuthStore.setOriginalPath(currentPath);
        googleAuthStore.setOriginalParams(currentParams);
        googleAuthStore.setOriginalQueryParams(currentQueryParams);

        const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
        const googleClientScope = process.env.REACT_APP_GOOGLE_CLIENT_SCOPE;
        const googleClientRedirectUri = process.env.REACT_APP_GOOGLE_CLIENT_REDIRECT_URI;

        window.location.href = `https://accounts.google.com/o/oauth2/auth?scope=${googleClientScope}&redirect_uri=${googleClientRedirectUri}&response_type=token&client_id=${googleClientId}`;
    };

    render() {
        const {l} = this.props;

        return <Button variant="contained"
                       style={{
                           backgroundColor: '#cb3837',
                           color: 'white'
                       }}
                       onClick={this.handleClick}
                       fullWidth
        >
            {l('loginWithGoogle')}
        </Button>
    }
}

LoginWithGoogleButton.propTypes = {
    store: PropTypes.object,
    googleAuthStore: PropTypes.object,
    l: PropTypes.func
};

export default LoginWithGoogleButton;
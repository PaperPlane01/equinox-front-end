import React from 'react';
import {withSnackbar} from 'notistack';
import {observer, inject} from 'mobx-react';
import {withLocale} from "../localization";

export const snackBarHelper = ({storeName, successLabel, errorLabel, errorPropertyName}) => WrappedComponent => {
    return  @withLocale
    @inject(store => ({
        showSnackBar: store[storeName].showSnackBar,
        error: errorPropertyName ? store[storeName][errorPropertyName] : store[storeName].error,
        [storeName]: store[storeName]
    }))
    @observer
    @withSnackbar class SnackBarHelper extends React.Component {
        componentWillUpdate(nextProps) {
            const {enqueueSnackbar, l} = this.props;
            const store = nextProps[storeName];
            if (store.showSnackBar) {
                const storeError = errorPropertyName ? store[errorPropertyName] : store.error;
                if (!storeError) {
                    enqueueSnackbar(l(successLabel));
                } else {
                    enqueueSnackbar(l(errorLabel, {status: storeError.status}), {variant: 'error'});
                }
                store.setShowSnackBar(false);
            }
        }

        render() {
            return <WrappedComponent {...this.props}/>
        }
    }
};

export default snackBarHelper;
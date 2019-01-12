import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import {withLocale} from "../../localization";

@withLocale
@inject('globalBlockingsStore')
@observer
class BlockedGloballyUserUsernameInput extends React.Component {
    render() {
        const {globalBlockingsStore, l} = this.props;
        const {username, pending} = globalBlockingsStore;

        return <TextField label={l('username')}
                          value={username}
                          onChange={event => globalBlockingsStore.setUsername(event.target.value)}
                          fullWidth
                          variant="outlined"
                          margin="dense"
                          InputProps={{
                              endAdornment: pending && username && <InputAdornment position="end">
                                  <CircularProgress size={10} color="primary"/>
                              </InputAdornment>
                          }}
        />
    }
}

BlockedGloballyUserUsernameInput.propTypes = {
    globalBlockingsStore: PropTypes.object,
    l: PropTypes.func
};

export default BlockedGloballyUserUsernameInput;
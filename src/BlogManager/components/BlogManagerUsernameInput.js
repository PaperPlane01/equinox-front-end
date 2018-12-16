import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import {withLocale} from "../../localization";

@withLocale
@inject('blogManagersStore')
@observer
class BlogManagerUsernameInput extends React.Component {
    render() {
        const {blogManagersStore, l} = this.props;
        const {pending, username} = blogManagersStore;

        return <TextField onChange={event => blogManagersStore.setUsername(event.target.value)}
                          label={l('username')}
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

BlogManagerUsernameInput.propTypes = {
    blogManagersStore: PropTypes.object,
    l: PropTypes.func
};

export default BlogManagerUsernameInput;

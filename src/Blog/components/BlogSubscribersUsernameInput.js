import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import {withLocale} from "../../localization";

@withLocale
@inject('blogSubscribersListStore')
@observer
class BlogSubscribersUsernameInput extends React.Component {
    render() {
        const {l, blogSubscribersListStore} = this.props;
        const {username, pending} = blogSubscribersListStore;

        return <TextField label={l('username')}
                       value={username}
                       onChange={event => blogSubscribersListStore.setUsername(event.target.value)}
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

BlogSubscribersUsernameInput.propTypes = {
    blogSubscribersListStore: PropTypes.object,
    l: PropTypes.func
};

export default BlogSubscribersUsernameInput;
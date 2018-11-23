import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import _ from 'lodash';
import {withLocale} from "../../../localization";

@withLocale
@inject('blogBlockingsStore')
@observer
class BlockedUserUsernameInput extends React.Component {
    updateUsername = _.debounce(username => {
        const {blogBlockingsStore} = this.props;
        blogBlockingsStore.setBlockedUserUsername(username);
    });

    render() {
        const {l, blogBlockingsStore} = this.props;

        return <TextField onChange={event => this.updateUsername(event.target.value)}
                          label={l('blockedUserUsername')}
                          value={blogBlockingsStore.blockedUserUsername}
                          margin="dense"
                          fullWidth
                          variant="outlined"
        />
    }
}

BlockedUserUsernameInput.propTypes = {
    blogBlockingsStore: PropTypes.object,
    l: PropTypes.func
};

export default BlockedUserUsernameInput;

import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import CommentsDisplayMode from '../CommentsDisplayMode';
import {withLocale} from "../../localization";

@withLocale
@inject('commentListStore')
@observer
class SwitchCommentDisplayMode extends React.Component {
    render() {
        const {l, commentListStore} = this.props;
        const {paginationParameters} = commentListStore;
        const {commentsDisplayMode} = paginationParameters;

        return <div>
            <InputLabel htmlFor="commentsDisplayMode">{l('commentsDisplayMode')}</InputLabel>
            <Select value={commentsDisplayMode}
                    onChange={event => commentListStore.setCommentsDisplayMode(event.target.value)}
                    inputProps={{
                        name: 'commentsDisplayMode'
                    }}
            >
                <MenuItem value={CommentsDisplayMode.FLAT}>
                    {l('commentsDisplayMode_flat')}
                </MenuItem>
                <MenuItem value={CommentsDisplayMode.ROOT_COMMENT}>
                    {l('commentsDisplayMode_rootComment')}
                </MenuItem>
            </Select>
        </div>
    }
}

SwitchCommentDisplayMode.propTypes = {
    l: PropTypes.func,
    commentListStore: PropTypes.object
};

export default SwitchCommentDisplayMode;
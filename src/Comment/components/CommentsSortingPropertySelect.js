import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {withLocale} from "../../localization";

@withLocale
@inject('commentListStore')
@observer
class CommentsSortingPropertySelect extends React.Component {
    render() {
        const {commentListStore, l} = this.props;
        const {paginationParameters} = commentListStore;
        const {sortBy} = paginationParameters;

        return <div>
            <InputLabel htmlFor="commentsSortingPropertySelect">
                {l('sortBy')}
            </InputLabel>
            <Select value={sortBy}
                    onChange={event => commentListStore.setCommentsSortingProperty(event.target.value)}
                    inputProps={{
                        name: 'commentsSortingDirectionSelect'
                    }}
            >
                <MenuItem value="id">
                    {l('creationDate')}
                </MenuItem>
            </Select>
        </div>
    }
}

CommentsSortingPropertySelect.propTypes = {
    commentListStore: PropTypes.object,
    l: PropTypes.func
};

export default CommentsSortingPropertySelect;
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
class CommentsSortingDirectionSelect extends React.Component {
    render() {
        const {commentListStore, l} = this.props;
        const {paginationParameters} = commentListStore;
        const {sortingDirection} = paginationParameters;

        return <div>
            <InputLabel htmlFor="commentsSortingDirectionSelect">
                {l('sortingDirection')}
            </InputLabel>
            <Select value={sortingDirection}
                    onChange={event => commentListStore.setCommentsSortingDirection(event.target.value)}
                    inputProps={{
                        name: 'commentsSortingDirectionSelect'
                    }}
            >
                <MenuItem value="asc">
                    {l('ascending')}
                </MenuItem>
                <MenuItem value="desc">
                    {l('descending')}
                </MenuItem>
            </Select>
        </div>
    }
}

CommentsSortingDirectionSelect.propTypes = {
    commentListStore: PropTypes.object,
    l: PropTypes.func
};

export default CommentsSortingDirectionSelect;
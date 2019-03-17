import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import BlockIcon from '@material-ui/icons/Block';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import {withLocale} from "../../localization";

@withLocale
@inject('blockSelectedCommentsAuthorsStore')
@observer
class BlockCommentAuthorsButton extends React.Component {
    render() {
        const {l, blockSelectedCommentsAuthorsStore} = this.props;

        return (
            <BottomNavigationAction label={l('blockCommentAuthors')}
                                    icon={<BlockIcon color="primary"/>}
                                    showLabel
                                    onClick={() => blockSelectedCommentsAuthorsStore.setGlobalBlockingDialogOpen(true)}
            />
        )
    }
}

BlockCommentAuthorsButton.propTypes = {
    l: PropTypes.func,
    blockSelectedCommentsAuthorsStore: PropTypes.object
};

export default BlockCommentAuthorsButton;
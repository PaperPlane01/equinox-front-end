import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from "mobx-react";
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BlockIcon from '@material-ui/icons/Block';
import {withLocale} from "../../localization";

@withLocale
@inject('blockSelectedBlogPostsAuthorsStore')
@observer
class BlockBlogPostsAuthorsButton extends React.Component {
    render() {
        const {l, blockSelectedBlogPostsAuthorsStore} = this.props;

        return (
            <BottomNavigationAction label={l('blockBlogPostsAuthors')}
                                    showLabel
                                    icon={<BlockIcon/>}
                                    onClick={() => blockSelectedBlogPostsAuthorsStore.setGlobalBlockingDialogOpen(true)}
            />
        )
    }
}

BlockBlogPostsAuthorsButton.propTypes = {
    l: PropTypes.function,
    blockSelectedBlogPostsAuthorsStore: PropTypes.object
};

export default BlockBlogPostsAuthorsButton;
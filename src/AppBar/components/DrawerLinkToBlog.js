import React from 'react';
import PropTypes from 'prop-types';
import closeDrawer from './closeDrawer';
import {LinkToBlog} from "../../Blog";

@closeDrawer
class DrawerLinkToBlog extends React.Component {
    handleClick = () => {
        const {closeDrawer, onClick} = this.props;

        if (onClick) {
            onClick();
        }

        closeDrawer();
    };

    render() {
        const {blogId, blogAvatarUri, blogName, blogLetterAvatarColor} = this.props;

        return <LinkToBlog onClick={this.handleClick}
                           blogId={blogId}
                           blogAvatarUri={blogAvatarUri}
                           blogName={blogName}
                           blogLetterAvatarColor={blogLetterAvatarColor}
        />
    }
}

DrawerLinkToBlog.propTypes = {
    blogId: PropTypes.number,
    blogName: PropTypes.string,
    blogAvatarUri: PropTypes.string,
    blogLetterAvatarColor: PropTypes.string,
    closeDrawer: PropTypes.func,
    onClick: PropTypes.func
};

export default DrawerLinkToBlog;
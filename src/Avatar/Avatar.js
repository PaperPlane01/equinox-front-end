import React from 'react';
import PropTypes from 'prop-types';
import MaterialUiAvatar from '@material-ui/core/Avatar';
import {isBlank} from "../utils";

class Avatar extends React.Component {
    render() {
        const {avatarUri, avatarLetter, avatarColor, width, height, style} = this.props;
        const imgProps = (width && height)
            ? {
                width: `${width}px`,
                height: `${height}px`
            }
            : {
                width: '100%',
                height: '100%'
            };

        return isBlank(avatarUri)
            ? <MaterialUiAvatar imgProps={imgProps}
                                style={{
                                    backgroundColor: avatarColor,
                                    ...style
                                }}
            >
                {avatarLetter}
            </MaterialUiAvatar>
            : <MaterialUiAvatar src={avatarUri}
                                imgProps={imgProps}
                                style={{...style}}
            />
    }
}

Avatar.propTypes = {
    avatarUri: PropTypes.string,
    avatarLetter: PropTypes.string,
    avatarColor: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    style: PropTypes.object
};

export default Avatar;
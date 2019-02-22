import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import moment from 'moment'
import CardHeader from '@material-ui/core/CardHeader';
import {Link} from 'mobx-router';
import views from '../../router-config';
import Avatar from '../../Avatar';

@inject('store')
@observer
class CommentHeader extends React.Component {
    render() {
        const {authorId, authorAvatarUri, authorDisplayedName, authorLetterAvatarColor,
            createdAt, action, store, avatarHeight, avatarWidth} = this.props;

        return (
            <CardHeader title={<Link store={store}
                                     view={views.userProfile}
                                     params={{id: authorId}}
                                     style={{
                                         textDecoration: 'none'
                                     }}
            >
                {authorDisplayedName}
            </Link>}
                        avatar={<Avatar avatarUri={authorAvatarUri}
                                        avatarColor={authorLetterAvatarColor}
                                        avatarLetter={authorDisplayedName[0]}
                                        height={avatarHeight || 60}
                                        width={avatarWidth || 60}
                        />}
                        subheader={createdAt && moment(createdAt).format("DD-MM-YYYY HH:mm:ss")}
                        action={action}
            />
        )
    }
}

CommentHeader.propTypes = {
    authorId: PropTypes.number,
    authorDisplayedName: PropTypes.string,
    authorAvatarUri: PropTypes.string,
    authorLetterAvatarColor: PropTypes.string,
    action: PropTypes.any,
    createdAt: PropTypes.string,
    avatarWidth: PropTypes.number,
    avatarHeight: PropTypes.number,
    store: PropTypes.object
};

export default CommentHeader;
import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import {inject, observer} from 'mobx-react';
import {Link} from 'mobx-router';
import views from '../../router-config';

@inject('store')
@observer
class SubscriptionDrawerItem extends React.Component {
    render() {
        const {blogId, blogAvatarUri, blogName, blogLetterAvatarColor, store} = this.props;

        return <Link view={views.blog}
                     store={store}
                     params={{id: blogId}}
                     style={{
                         textDecoration: 'none'
                     }}
        >
            <ListItem>
                {blogAvatarUri
                    ? <Avatar src={blogAvatarUri}
                              imgProps={{
                                  width: 'auto',
                                  height: 'auto'
                              }}
                    />
                    : <Avatar imgProps={{
                                  width: 'auto',
                                  height: 'auto',

                              }}
                              style={{
                                  backgroundColor: blogLetterAvatarColor
                              }}
                    >
                        {blogName[0]}
                    </Avatar>
                }
                <ListItemText>
                    {blogName}
                </ListItemText>
            </ListItem>
        </Link>
    }
}

SubscriptionDrawerItem.propTypes = {
    blogId: PropTypes.number,
    blogName: PropTypes.string,
    blogAvatarUri: PropTypes.string,
    blogLetterAvatarColor: PropTypes.string,
    store: PropTypes.object
};

export default SubscriptionDrawerItem;
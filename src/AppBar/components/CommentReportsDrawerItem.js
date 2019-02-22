import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import {Link} from 'mobx-router';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import closeDrawer from './closeDrawer';
import views from '../../router-config';
import {withLocale} from "../../localization";

@closeDrawer
@withLocale
@inject('store')
@observer
class CommentReportsDrawerItem extends React.Component {

    render() {
        const {store, l, closeDrawer} = this.props;

        return (
            <Link view={views.commentReports}
                  store={store}
                  style={{textDecoration: 'none'}}
            >
                <ListItem onClick={closeDrawer}>
                    <ListItemIcon>
                        <ChatBubbleIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        {l('onComments')}
                    </ListItemText>
                </ListItem>
            </Link>
        )
    }
}

CommentReportsDrawerItem.propTypes = {
    store: PropTypes.object,
    l: PropTypes.func,
    closeDrawer: PropTypes.func
};

export default CommentReportsDrawerItem;
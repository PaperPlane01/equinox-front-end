import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import BlockedUsersListItem from './BlockedUsersListItem';
import BlockedUserUsernameInput from './BlockedUserUsernameInput';
import {withLocale} from "../../localization";

@withLocale
@inject('blogBlockingsStore')
@observer
class BlockedUsersList extends React.Component {
    render() {
        const {blogBlockingsStore, l} = this.props;
        const {blogBlockings, fetchingBlogBlockings} = blogBlockingsStore;

        return <Card>
            <CardHeader title={l('blockedUsers')}/>
            <CardContent>
                <BlockedUserUsernameInput/>
                <div>
                    {!fetchingBlogBlockings && blogBlockings.length === 0
                        ? <Typography variant="subheading" style={{marginTop: '16px'}}>{l('noBlockedUsers')}</Typography>
                        : blogBlockings.map(blogBlocking => (<BlockedUsersListItem blocking={blogBlocking}/>))}
                    {fetchingBlogBlockings && <CircularProgress size={50}
                                                                color="primary"
                                                                style={{
                                                                    marginLeft: 'calc(50% - 50px)',
                                                                }}
                    />}
                </div>
            </CardContent>
        </Card>
    }
}

BlockedUsersList.propTypes = {
    blogBlockingsStore: PropTypes.object,
    l: PropTypes.func
};

export default BlockedUsersList;
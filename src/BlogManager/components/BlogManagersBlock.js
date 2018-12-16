import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {Link} from 'mobx-router';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Avatar from '../../Avatar/index';
import {withLocale} from "../../localization/index";
import views from '../../router-config/index';

@withLocale
@inject('store')
@inject('blogManagersBlockStore')
@observer
class BlogManagersBlock extends React.Component {
    getBlogRoleLabelKey = blogRole => {
        switch (blogRole.toLowerCase()) {
            case "editor":
                return "editor";
        }
    };

    renderCardContent = () => {
        const {blogManagersBlockStore, store, l} = this.props;
        const {pending, blogManagers, blogOwner} = blogManagersBlockStore;

        if (pending) {
            return <CircularProgress size={15} color="primary"/>
        }

        if (blogManagers) {
            return <List>
                <Link view={views.userProfile}
                      params={{id: blogOwner.id}}
                      store={store}
                      style={{textDecoration: 'none'}}
                >
                    <ListItem>
                        <Avatar avatarLetter={blogOwner.displayedName[0]}
                                avatarColor={blogOwner.letterAvatarColor}
                                avatarUri={blogOwner.avatarUri}
                                width={60}
                                height={60}
                        />
                        <ListItemText>
                            {`${blogOwner.displayedName} - ${l('owner')}`}
                        </ListItemText>
                    </ListItem>
                </Link>
                {blogManagers.map(blogManager => (
                    <Link view={views.userProfile}
                          params={{id: blogManager.user.id}}
                          store={store}
                          style={{
                              textDecoration: 'none'
                          }}
                    >
                        <ListItem>
                            <Avatar avatarUri={blogManager.user.avatarUri}
                                    avatarColor={blogManager.user.letterAvatarColor}
                                    avatarLetter={blogManager.user.displayedName[0]}
                                    width={60}
                                    height={60}
                            />
                            <ListItemText>
                                {`${blogManager.user.displayedName} - ${l(blogManager.blogRole)}`}
                            </ListItemText>
                        </ListItem>
                    </Link>
                ))}
            </List>
        }
    };

    render() {
        const {store, blogManagersBlockStore, l} = this.props;

        return <Card>
            <Link style={{textDecoration: 'none'}}
                  store={store}
                  view={views.blogManagers}
                  params={{blogId: blogManagersBlockStore.blogId}}
            >
                <CardHeader title={l('blogManagers')}/>
            </Link>
            <CardContent>
                {this.renderCardContent()}
            </CardContent>
        </Card>
    }
}

BlogManagersBlock.propTypes = {
    blogManagersBlockStore: PropTypes.object,
    store: PropTypes.object,
    l: PropTypes.func
};

export default BlogManagersBlock;

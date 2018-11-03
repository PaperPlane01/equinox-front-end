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
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import {withLocale} from "../../localization";
import views from '../../router-config';

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
                        {blogOwner.avatarUri
                            ? <Avatar src={blogOwner.avatarUri}
                                      imgProps={{
                                          width: '100%',
                                          height: '100%'
                                      }}
                            />
                            : <Avatar imgProps={{
                                width: '100%',
                                height: '100%'
                            }}
                                      style={{
                                          backgroundColor: blogOwner.letterAvatarColor
                                      }}>
                                {blogOwner.displayedName[0]}
                                </Avatar>}
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
                            <Grid container>
                                <Grid item xs={3}>
                                    {blogManager.avatarUri
                                        ? <Avatar src={blogManager.avatarUri}
                                                  imgProps={{
                                                      width: '100%',
                                                      height: '100%'
                                                  }}
                                        />
                                        : <Avatar imgProps={{
                                            width: '100%',
                                            height: '100%'
                                        }}
                                                  style={{
                                                      backgroundColor: blogManager.user.letterAvatarColor
                                                  }}>
                                            {blogManager.user.displayedName[0]}
                                        </Avatar>}
                                </Grid>
                                <Grid item xs={9}>
                                    <ListItemText>
                                        {`${blogManager.user.displayedName} - ${l(blogManager.blogManager.blogRole)}`}
                                    </ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                    </Link>
                ))}
            </List>
        }
    };

    render() {
        const {blogManagersBlockStore, store, l} = this.props;

        return <Card>
            <CardHeader title={l('blogManagers')}/>
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

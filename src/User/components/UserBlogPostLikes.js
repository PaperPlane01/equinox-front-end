import React from "react";
import PropTypes from "prop-types";
import {observer, inject} from "mobx-react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import {BlogPostListItem} from "../../BlogPost";
import {withLocale} from "../../localization";

@withLocale
@inject('userProfileStore')
@inject('userBlogPostLikesStore')
@observer
class UserBlogPostLikes extends React.Component {
    renderBlogPostLikes = () => {
        const {userBlogPostLikesStore, l} = this.props;
        const {blogPostLikes, pending} = userBlogPostLikesStore;

        if (pending && blogPostLikes.length === 0) {
            return <CircularProgress size={50}
                                     color="primary"
                                     style={{
                                         marginLeft: 'calc(50% - 50px)',
                                     }}
            />
        }

        if (blogPostLikes.length === 0) {
            return (
                <Typography variant="subheading">
                    {l('userHasNotLikedAnyBlogPost')}
                </Typography>
            )
        }

        return (
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Grid container spacing={16}>
                        {blogPostLikes.map(blogPostLike => (
                            <Grid item xs={12}>
                                <BlogPostListItem blogPost={blogPostLike.blogPost}
                                                  showIconIfPinned={false}
                                />
                            </Grid>
                        ))}
                        {pending && <Grid item xs={12}>
                            <CircularProgress size={50}
                                              color="primary"
                                              style={{
                                                  marginLeft: 'calc(50% - 50px)',
                                              }}
                            />
                        </Grid>}
                        <Grid item xs={12}>
                            <Button variant="contained"
                                    color="primary"
                                    onClick={userBlogPostLikesStore.fetchBlogPostLikes}
                            >
                                {l('loadMore')}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        )
    };

    render() {
        const {userProfileStore, l} = this.props;
        const {user} = userProfileStore;

        return (
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Typography variant="subtitle1">
                        {user
                            ? l('blogPostsLikedByUser_withUsername', {username: user.displayedName})
                            : l('blogPostsLikedByUser')
                        }:
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {this.renderBlogPostLikes()}
                </Grid>
            </Grid>
        )
    }
}

UserBlogPostLikes.propTypes = {
    userBlogPostLikesStore: PropTypes.object,
    userProfileStore: PropTypes.object,
    l: PropTypes.func
};

export default UserBlogPostLikes;
import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from "mobx-react";
import {Link} from "mobx-router";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckBox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {convertFromRaw} from 'draft-js';
import moment from 'moment';
import views from '../../router-config';
import Avatar from '../../Avatar';
import {withLocale} from "../../localization";
import {toJS} from "mobx";

const style = () => ({
    blogPostReportsCard: {
        overflowX: 'auto !important'
    }
});

@withLocale
@inject('store')
class BlogPostTableCellContent extends React.Component {
    render() {
        const {store, l, blogPost} = this.props;

        let blogPostTrimmed = false;
        console.log(toJS(blogPost));
        let blogPostText = convertFromRaw(blogPost.content).getPlainText();
        if (blogPostText.length > 140) {
            blogPostText = blogPostText.slice(0, 139);
            blogPostText = blogPostText + "...";
            blogPostTrimmed = true;
        }

        const linkToBlog = (
            <Link store={store}
                  view={views.blog}
                  params={{id: blogPost.blog.id}}
            >
                {blogPost.blog.name}
            </Link>
        );
        const subheader = (
            <span>
            {moment(blogPost.createdAt).format("DD-MM-YYYY HH:mm:ss")}
        </span>
        );
        const avatar = (
            <Avatar avatarColor={blogPost.blog.letterAvatarColor}
                    avatarLetter={blogPost.blog.name[0]}
                    avatarUri={blogPost.blog.avatarUri}
                    width={60}
                    height={60}
            />
        );
        const blogPostContent = (
            <Typography variant="body1">
                {blogPostText}
                {blogPostTrimmed && <Link store={store}
                                          view={views.blogPost}
                                          params={{id: blogPost.id}}
                >
                    {l('readWhole')}
                </Link>}
            </Typography>
        );

        return (
            <React.Fragment>
                <CardHeader title={linkToBlog}
                            subheader={subheader}
                            avatar={avatar}
                />
                {blogPostContent}
            </React.Fragment>
        )
    }
}

BlogPostTableCellContent.propTypes = {
    blogPost: PropTypes.object,
    store: PropTypes.object,
    l: PropTypes.func
};

@withLocale
@inject('blogPostReportListStore')
@observer
class BlogPostReportsTable extends React.Component {
    render() {
        const {blogPostReportListStore, l, classes} = this.props;
        const {pending, normalizedBlogPostReports} = blogPostReportListStore;
        const {result} = normalizedBlogPostReports;
        const {blogPostReports} = normalizedBlogPostReports.entities;

        if (pending) {
            return (
                <CircularProgress size={50}
                                  color="primary"
                />
            )
        }

        return (
            <Card className={classes.blogPostReportsCard}>
                <CardContent>
                    <Typography variant="headline">
                        {l('blogPostReports')}
                    </Typography>
                    <Table style={{marginTop: '16px'}}>
                        <TableHead>
                            <TableCell padding="checkbox"/>
                            <TableCell padding="dense">
                                {l('blogPost')}
                            </TableCell>
                            <TableCell>
                                {l('reason')}
                            </TableCell>
                            <TableCell>
                                {l('description')}
                            </TableCell>
                            <TableCell>
                                {l('status')}
                            </TableCell>
                        </TableHead>
                        <TableBody>
                            {result.map(reportId => (
                                <TableRow key={reportId}>
                                    <TableCell padding="checkbox">
                                        <CheckBox checked={Boolean(blogPostReports[reportId].selected)}
                                                  onChange={event =>
                                                      blogPostReportListStore.setBlogPostReportSelected(reportId,
                                                          event.target.checked)}
                                        />
                                    </TableCell>
                                    <TableCell padding="dense">
                                        <BlogPostTableCellContent blogPost={blogPostReports[reportId].blogPost}/>
                                    </TableCell>
                                    <TableCell>
                                        {l(blogPostReports[reportId].reason)}
                                    </TableCell>
                                    <TableCell>
                                        {blogPostReports[reportId].description}
                                    </TableCell>
                                    <TableCell>
                                        {l(blogPostReports[reportId].status)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        )
    }
}

BlogPostReportsTable.propTypes = {
    blogPostsReportListStore: PropTypes.object,
    classes: PropTypes.object,
    l: PropTypes.func
};

export default withStyles(style)(BlogPostReportsTable);
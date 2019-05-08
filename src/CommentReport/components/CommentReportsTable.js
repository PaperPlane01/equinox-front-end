import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckBox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import withStyles from '@material-ui/core/styles/withStyles';
import {CommentHeader} from "../../Comment";
import {withLocale} from "../../localization";
import {toJS} from 'mobx';

const style = () => ({
    commentReportsCard: {
        overflowX: 'auto !important'
    }
});

@withLocale
@inject('commentReportListStore')
@observer
class CommentReportsTable extends React.Component {
    render() {
        const {commentReportListStore, l, classes} = this.props;
        const {normalizedCommentReports, pending} = commentReportListStore;
        const {result} = normalizedCommentReports;
        const {commentReports} = normalizedCommentReports.entities;

        if (pending) {
            return (
                <CircularProgress size={50}
                                  color="primary"
                />
            )
        }

        return (
            <Card className={classes.commentReportsCard}>
                <CardContent>
                    <Typography variant="headline">
                        {l('commentReports')}
                    </Typography>
                    <Table style={{marginTop: 16}}>
                        <TableHead>
                            <TableCell padding="checkbox"/>
                            <TableCell padding="dense">
                                {l('comment')}
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
                                        <CheckBox checked={Boolean(commentReports[reportId].selected)}
                                                  onChange={event =>
                                                      commentReportListStore.setCommentReportSelected(reportId,
                                                          event.target.checked)}
                                        />
                                    </TableCell>
                                    <TableCell padding="dense">
                                        <React.Fragment>
                                            <CommentHeader authorId={commentReports[reportId].comment.author.id}
                                                           authorDisplayedName={commentReports[reportId].comment.author.displayedName}
                                                           authorAvatarUri={commentReports[reportId].comment.author.avatarUri}
                                                           authorLetterAvatarColor={commentReports[reportId].comment.author.letterAvatarColor}
                                                           avatarHeight={15}
                                                           avatarWidth={15}
                                            />
                                            <Typography>
                                                {commentReports[reportId].comment.content}
                                            </Typography>
                                        </React.Fragment>
                                    </TableCell>
                                    <TableCell>
                                        {l(commentReports[reportId].reason)}
                                    </TableCell>
                                    <TableCell>
                                        {commentReports[reportId].content ? commentReports[reportId].content : '-'}
                                    </TableCell>
                                    <TableCell>
                                        {l(commentReports[reportId].status)}
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

CommentReportsTable.propTypes = {
    commentReportListStore: PropTypes.object,
    classes: PropTypes.object,
    l: PropTypes.func
};

export default withStyles(style)(CommentReportsTable);

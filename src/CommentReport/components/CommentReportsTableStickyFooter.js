import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import StickyFooter from 'react-sticky-footer';
import Grid from '@material-ui/core/Grid';
import BlockCommentAuthorsButton from './BlockCommentыAuthorsButton';
import DeleteCommentsButton from './DeleteCommentsButton';
import RejectCommentReportsButton from './RejectCommentReportsButton';
import ClearCommentReportsSelectionButton from './ClearCommentReportsSelectionButton';
import {withLocale} from "../../localization";

@withLocale
@inject('commentReportListStore')
@observer
class CommentReportsTableStickyFooter extends React.Component {
    render() {
        const {commentReportListStore, l} = this.props;
        const {selectedCommentReports} = commentReportListStore.normalizedCommentReports;

        if (selectedCommentReports.length === 0) {
            return null;
        }

        return (
            <StickyFooter stickyStyles={{
                width: '100%'
            }}>
                <Card raised>
                    <CardContent>
                        <Typography variant="headline">
                            {l('selected')}: {selectedCommentReports.length}
                            <div style={{
                                display: 'inline',
                                float: 'right'
                            }}>
                                <ClearCommentReportsSelectionButton/>
                            </div>
                        </Typography>
                        <Grid container alignItems="center">
                            <Grid item xs={4} style={{textAlign: "center"}}>
                                <BlockCommentAuthorsButton/>
                            </Grid>
                            <Grid item xs={4} style={{textAlign: "center"}}>
                                <DeleteCommentsButton/>
                            </Grid>
                            <Grid item xs={4} style={{textAlign: "center"}}>
                                <RejectCommentReportsButton/>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </StickyFooter>
        )
    }
}

CommentReportsTableStickyFooter.propTypes = {
    commentReportListStore: PropTypes.object,
    l: PropTypes.func
};

export default CommentReportsTableStickyFooter;

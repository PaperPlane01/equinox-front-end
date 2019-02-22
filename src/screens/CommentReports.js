import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import StandardLayout from '../StandardLayout';
import AppBar from '../AppBar';
import {canSeeCommentReports, CommentReportsTable, CommentReportsTableStickyFooter,
    CommentReportsSnackBarContainer, BlockSelectedCommentsAuthorsDialog} from "../CommentReport";
import {withLocale} from "../localization";

@withLocale
@inject('authStore')
@observer
class CommentReports extends React.Component {
    render() {
        const {authStore, l} = this.props;
        const {currentUser} = authStore;

        return (
            <React.Fragment>
                <Grid container>
                    <Grid item xs={12}>
                        <AppBar title={l('commentReports')}/>
                    </Grid>
                    <Grid item xs={12}>
                        <StandardLayout>
                            {canSeeCommentReports(currentUser)
                                ? <CommentReportsTable/>
                                : <Typography variant="headline">No access to this page</Typography>
                            }
                        </StandardLayout>
                    </Grid>
                </Grid>
                <BlockSelectedCommentsAuthorsDialog/>
                <CommentReportsSnackBarContainer/>
                <CommentReportsTableStickyFooter/>
            </React.Fragment>
        )
    }
}

CommentReports.propTypes = {
    authStore: PropTypes.object,
    l: PropTypes.func
};

export default CommentReports;
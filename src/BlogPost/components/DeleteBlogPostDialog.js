import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import {withLocale} from "../../localization";

@withLocale
@inject('deleteBlogPostDialogStore')
@observer
class DeleteBlogPostDialog extends React.Component {
    render() {
        const {deleteBlogPostDialogStore, l, fullScreen, blogPostId} = this.props;

        if (deleteBlogPostDialogStore.deleteBlogPostDialogOpened) {
            return <Dialog open={blogPostId === deleteBlogPostDialogStore.blogPostId && deleteBlogPostDialogStore.deleteBlogPostDialogOpened}
                           onClose={() => deleteBlogPostDialogStore.setDeleteBlogPostDialogOpened(false)}
                           fullScreen={fullScreen}
            >
                <DialogTitle>
                    {l('deleteBlogPost')}
                </DialogTitle>
                <DialogContent>
                    <Typography variant="subtitle">
                        {l('areYouSureThatYouWantToDeleteBlogPost')}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained"
                            onClick={deleteBlogPostDialogStore.deleteBlogPost}
                            style={{
                                backgroundColor: '#9a0007',
                                color: 'white'
                            }}
                    >
                        {l('delete')}
                    </Button>
                    <Button variant="outlined"
                            color="secondary"
                            onClick={() => deleteBlogPostDialogStore.setDeleteBlogPostDialogOpened(false)}
                    >
                        {l('cancel')}
                    </Button>
                </DialogActions>
            </Dialog>
        } else {
            return null;
        }
    }
}

DeleteBlogPostDialog.propTypes = {
    deleteBlogPostDialogStore: PropTypes.object,
    blogPostId: PropTypes.number,
    l: PropTypes.func,
    fullScreen: PropTypes.object
};

export default withMobileDialog()(DeleteBlogPostDialog);
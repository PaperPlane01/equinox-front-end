import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import {withLocale} from "../../localization";

@withLocale
@inject('deleteBlogManagerStore')
@observer
class DeleteBlogManagerDialog extends React.Component {
    render() {
        const {deleteBlogManagerStore, l, fullScreen} = this.props;
        const {deleteBlogManagerDialogOpen, pending, error} = deleteBlogManagerStore;

        return <Dialog open={deleteBlogManagerDialogOpen}
                       onClose={() => deleteBlogManagerStore.setDeleteBlogManagerDialogOpen(false)}
                       fullScreen={fullScreen}
        >
            <DialogTitle>
                {l('deleteBlogManager')}
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    {l('confirmBlogManagerDeletion')}
                </Typography>
            </DialogContent>
            <DialogActions>
                {error && <Typography variant="body1" style={{color: 'red'}}>
                    {l('errorWhenAttemptedToDeleteBlogManager')}
                </Typography>}
                {pending && <CircularProgress color="primary" size={15}/>}
                <Button variant="contained"
                        onClick={deleteBlogManagerStore.deleteBlogManager}
                        style={{
                            backgroundColor: '#9a0007',
                            color: 'white'
                        }}
                >
                    {l('delete')}
                </Button>
                <Button variant="outlined"
                        color="secondary"
                        onClick={() => deleteBlogManagerStore.setDeleteBlogManagerDialogOpen(false)}
                >
                    {l('cancel')}
                </Button>
            </DialogActions>
        </Dialog>
    }
}

DeleteBlogManagerDialog.propTypes = {
    deleteBlogManagerStore: PropTypes.object,
    l: PropTypes.func,
    fullScreen: PropTypes.bool
};

export default withMobileDialog()(DeleteBlogManagerDialog);
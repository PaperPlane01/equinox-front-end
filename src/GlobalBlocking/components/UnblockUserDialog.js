import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import {withLocale} from "../../localization";

@withLocale
@inject('deleteGlobalBlockingStore')
@observer
class UnblockUserDialog extends React.Component {
    render() {
        const {deleteGlobalBlockingStore, globalBlocking, fullScreen, l} = this.props;
        const {deleteGlobalBlockingDialogOpen, error, pending} = deleteGlobalBlockingStore;

        return <Dialog open={deleteGlobalBlockingDialogOpen && deleteGlobalBlockingStore.globalBlockingId === globalBlocking.id}
                       onClose={() => deleteGlobalBlockingStore.setDeleteGlobalBlockingDialogOpen(false)}
                       fullScreen={fullScreen}
        >
            <DialogTitle>
                {l('unblockUser_withUsername', {username: globalBlocking.blockedUser.displayedName})}
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    {l('unblockUserConfirmation')}
                </Typography>
            </DialogContent>
            <DialogActions>
                {error && <Typography variant="body1"
                                      style={{color: 'red'}}
                >
                    {l('errorWhenAttemptedToUnblockUser', {errorStatus: error.status})}
                </Typography>}
                {pending && <CircularProgress color="primary" size={15}/>}
                <Button variant="contained"
                        style={{
                            backgroundColor: '#9a0007',
                            color: 'white'
                        }}
                        onClick={deleteGlobalBlockingStore.deleteGlobalBlocking}
                >
                    {l('unblock')}
                </Button>
                <Button variant="outlined"
                        color="secondary"
                        onClick={() => deleteGlobalBlockingStore.setDeleteGlobalBlockingDialogOpen(false)}
                >
                    {l('cancel')}
                </Button>
            </DialogActions>
        </Dialog>
    }
}

UnblockUserDialog.propTypes = {
    globalBlocking: PropTypes.object,
    deleteGlobalBlockingStore: PropTypes.object,
    l: PropTypes.func,
    fullScreen: PropTypes.bool
};

export default UnblockUserDialog;
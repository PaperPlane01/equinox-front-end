import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import BlogRoleSelect from './BlogRoleSelect';
import {withLocale} from "../../localization";

@withLocale
@inject('updateBlogManagerStore')
@observer
class EditBlogManagerDialog extends React.Component {
    renderContent = () => {
        const {updateBlogManagerStore, l} = this.props;
        const {updateBlogManagerFormValues, blogManagerErrors, blogManagerError,
            fetchingBlogManager} = updateBlogManagerStore;

        if (fetchingBlogManager) {
            return <CircularProgress color="primary"
                                     size={100}
                                     style={{
                                         marginLeft: 'calc(50% - 50px)',
                                     }}
            />
        }

        if (blogManagerError) {
            return blogManagerError.status === 404
                ? <Typography variant="headline">
                    {l('blogManagerNotFound')}
                </Typography>
                : <Typography variant="headline">
                    {l('errorWhenAttemptedToFetchBlogManager', {errorStatus: blogManagerError.status})}
                </Typography>
        }

        return <BlogRoleSelect value={updateBlogManagerFormValues.blogRole}
                               onChange={blogRole =>
                                   updateBlogManagerStore
                                       .setUpdateBlogManagerFormValue(blogRole, 'blogRole')}
        />
    };

    render() {
        const {fullScreen, updateBlogManagerStore, l} = this.props;
        const {updateBlogManagerDialogOpen, persistedBlogManager,
            submitting, submissionError, blogManager} = updateBlogManagerStore;

        return <Dialog fullScreen={fullScreen}
                       open={updateBlogManagerDialogOpen}
                       onClose={() => updateBlogManagerStore.setUpdateBlogManagerDialogOpen(false)}
        >
            <DialogTitle>
                {blogManager
                    ? l('assignUserABlogManager_withUsernameSpecified',
                        {username: blogManager.user.displayedName})
                    : l('assignUserABlogManager')
                }
            </DialogTitle>
            <DialogContent>
                {this.renderContent()}
            </DialogContent>
            <DialogActions>
                {submitting && <CircularProgress color="primary" size={15}/>}
                {submissionError && <Typography variant="body1" style={{color: 'red'}}>
                    {l('errorWhenAttemptedToAssignUserABlogManager')}
                </Typography>
                }
                {persistedBlogManager && <Typography variant="body1" style={{color: 'green'}}>
                    {l('userAssignedABlogManagerSuccessfully')}
                </Typography>}
                <Button variant="contained"
                        color="primary"
                        onClick={updateBlogManagerStore.updateBlogManager}
                >
                    {l('assign')}
                </Button>
                <Button variant="outlined"
                        color="secondary"
                        onClick={() => updateBlogManagerStore.setUpdateBlogManagerDialogOpen(false)}
                >
                    {persistedBlogManager ? l('close') : l('cancel')}
                </Button>
            </DialogActions>
        </Dialog>
    }

}

EditBlogManagerDialog.propTypes = {
    updateBlogManagerStore: PropTypes.object,
    fullScreen: PropTypes.bool,
    l: PropTypes.func
};

export default withMobileDialog()(EditBlogManagerDialog);
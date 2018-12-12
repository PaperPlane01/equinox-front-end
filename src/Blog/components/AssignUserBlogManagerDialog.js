import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import BlogRoleSelect from './BlogRoleSelect';
import {withLocale} from "../../localization";

@withLocale
@inject('createBlogManagerStore')
@observer
class AssignUserBlogManagerDialog extends React.Component {
    renderContent = () => {
        const {createBlogManagerStore, l} = this.props;
        const {fetchingUser, userError, createBlogManagerFormValues,
            createBlogManagerFormErrors} = createBlogManagerStore;

        if (fetchingUser) {
            return <CircularProgress color="primary"
                                     size={100}
                                     style={{
                                         marginLeft: 'calc(50% - 50px)',
                                     }}
            />
        }

        if (userError) {
            return <Typography variant="subheading" style={{color: 'red'}}>
                {userError.status === 404
                    ? l('userNotFound')
                    : l('errorWhenAttemptedToFetchUser', {errorStatus: userError.status})
                }
            </Typography>
        }

        return <BlogRoleSelect onChange={blogRole =>
            createBlogManagerStore.setCreateBlogManagerFormValue(blogRole, 'blogRole')}
                               value={createBlogManagerFormValues.blogRole}
        />
    };

    render() {
        const {createBlogManagerStore, fullScreen, l} = this.props;
        const {user, submitting, createBlogManagerDialogOpen, submissionError,
            persistedBlogManager} = createBlogManagerStore;

        return <Dialog fullScreen={fullScreen}
                       open={createBlogManagerDialogOpen}
                       onClose={() => createBlogManagerStore.setCreateBlogManagerDialogOpen(false)}
        >
            <DialogTitle>
                {user
                    ? l('assignUserABlogManager_withUsernameSpecified', {username: user.displayedName})
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
                </Typography>}
                {persistedBlogManager && <Typography variant="body1" style={{color: 'red'}}>
                    {l('userAssignedABlogManagerSuccessfully')}
                </Typography>}
                <Button variant="contained"
                        color="primary"
                        onClick={createBlogManagerStore.createBlogManager}
                >
                    {l('assign')}
                </Button>
                <Button variant="outlined"
                        color="secondary"
                        onClick={() => createBlogManagerStore.setCreateBlogManagerDialogOpen(false)}
                >
                    {persistedBlogManager ? l('close') : l('cancel')}
                </Button>
            </DialogActions>
        </Dialog>
    }
}

AssignUserBlogManagerDialog.propTypes = {
    l: PropTypes.func,
    fullScreen: PropTypes.bool,
    createBlogManagerStore: PropTypes.object
};

export default withMobileDialog()(AssignUserBlogManagerDialog);
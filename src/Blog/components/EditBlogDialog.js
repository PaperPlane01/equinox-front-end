import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Typography from '@material-ui/core/Typography';
import BlogManagersVisibilityLevelSelect from './BlogManagersVisibilityLevelSelect';
import DefaultPublisherTypeSelect from './DefaultPublisherTypeSelect';
import {withLocale} from "../../localization";

@withLocale
@inject('editBlogDialogStore')
@observer
class EditBlogDialog extends React.Component {
    renderDialogContent = () => {
        const {editBlogDialogStore, l} = this.props;
        const {editBlogFormValues, editBlogFormErrors, submissionError,
            editBlogDialogOpen, fetchingBlog, fetchingBlogError, submitting} = editBlogDialogStore;
        console.log(editBlogFormErrors);
        
        if (fetchingBlog) {
            return <CircularProgress size={50}
                                     color="primary"
                                     style={{
                                         marginLeft: 'calc(50% - 25px)'
                                     }}
            />
        } else if (!fetchingBlogError) {
            return <div>
                <TextField label={l('blogName')}
                           value={editBlogFormValues.name}
                           onChange={event => editBlogDialogStore.setEditBlogFormValue(event.target.value, 'name')}
                           margin="dense"
                           error={Boolean(editBlogFormErrors.name)}
                           helperText={editBlogFormErrors.name && l(editBlogFormErrors.name)}
                           fullWidth
                />
                <TextField label={l('description')}
                           value={editBlogFormValues.description}
                           onChange={event => editBlogDialogStore.setEditBlogFormValue(event.target.value, 'description')}
                           margin="dense"
                           error={Boolean(editBlogFormErrors.description)}
                           helperText={editBlogFormErrors.description && l(editBlogFormErrors.description)}
                           fullWidth
                />
                <TextField label={l('avatarLink')}
                           value={editBlogFormValues.avatarUri}
                           onChange={event => editBlogDialogStore.setEditBlogFormValue(event.target.value, 'avatarUri')}
                           margin="dense"
                           error={Boolean(editBlogFormErrors.avatarUri)}
                           helperText={editBlogFormErrors.avatarUri && l(editBlogFormErrors.avatarUri)}
                           fullWidth
                />
                <DefaultPublisherTypeSelect value={editBlogFormValues.defaultPublisherType}
                                            onChange={event =>
                                                editBlogDialogStore.setEditBlogFormValue(event.target.value,
                                                'defaultPublisherType')}
                />
                <BlogManagersVisibilityLevelSelect value={editBlogFormValues.blogManagersVisibilityLevel}
                                                   onChange={event =>
                                                       editBlogDialogStore.setEditBlogFormValue(event.target.value,
                                                           'blogManagersVisibilityLevel')}
                />
            </div>
        } else {
            if (fetchingBlogError.status === 404) {
                return <Typography variant="subheading">
                    {l('blogNotFound')}
                </Typography>
            } else {
                return <Typography variant="subheading">
                    {l('errorWhenAttemptedToFetchBlog', {errorStatus: fetchingBlogError.status})}
                </Typography>
            }
        }
    };
    
    render() {
        const {editBlogDialogStore, l, fullScreen} = this.props;
        const {editBlogFormValues, editBlogFormErrors, submissionError, 
            editBlogDialogOpen, updatedBlog, fetchingBlog, submitting} = editBlogDialogStore;

        if (editBlogDialogOpen) {
            return <Dialog fullScreen={fullScreen}
                           open={editBlogDialogOpen}
                           onClose={() => editBlogDialogStore.setEditBlogFormDialogOpen(false)}
            >
                <DialogTitle>
                    {l('editBlog')}
                </DialogTitle>
                <DialogContent>
                    {this.renderDialogContent()}
                </DialogContent>
                <DialogActions>
                    {updatedBlog && <Typography variant="body1" style={{color: 'green'}}>
                        {l('blogUpdated')}
                    </Typography>}
                    {submissionError && <Typography variant="body1" style={{color: 'red'}}>
                        {l('errorWhenAttemptedToUpdateBlog', {errorStatus: submissionError.status})}
                    </Typography>}
                    <Button variant="contained"
                            color="primary"
                            onClick={editBlogDialogStore.updateBlog}
                    >
                        {l('save')}
                    </Button>
                    <Button variant="outlined"
                            color="secondary"
                            onClick={() => editBlogDialogStore.setEditBlogFormDialogOpen(false)}
                    >
                        {editBlogDialogStore.updatedBlog ? l('close') : l('cancel')}
                    </Button>
                </DialogActions>
            </Dialog>
        } else {
            return null;
        }
    }
}

EditBlogDialog.propTypes = {
    editBlogDialogStore: PropTypes.object,
    l: PropTypes.func,
    fullScreen: PropTypes.bool
};

export default withMobileDialog()(EditBlogDialog);
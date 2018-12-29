import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Editor} from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {canEditBlogPost} from "../permissions";
import {withLocale} from "../../localization";

@withLocale
@inject('authStore')
@inject('updateBlogPostStore')
@observer
class UpdateBlogPostForm extends React.Component {
    render() {
        const {updateBlogPostStore, currentLocale, authStore, l} = this.props;
        const {blogPost, fetchingBlogPost, updateBlogPostFormValues, fetchingError, updateBlogPostFormErrors, submitting,
            submissionError, blogPostUpdatedSuccessfully} = updateBlogPostStore;

        if (fetchingBlogPost) {
            return <CircularProgress size={50}
                                     color="primary"
                                     style={{
                                         marginLeft: 'calc(50% - 50px)',
                                     }}
            />
        }

        if (fetchingError) {
            const errorStatus = fetchingError.status;
            return errorStatus === 404 || errorStatus === 400
                ? <Typography variant="headline">
                    {l('blogPostNotFound')}
                </Typography>
                : <Typography variant="headline">
                    {l('errorWhenAttemptedToFetchBlogPost', {errorStatus})}
                </Typography>
        }

        if (blogPost && !canEditBlogPost(authStore.currentUser, blogPost)) {
            return <Typography variant="headline">
                {l('accessToPageDenied')}
            </Typography>
        }

        return <div>
            <Typography variant="headline">
                {l('updateBlogPost')}
            </Typography>
            <TextField label={l('title')}
                       value={updateBlogPostFormValues.title}
                       onChange={event => updateBlogPostStore.setUpdateBlogBlockingFormValue(event.target.value, 'title')}
                       error={Boolean(updateBlogPostFormErrors.title)}
                       helperText={updateBlogPostFormErrors.title && l(updateBlogPostFormErrors.title)}
                       fullWidth
                       margin="dense"
            />
            <Editor style={{
                width: '100%',
                border: '1px solid #F1F1F1 !important'
            }}
                    editorState={updateBlogPostFormValues.content}
                    onEditorStateChange={editorState => updateBlogPostStore.setUpdateBlogPostFormValue(editorState, 'content')}
                    localization={{
                        locale: currentLocale
                    }}
            />
            {updateBlogPostFormValues.content && <Typography variant="body1"
                                                             style={{color: 'red'}}
            >
                {l(updateBlogPostFormErrors.content)}
            </Typography>}
            <Button variant="contained"
                    color="primary"
                    onClick={updateBlogPostStore.updateBlogPost}
            >
                {l('save')}
            </Button>
            {submitting && <CircularProgress size={15}
                                             color="primary"
            />}
            {submissionError && <Typography variant="body1"
                                            style={{color: 'red'}}
            >
                {l('errorWhenAttemptedToUpdateBlogPost', {errorStatus: submissionError.status})}
            </Typography>}
            {blogPostUpdatedSuccessfully && <Typography variant="body1"
                                                        style={{color: 'green'}}
            >
                {l('blogPostUpdatedSuccessfully')}
            </Typography>}
        </div>
    }
}

UpdateBlogPostForm.propTypes = {
    updateBlogPostStore: PropTypes.object,
    authStore: PropTypes.object,
    l: PropTypes.func,
    currentLocale: PropTypes.string
};

export default UpdateBlogPostForm;
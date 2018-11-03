import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import BlogManagersVisibilityLevelSelect from './BlogManagersVisibilityLevelSelect';
import DefaultPublisherTypeSelect from './DefaultPublisherTypeSelect';
import {withLocale} from "../../localization";

@withLocale
@inject('createBlogStore')
@observer
class CreateBlogForm extends React.Component {
    render() {
        const {createBlogStore, l} = this.props;
        const {createBlogFormErrors, createBlogFormValues, pending, submissionError, persistedBlog} = createBlogStore;

        return <div>
            <Typography variant="headline">
                {l('createBlog')}
            </Typography>
            <TextField label={l('blogName')}
                       onChange={event => createBlogStore.setCreateBlogFormValue(event.target.value, 'name')}
                       fullWidth
                       error={Boolean(createBlogFormErrors.name)}
                       helperText={createBlogFormErrors.name && l(createBlogFormErrors.name)}
                       margin="dense"
            />
            <TextField label={l('blogDescription')}
                       onChange={event => createBlogStore.setCreateBlogFormValue(event.target.value, 'description')}
                       fullWidth
                       error={Boolean(createBlogFormErrors.description)}
                       helperText={createBlogFormErrors.description && l(createBlogFormErrors.description)}
                       margin="dense"
                       multiline
            />
            <TextField label={l('avatarUri')}
                       onChange={event => createBlogStore.setCreateBlogFormValue(event.target.value, 'avatarUri')}
                       fullWidth
                       error={Boolean(createBlogFormErrors.avatarUri)}
                       helperText={createBlogFormErrors.avatarUri && l(createBlogFormErrors.avatarUri)}
                       margin="dense"
            />
            <DefaultPublisherTypeSelect onChange={event => createBlogStore.setCreateBlogFormValue(event.target.value,
                'defaultPublisherType')}
                                        value={createBlogFormValues.defaultPublisherType}
            />
            <BlogManagersVisibilityLevelSelect onChange={event => createBlogStore.setCreateBlogFormValue(event.target.value,
                'blogManagersVisibilityLevel')}
                                               value={createBlogFormValues.blogManagersVisibilityLevel}
            />
            <Button variant="contained"
                    color="primary"
                    onClick={createBlogStore.createBlog}
                    margin="dense"
            >
                {l('create')}
            </Button>
            {pending && <CircularProgress color="primary" size={25}/>}
            {submissionError && <Typography variant="body1" style={{color: 'red'}}>
                {l('errorWhenAttemptedToCreateBlog', {errorStatus: submissionError.status})}
            </Typography>}
            {persistedBlog && <Typography variant="body1" style={{color: 'green'}}>
                {l('blogCreatedSuccessfully')}
            </Typography>}
        </div>
    }
}

CreateBlogForm.propTypes = {
    createBlogStore: PropTypes.object,
    l: PropTypes.func
};

export default CreateBlogForm;
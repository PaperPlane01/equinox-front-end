import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {Editor} from "react-draft-wysiwyg";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {withLocale} from "../../localization";

@withLocale
@inject('createBlogPostStore')
@observer
class CreateBlogPostForm extends React.Component {
    render() {
        const {l, currentLocale, createBlogPostStore} = this.props;
        const {createBlogPostFormErrors, createBlogPostFormValues, submissionError,
            pending, createBlogPostFormHidden}
        = createBlogPostStore;

        if (createBlogPostFormHidden) {
            return <Button variant="contained"
                           color="primary"
                           onClick={() => createBlogPostStore.setCreateBlogPostFormHidden(false)}
            >
                {l('createBlogPost')}
            </Button>
        }

        return <div>
            <TextField label={l('title')}
                       value={createBlogPostFormValues.title}
                       onChange={event => createBlogPostStore.setCreateBlogPostFormValue(event.target.value, 'title')}
                       error={createBlogPostFormErrors.title}
                       helperText={createBlogPostFormErrors.title && l(createBlogPostFormErrors.title)}
                       fullWidth
                       margin="dense"
            />
            <Editor style={{
                width: '100%',
                border: '1px solid #F1F1F1 !important'
            }}
                    editorState={createBlogPostFormValues.content}
                    onEditorStateChange={editorState => createBlogPostStore.setCreateBlogPostFormValue(editorState, 'content')}
                    localization={{
                        locale: currentLocale
                    }}
            />
            {createBlogPostFormErrors.content && <Typography variant="body1"
                                                             style={{color: 'red'}}
            >
                {l(createBlogPostFormErrors.content)}
            </Typography>}
            <Button variant="contained"
                    color="primary"
                    onClick={() => createBlogPostStore.createBlogPost()}
            >
                {l('save')}
            </Button>
            <Button variant="outlined"
                    color="secondary"
                    style={{
                        marginLeft: '15px'
                    }}
                    onClick={() => createBlogPostStore.setCreateBlogPostFormHidden(true)}
            >
                {l('cancel')}
            </Button>
        </div>
    }
}

CreateBlogPostForm.propTypes = {
    l: PropTypes.func,
    currentLocale: PropTypes.string,
    createBlogPostStore: PropTypes.object
};

export default CreateBlogPostForm;
import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {withLocale} from "../../localization";

@withLocale
@inject('createCommentStore')
@observer
class CreateCommentForm extends React.Component {
    render() {
        const {createCommentStore, l} = this.props;
        const {submissionError, validationError, content, pending} = createCommentStore;

        return <div>
            <Typography variant="body1">
                {l('leaveAComment')}
            </Typography>
            <TextField multiline
                       fullWidth
                       onChange={event => createCommentStore.setContent(event.target.value)}
                       value={content}
                       error={Boolean(validationError)}
                       helperText={validationError && l(validationError)}
                       margin="dense"
            />
            <Button variant="contained"
                    color="primary"
                    onClick={createCommentStore.saveComment}
            >
                {l('save')}
            </Button>
        </div>
    }
}

CreateCommentForm.propTypes = {
    l: PropTypes.func,
    createCommentStore: PropTypes.object
};

export default CreateCommentForm;
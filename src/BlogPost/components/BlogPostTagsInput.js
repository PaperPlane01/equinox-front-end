import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import {withLocale} from "../../localization";

@withLocale
class BlogPostTagsInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputValue: ''
        }
    }

    updateInputValue = inputValue => {
        this.setState({inputValue});
    };

    handleAddTag = () => {
        const {inputValue} = this.state;

        if (inputValue && inputValue.trim().length !== 0) {
            this.props.onTagAdded(inputValue);
            this.clearInputValue();
        }
    };

    handleRemoveTag = tagIndex => {
        this.props.onTagRemoved(tagIndex);
    };

    clearInputValue = () => {
        this.setState({
            inputValue: ''
        })
    };

    render() {
        const {tags, l, error, errorText} = this.props;
        const {inputValue} = this.state;

        return (
            <React.Fragment>
                <TextField value={inputValue}
                           onChange={event => this.updateInputValue(event.target.value)}
                           onKeyPress={event => {
                               if (event.key === 'Enter') {
                                   this.handleAddTag();
                               }
                           }}
                           margin="dense"
                           fullWidth
                           label={l('addTag')}
                           InputProps={{
                               startAdornment: (
                                   <InputAdornment position="start">
                                       <IconButton onClick={this.handleAddTag}>
                                           <AddIcon/>
                                       </IconButton>
                                   </InputAdornment>
                               )
                           }}
                           error={error}
                           helperText={errorText}
                />
                {tags.map((tag, index) => (
                    <Chip label={tag}
                          onDelete={() => this.handleRemoveTag(index)}
                          color="primary"
                    />
                ))}
            </React.Fragment>
        )
    }
}

BlogPostTagsInput.propTypes = {
    onTagAdded: PropTypes.func,
    onTagRemoved: PropTypes.func,
    tags: PropTypes.array,
    error: PropTypes.bool,
    errorText: PropTypes.string,
    l: PropTypes.func
};

export default BlogPostTagsInput;
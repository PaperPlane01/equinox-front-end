import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import {withLocale} from "../../localization";

const style = () => ({
    searchQueryTextField: {
        color: 'inherit',
        borderBottom: '1px solid',
        '&:before': {
            borderBottom: '1px solid'
        },
        '&:after': {
            borderBottom: '1px solid'
        },
        '&:hover:before': {
            borderBottom: '2px solid !important'
        },
    }
});

@withLocale
class SearchBlogPostsQueryTextField extends React.Component {
    handleInput = query => {
        if (this.props.onInputChange) {
            this.props.onInputChange(query);
        }
    };

    handleSearchButtonClick = () => {
        const {onSearchButtonClick} = this.props;
        if (onSearchButtonClick) {
            onSearchButtonClick();
        }
    };

    render() {
        const {l, fullWidth, classes} = this.props;

        return (
            <div style={{color: 'inherit'}}>
                <TextField fullWidth={fullWidth}
                           onChange={event => this.handleInput(event.target.value)}
                           value={this.props.query}
                           placeholder={l('search')}
                           InputProps={{
                               className: classes.searchQueryTextField,
                               classes: {
                                   underline: classes.underline
                               },
                               endAdornment: <InputAdornment position="end">
                                   <IconButton onClick={this.handleSearchButtonClick}
                                               style={{color: 'inherit'}}
                                   >
                                       <SearchIcon/>
                                   </IconButton>
                               </InputAdornment>
                           }}
                />
            </div>
        )
    }
}

SearchBlogPostsQueryTextField.propTypes = {
    fullWidth: PropTypes.bool,
    onSearchButtonClick: PropTypes.func,
    query: PropTypes.string,
    onInputChange: PropTypes.func,
    classes: PropTypes.object,
    l: PropTypes.func
};

export default withStyles(style)(SearchBlogPostsQueryTextField);
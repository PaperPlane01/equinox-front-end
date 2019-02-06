import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import withStyles from '@material-ui/core/styles/withStyles';
import {withLocale} from "../../localization";
import views from '../../router-config';

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
@inject('store')
@observer
class SearchBlogPostsQueryTextField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ''
        };
    }

    handleInput = query => {
        this.setState({query});
    };

    handleSearchButtonClick = () => {
        const {store, onSearchButtonClick} = this.props;
        const {query} = this.state;

        if (onSearchButtonClick) {
            onSearchButtonClick();
        }

        store.router.goTo(views.search, {}, store, {query});
    };

    render() {
        const {l, fullWidth, classes} = this.props;

        return (
            <div style={{color: 'inherit'}}>
                <TextField fullWidth={fullWidth}
                           onChange={event => this.handleInput(event.target.value)}
                           value={this.state.query}
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
    store: PropTypes.object,
    classes: PropTypes.object,
    l: PropTypes.func
};

export default withStyles(style)(SearchBlogPostsQueryTextField);
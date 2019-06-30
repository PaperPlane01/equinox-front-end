import React from "react";
import PropTypes from "prop-types";
import {inject, observer} from "mobx-react";
import SearchBlogPostsQueryTextField from "./SearchBlogPostsQueryTextField";
import views from "../../router-config";

@inject('store')
@observer
class SearchBlogPostsQueryTextFieldWrapper extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            query: ''
        }
    }

    handleInput = query => {
        console.log(query);
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
        return <SearchBlogPostsQueryTextField onInputChange={this.handleInput}
                                              onSearchButtonClick={this.handleSearchButtonClick}
                                              query={this.state.query}
        />
    }
}

SearchBlogPostsQueryTextField.propTypes = {
    onInputChange: PropTypes.func,
    onSearchButtonClick: PropTypes.func,
    store: PropTypes.object
};

export default SearchBlogPostsQueryTextFieldWrapper;
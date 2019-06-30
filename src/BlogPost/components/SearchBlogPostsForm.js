import React from "react";
import {observer, inject} from "mobx-react";
import PropTypes from "prop-types";
import queryString from "query-string";
import SearchBlogPostsQueryTextField from "./SearchBlogPostsQueryTextField";
import BlogPostTagsInput from "./BlogPostTagsInput";
import views from "../../router-config";

@inject('store')
@inject('searchBlogPostsStore')
@observer
class SearchBlogPostsForm extends React.Component {
    handleSearchButtonClick = () => {
        const {store, searchBlogPostsStore} = this.props;
        const {query, tags} = searchBlogPostsStore.searchForm;

        store.router.goTo(views.search, {}, store, {
            query,
            tags
        })
    };

    render() {
        const {searchBlogPostsStore} = this.props;
        const {query, tags} = searchBlogPostsStore.searchForm;

        return (
            <React.Fragment>
                <SearchBlogPostsQueryTextField query={query}
                                               onInputChange={query => searchBlogPostsStore.updateSearchFormValue('query', query)}
                                               fullWidth
                                               onSearchButtonClick={this.handleSearchButtonClick}
                />
                <BlogPostTagsInput onTagAdded={tag => searchBlogPostsStore.addTag(tag)}
                                   onTagRemoved={index => searchBlogPostsStore.removeTag(index)}
                                   tags={tags}
                />
            </React.Fragment>
        )
    }
}

SearchBlogPostsForm.propTypes = {
    searchBlogPostsStore: PropTypes.object,
    store: PropTypes.object
};

export default SearchBlogPostsForm;
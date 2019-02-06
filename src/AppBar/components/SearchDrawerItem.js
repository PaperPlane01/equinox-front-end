import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import closeDrawer from './closeDrawer';
import {SearchBlogPostsQueryTextField} from "../../BlogPost";

@closeDrawer
class SearchDrawerItem extends React.Component {
    render() {
        return <ListItem>
            <SearchBlogPostsQueryTextField onSearchButtonClick={this.props.closeDrawer}/>
        </ListItem>
    }
}

SearchDrawerItem.propTypes = {
    closeDrawer: PropTypes.func
};

export default SearchDrawerItem;
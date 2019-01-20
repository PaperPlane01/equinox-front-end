import React from 'react';
import PropTypes from 'prop-types';
import {inject} from 'mobx-react';
import IconButton from '@material-ui/core/IconButton';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Typography from '@material-ui/core/Typography';
import {Link} from 'mobx-router';
import {prettifyNumber} from "../../utils";
import views from '../../router-config';

@inject('store')
class NumberOfComments extends React.Component {
    render() {
        const {numberOfComments, blogPostId, store} = this.props;

        return <Link view={views.blogPost}
                     params={{id: blogPostId}}
                     store={store}
                     style={{
                         textDecoration: 'none'
                     }}
        >
            <IconButton color="primary">
                <ChatBubbleIcon/>
                <Typography variant="body1" color="primary">
                    {prettifyNumber(numberOfComments)}
                </Typography>
            </IconButton>
        </Link>
    }
}

NumberOfComments.propTypes = {
    numberOfComments: PropTypes.number,
    blogPostId: PropTypes.number,
    store: PropTypes.object
};

export default NumberOfComments;
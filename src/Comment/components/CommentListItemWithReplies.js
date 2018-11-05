import React from 'react';
import PropTypes from 'prop-types';
import CommentListItem from './CommentListItem';

class CommentListItemWithReplies extends React.Component {
    render() {
        const {comment, replies} = this.props;

        return <React.Fragment>
            <CommentListItem comment={comment}/>
            {replies.map(reply => (
                <div style={{
                    marginLeft: '30px'
                }}>
                    <CommentListItem comment={reply}/>
                </div>
            ))}
        </React.Fragment>
    }
}

CommentListItemWithReplies.propTypes = {
    comment: PropTypes.object,
    replies: PropTypes.array
};

export default CommentListItemWithReplies;
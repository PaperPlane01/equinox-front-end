import React from 'react';
import PropTypes from 'prop-types';
import CommentListItem from './CommentListItem';

class CommentListItemWithReplies extends React.Component {
    render() {
        const {comment, replies, highlightedCommentId} = this.props;

        return <React.Fragment>
            <CommentListItem comment={comment}
                             highlight={highlightedCommentId === comment.id}
            />
            {replies.map(reply => (
                <div style={{
                    marginLeft: '30px'
                }}>
                    <CommentListItem comment={reply}
                                     highlight={highlightedCommentId === reply.id}
                    />
                </div>
            ))}
        </React.Fragment>
    }
}

CommentListItemWithReplies.propTypes = {
    comment: PropTypes.object,
    highlightedCommentId: PropTypes.number,
    replies: PropTypes.array
};

export default CommentListItemWithReplies;
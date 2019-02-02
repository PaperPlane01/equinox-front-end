import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import scrollToElement from 'scroll-to-element';
import CommentListItemWithReplies from './CommentListItemWithReplies';
import {withLocale} from "../../localization";

@withLocale
@inject('highlightedCommentStore')
@inject('commentListStore')
@observer
class CommentList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scrolledToHighlightedComment: false
        }
    }

    componentDidUpdate(previousProps) {
        const {rootCommentAtTop, highlightedCommentId} = this.props.highlightedCommentStore;
        if (rootCommentAtTop && highlightedCommentId
            && (rootCommentAtTop.id === highlightedCommentId
                || rootCommentAtTop.replies.filter(reply => reply.id === highlightedCommentId).length !== 0)
            && !this.state.scrolledToHighlightedComment) {
            console.log('trying to scroll to comment');
            scrollToElement(`#comment-id${highlightedCommentId}`, {
                offset: 0,
                ease: 'out-bounce',
                duration: 150
            });
            this.setState({
                scrolledToHighlightedComment: true
            });
        }
        if (rootCommentAtTop && highlightedCommentId
            && highlightedCommentId !== previousProps.highlightedCommentStore.highlightedCommentId
            && this.state.scrolledToHighlightedComment
            && (rootCommentAtTop.id === highlightedCommentId
                || rootCommentAtTop.replies.filter(reply => reply.id === highlightedCommentId).length !== 0)
        ) {
            this.setState({scrolledToHighlightedComment: false})
        }
    }

    render() {
        const {commentListStore, highlightedCommentStore, l} = this.props;
        const {comments} = commentListStore;
        const {rootCommentAtTop, highlightedCommentId} = highlightedCommentStore;

        if (comments.result.length === 0) {
            return <Typography variant="body1">
                {l('noComments')}
            </Typography>
        } else {
            return <Card>
                <CardContent>
                    {rootCommentAtTop && <div>
                        <div style={{marginBottom: '30px'}}>
                            <Typography variant="subheading">
                                {l('highlightedComment')}:
                            </Typography>
                            <CommentListItemWithReplies comment={rootCommentAtTop}
                                                        replies={rootCommentAtTop.replies}
                                                        highlightedCommentId={highlightedCommentId}
                            />
                        </div>
                        <Divider/>
                    </div>}
                    <Typography variant="subheading">
                        {l('comments')}:
                    </Typography>
                    {comments.result.map(commentId => (
                        <div>
                            <CommentListItemWithReplies comment={comments.entities.comments[commentId]}
                                             replies={comments.entities.comments[commentId].replies.map(
                                                 replyId => (comments.entities.replies[replyId])
                                             )}
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>
        }
    }
}

CommentList.propTypes = {
    commentListStore: PropTypes.object,
    highlightedCommentStore: PropTypes.object,
    l: PropTypes.func
};

export default CommentList;
import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CommentListItemWithReplies from './CommentListItemWithReplies';
import {withLocale} from "../../localization";

@withLocale
@inject('commentListStore')
@observer
class CommentList extends React.Component {
    render() {
        const {commentListStore, l} = this.props;
        const {comments} = commentListStore;

        if (comments.result.length === 0) {
            return <Typography variant="body1">
                {l('noComments')}
            </Typography>
        } else {
            return <Card>
                <CardContent>
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
    l: PropTypes.func
};

export default CommentList;
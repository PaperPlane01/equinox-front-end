import React from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import CommentListItem from './CommentListItem';
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
                            <CommentListItem comment={comments.entities.comments[commentId]}/>
                            <Divider/>
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
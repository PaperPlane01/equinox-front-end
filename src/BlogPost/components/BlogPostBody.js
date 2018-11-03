import React from 'react';
import PropTypes from 'prop-types';
import draftJsToHtml from 'draftjs-to-html';
import {Editor} from 'react-draft-wysiwyg';
import Typography from '@material-ui/core/Typography';

class BlogPostBody extends React.Component {
    render() {
        const {content, title} = this.props;

        return <div>
            {title && <Typography variant="headline">
                {title}
            </Typography>}
            <div dangerouslySetInnerHTML={{__html: draftJsToHtml(content)}}/>
        </div>
    }
}

BlogPostBody.propTypes = {
    title: PropTypes.string,
    content: PropTypes.object
};

export default BlogPostBody;
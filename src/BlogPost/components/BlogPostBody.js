import React from 'react';
import PropTypes from 'prop-types';
import draftJsToHtml from 'draftjs-to-html';
import Typography from '@material-ui/core/Typography';
import blogPostBodyStyle from './BlogPostBody.css';

class BlogPostBody extends React.Component {
    render() {
        const {content, title} = this.props;

        return <div>
            {title && <Typography variant="headline">
                {title}
            </Typography>}
            <div className="blogPostBody"
                 dangerouslySetInnerHTML={{__html: draftJsToHtml(content)}}
            />
        </div>
    }
}

BlogPostBody.propTypes = {
    title: PropTypes.string,
    content: PropTypes.object
};

export default BlogPostBody;
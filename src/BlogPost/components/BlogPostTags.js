import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

class BlogPostTags extends React.Component {
    render() {
        const {tags} = this.props;

        return (
            <Typography variant="body1"
                        color="primary"
            >
                {tags.map(tag => (
                    <a href="#"
                       style={{
                           color: 'inherit',
                           marginRight: 5
                       }}
                    >
                        #{tag.name}
                    </a>
                ))}
            </Typography>
        )
    }
}

BlogPostTags.propTypes = {
    tags: PropTypes.array
};

export default BlogPostTags;
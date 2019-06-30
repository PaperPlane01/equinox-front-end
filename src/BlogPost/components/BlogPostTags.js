import React from "react";
import PropTypes from "prop-types";
import {observer, inject} from "mobx-react";
import {Link} from "mobx-router";
import Typography from "@material-ui/core/Typography";
import views from "../../router-config";

@inject('store')
@observer
class BlogPostTags extends React.Component {
    render() {
        const {tags, store} = this.props;

        return (
            <Typography variant="body1"
                        color="primary"
            >
                {tags.map(tag => (
                    <Link store={store}
                          view={views.search}
                          queryParams={{tags: tag.name}}
                          style={{
                              color: 'inherit',
                              marginRight: 5
                          }}
                    >
                        #{tag.name}
                    </Link>
                ))}
            </Typography>
        )
    }
}

BlogPostTags.propTypes = {
    tags: PropTypes.array,
    store: PropTypes.object
};

export default BlogPostTags;
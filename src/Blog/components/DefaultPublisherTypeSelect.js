import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import {withLocale} from "../../localization";

@withLocale
class DefaultPublisherTypeSelect extends React.Component {
    render() {
        const {value, onChange, l} = this.props;

        return <div>
            <InputLabel htmlFor="defaultPublisherTypeSelect">{l('defaultPublisherType')}</InputLabel>
            <Select value={value}
                    onChange={onChange}
                    fullWidth
                    inputProps={{
                        name: 'defaultPublisherType',
                        margin: "dense"
                    }}
            >
                <MenuItem value="BLOG">
                    {l('defaultPublisherType_blog')}
                </MenuItem>
                <MenuItem value="BLOG_POST_AUTHOR">
                    {l('defaultPublisherType_blogPostAuthor')}
                </MenuItem>
            </Select>
        </div>
    }
}

DefaultPublisherTypeSelect.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    l: PropTypes.func
};

export default DefaultPublisherTypeSelect;
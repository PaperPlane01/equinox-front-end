import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {withLocale} from "../../localization";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

@withLocale
class BlogManagersVisibilityLevelSelect extends React.Component {
    render() {
        const {onChange, l, value} = this.props;

        return <div>
            <InputLabel htmlFor="blogManagersVisibilityLevelSelect">{l('blogManagersVisibilityLevel')}</InputLabel>
            <Select value={value}
                    onChange={onChange}
                    fullWidth
                    inputProps={{
                        name: 'blogManagersVisibilityLevelSelect',
                        margin: "dense"
                    }}
            >
                <MenuItem value="PUBLIC">
                    {l('public')}
                </MenuItem>
                <MenuItem value="REGISTERED_USERS">
                    {l('registeredUsers')}
                </MenuItem>
                <MenuItem value="SUBSCRIBERS">
                    {l('blogManagersVisibilityLevel_subscribers')}
                </MenuItem>
                <MenuItem value="MANAGERS">
                    {l('managers')}
                </MenuItem>
                <MenuItem value="OWNER">
                    {l('blogManagersVisibilityLevel_owner')}
                </MenuItem>
            </Select>
        </div>
    }
}

BlogManagersVisibilityLevelSelect.propTypes = {
    onChange: PropTypes.func,
    l: PropTypes.func,
    value: PropTypes.string
};

export default BlogManagersVisibilityLevelSelect;

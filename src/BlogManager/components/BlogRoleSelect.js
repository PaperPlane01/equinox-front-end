import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import {withLocale} from "../../localization/index";

@withLocale
class BlogRoleSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tooltipOpen: false
        }
    };

    handleTooltipOpen = tooltipOpen => {
        this.setState({tooltipOpen});
    };

    handleChange = value => {
        const {onChange} = this.props;

        if (onChange) {
            onChange(value);
        }
    };

    render() {
        const {l, value} = this.props;
        return <div>
            <InputLabel htmlFor="blogRoleSelect">
                {l('userRole')}
            </InputLabel>
            <Tooltip title={value === "EDITOR"
                ? l('blogRoleDescription_editor')
                : l('blogRoleDescription_moderator')
            }
                     open={this.state.tooltipOpen}
            >
                <Select inputProps={{
                    name: 'blogRoleSelect'
                }}
                        onChange={event => this.handleChange(event.target.value)}
                        fullWidth
                        value={value}
                        onMouseEnter={() => this.handleTooltipOpen(true)}
                        onMouseLeave={() => this.handleTooltipOpen(false)}
                >
                    <MenuItem value="EDITOR">
                        {l('editor')}
                    </MenuItem>
                    <MenuItem value="MODERATOR">
                        {l('moderator')}
                    </MenuItem>
                </Select>
            </Tooltip>
        </div>
    }
}

BlogRoleSelect.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    l: PropTypes.func
};

export default BlogRoleSelect;
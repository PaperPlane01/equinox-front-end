import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ReportIcon from '@material-ui/icons/Report';
import {withLocale} from "../localization";

@withLocale
class ReportMenuItem extends React.Component {
    render() {
        const {l, onClick} = this.props;

        return <MenuItem onClick={onClick}>
            <ListItemIcon>
                <ReportIcon/>
            </ListItemIcon>
            <ListItemText>
                {l('report')}
            </ListItemText>
        </MenuItem>
    }
}

ReportMenuItem.propTypes = {
    onClick: PropTypes.func,
    l: PropTypes.func
};

export default ReportMenuItem;
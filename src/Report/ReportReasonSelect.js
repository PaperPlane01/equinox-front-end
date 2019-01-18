import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import {ReportReason} from "./index";
import {withLocale} from "../localization";

@withLocale
class ReportReasonSelect extends React.Component {

    render() {
        const {value, onChange, l} = this.props;

        return <div>
            <InputLabel htmlFor="reportReasonSelect">
                {l('reason')}
            </InputLabel>
            <Select value={value && value}
                    onChange={event => onChange && onChange(event.target.value)}
                    fullWidth
                    InputProps={{
                        name: 'reportReasonSelect',
                        margin: 'dense'
                    }}
            >
                <MenuItem value={ReportReason.ABUSIVE_CONTENT}>
                    {l('abusiveContent')}
                </MenuItem>
                <MenuItem value={ReportReason.FLOOD}>
                    {l('flood')}
                </MenuItem>
                <MenuItem value={ReportReason.ILLEGAL_CONTENT}>
                    {l('illegalContent')}
                </MenuItem>
                <MenuItem value={ReportReason.SHOCK_CONTENT}>
                    {l('shockContent')}
                </MenuItem>
                <MenuItem value={ReportReason.SPAM}>
                    {l('spam')}
                </MenuItem>
                <MenuItem value={ReportReason.WEBSITE_RULES_VIOLATION}>
                    {l('websiteRulesViolation')}
                </MenuItem>
            </Select>
        </div>
    }
}

ReportReasonSelect.propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.string,
    l: PropTypes.func
};

export default ReportReasonSelect;
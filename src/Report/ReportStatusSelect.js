import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import {ReportStatus} from "./index";
import {withLocale} from "../localization";

@withLocale
class ReportStatusSelect extends React.Component {
    render() {
        const {value, onChange, l, error} = this.props;

        return <div>
            <InputLabel htmlFor="reportStatusSelect">
                {l('reportStatus')}
            </InputLabel>
            <Select value={value && value}
                    onChange={event => onChange && onChange(event.target.value)}
                    fullWidth
                    InputProps={{
                        id: 'reportStatusSelect',
                        margin: 'dense'
                    }}
            >
                <MenuItem value={ReportStatus.ACCEPTED}>
                    {l('accepted')}
                </MenuItem>
                <MenuItem value={ReportStatus.DECLINED}>
                    {l('declined')}
                </MenuItem>
                <MenuItem value={ReportStatus.NOT_VIEWED}>
                    {l('notViewed')}
                </MenuItem>
            </Select>
            {error && <FormHelperText style={{color: 'red'}}>{l(error)}</FormHelperText>}
        </div>
    }
}

ReportStatusSelect.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    l: PropTypes.func
};

export default ReportStatusSelect;
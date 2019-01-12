import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import CheckBox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {withLocale} from "../../localization";

@withLocale
@inject('globalBlockingsStore')
@observer
class NotEndedBlockingsOnlyCheckBox extends React.Component {
    render() {
        const {globalBlockingsStore, l} = this.props;
        const {includeNotEndedOnly} = globalBlockingsStore;
        
        return <FormControlLabel control={
            <CheckBox checked={includeNotEndedOnly}
                      onChange={event => globalBlockingsStore.setIncludeNotEndedOnly(event.target.checked)}
            />
        }
                                 label={l('includeNotEndedBlockingsOnly')}
        />
    }
}

NotEndedBlockingsOnlyCheckBox.propTypes = {
    globalBlockingsStore: PropTypes.object,
    l: PropTypes.func
};

export default NotEndedBlockingsOnlyCheckBox;


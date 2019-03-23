import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from "mobx-react";
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import UndoIcon from '@material-ui/icons/Undo';
import {withLocale} from "../../localization";

@withLocale
@inject('rejectSelectedBlogPostReportsStore')
@observer
class RejectBlogPostReportsButton extends React.Component {
    render() {
        const {l, rejectSelectedBlogPostReportsStore} = this.props;

        return (
            <BottomNavigationAction label={l('rejectReports')}
                                    showLabel
                                    icon={<UndoIcon/>}
                                    onClick={rejectSelectedBlogPostReportsStore.rejectBlogPostReports}
            />
        )
    }
}

RejectBlogPostReportsButton.propTypes = {
    l: PropTypes.func,
    rejectSelectedBlogPostReportsStore: PropTypes.object
};

export default RejectBlogPostReportsButton;
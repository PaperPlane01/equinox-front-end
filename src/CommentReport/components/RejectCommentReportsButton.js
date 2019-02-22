import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import UndoIcon from '@material-ui/icons/Undo';
import {withLocale} from "../../localization";

@withLocale
@inject('rejectSelectedCommentReportsStore')
@observer
class RejectCommentReportsButton extends React.Component {
    render() {
        const {l, rejectSelectedCommentReportsStore} = this.props;

        return (
            <BottomNavigationAction label={l('rejectReports')}
                                    icon={<UndoIcon color="primary"/>}
                                    showLabel
                                    onClick={rejectSelectedCommentReportsStore.rejectCommentReports}
            />
        )
    }
}

RejectCommentReportsButton.propTypes = {
    l: PropTypes.func,
    rejectSelectedCommentReportsStore: PropTypes.object
};

export default RejectCommentReportsButton;
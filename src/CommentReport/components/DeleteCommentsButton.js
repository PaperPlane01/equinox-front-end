import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DeleteIcon from '@material-ui/icons/Delete';
import {withLocale} from "../../localization";

@withLocale
@inject('deleteSelectedReportedCommentsStore')
@observer
class DeleteCommentsButton extends React.Component {
    render() {
        const {l, deleteSelectedReportedCommentsStore} = this.props;

        return (
            <BottomNavigationAction label={l('deleteComments')}
                                    icon={<DeleteIcon color="primary"/>}
                                    showLabel
                                    onClick={deleteSelectedReportedCommentsStore.deleteComments}
            />
        )
    }
}

DeleteCommentsButton.propTypes = {
    l: PropTypes.func,
    deleteSelectedReportedCommentsStore: PropTypes.object
};

export default DeleteCommentsButton;
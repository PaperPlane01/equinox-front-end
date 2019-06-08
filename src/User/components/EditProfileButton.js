import React from "react";
import PropTypes from "prop-types";
import {inject, observer} from "mobx-react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import views from "../../router-config";

@inject('store')
@observer
class EditProfileButton extends React.Component {
    render() {
        const {router} = this.props.store;

        return (
            <IconButton>
                <EditIcon onClick={() => router.goTo(views.editProfile)}/>
            </IconButton>
        )
    }
}

EditProfileButton.propTypes = {
    store: PropTypes.object
};

export default EditProfileButton;
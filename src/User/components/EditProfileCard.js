import React from "react";
import PropTypes from "prop-types";
import {inject, observer} from "mobx-react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import EditProfileGeneralInfoForm from "./EditProfileGeneralInfoForm";
import UpdateEmailForm from "./UpdateEmailForm";
import views from "../../router-config";
import {withLocale} from "../../localization";

@withLocale
@inject('store')
@inject('editProfileStore')
@observer
class EditProfileCard extends React.Component {
    render() {
        const {store, editProfileStore, l} = this.props;
        const {tabs, selectedTab} = editProfileStore;

        let selectedTabIndex = tabs.indexOf(selectedTab);

        if (selectedTabIndex === -1) {
            selectedTabIndex = 0;
        }

        return (
            <Card>
                <CardContent>
                    <React.Fragment>
                        <Tabs value={selectedTabIndex}>
                            <Tab label={l('generalInfo')}
                                 onClick={() => store.router.goTo(views.editProfile, {}, store, {tab: 'generalInfo'})}
                            />
                            <Tab label={l('changeEmail')}
                                 onClick={() => store.router.goTo(views.editProfile, {}, store, {tab: 'email'})}
                            />
                        </Tabs>
                        {selectedTab === 'generalInfo' && <EditProfileGeneralInfoForm/>}
                        {selectedTab === 'email' && <UpdateEmailForm/>}
                    </React.Fragment>
                </CardContent>
            </Card>
        )
    }
}

EditProfileCard.propTypes = {
    tabs: PropTypes.array,
    selectedTab: PropTypes.string,
    store: PropTypes.object,
    editProfileStore: PropTypes.object,
    l: PropTypes.func
};

export default EditProfileCard;
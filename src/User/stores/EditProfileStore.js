import {action, observable, reaction} from "mobx";
import {Component} from "../../simple-ioc";

@Component({
    dependencies: [
        {propertyName: 'editProfileGeneralInfoStore'},
        {propertyName: 'updateEmailStore'}
    ]
})
class EditProfileStore {
    @observable
    tabs = [
        'generalInfo',
        'email'
    ];

    @observable
    selectedTab = undefined;

    @observable
    editProfileGeneralInfoStore = {};

    @observable
    updateEmailStore = {};

    constructor() {
        reaction(
            () => this.selectedTab,
            tab => {
                console.log(tab);
                switch (tab) {
                    case 'generalInfo':
                        this.editProfileGeneralInfoStore.fetchCurrentUserProfile();
                        break;
                    case 'email':
                        this.updateEmailStore.fetchEmail();
                        break;
                }
            }
        )
    }

    @action
    setSelectedTab = selectedTab => {
        console.log(selectedTab);
        if (this.tabs.includes(selectedTab)) {
            this.selectedTab = selectedTab;
        } else {
            this.selectedTab = 'generalInfo';
        }
    }
}

export default EditProfileStore;
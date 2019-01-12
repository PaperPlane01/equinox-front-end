import React from 'react';
import {observer, inject} from 'mobx-react';

export default WrappedComponent => {
    return @inject('appBarStore')
    @observer class CloseDrawerOnClick extends React.Component {
        closeDrawer = () => {
            this.props.appBarStore.setDrawerOpened(false);
        };

        render() {
            return <WrappedComponent closeDrawer={this.closeDrawer}
                                     {...this.props}
            />
        }
    }
}
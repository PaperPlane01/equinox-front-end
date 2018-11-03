import React from 'react';
import {observer, inject} from 'mobx-react';
import {replace} from "./utils";

export default WrappedComponent => {
    return @inject('localeStore')
    @observer
    class WithLocale extends React.Component {
        getLabel = (labelKey, labelBindings) => {
            const {localeStore} = this.props;

            if (!labelKey) {
                return "";
            }

            let label = localeStore.currentTranslations[labelKey];

            if (!label) {
                return "";
            }

            if (labelBindings) {
                label = replace(label, labelBindings)
            }

            return label;
        };

        render() {
            const {localeStore} = this.props;

            return <WrappedComponent l={this.getLabel}
                                     currentLocale={localeStore.currentLocale}
                                     {...this.props}
            />
        }
    }
};
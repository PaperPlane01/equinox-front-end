import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import {withLocale} from "../../localization";

@withLocale
@inject('localeStore')
@inject('settingsDialogStore')
@observer
class SettingsDialog extends React.Component {
    render() {
        const {l, localeStore, settingsDialogStore, fullScreen} = this.props;
        const {open} = settingsDialogStore;

        if (open) {
            return <Dialog open={open}
                           onClose={() => settingsDialogStore.setOpen(false)}
                           fullScreen={fullScreen}
            >
                <DialogTitle>
                    {l('settings')}
                </DialogTitle>
                <DialogContent>
                    <InputLabel htmlFor="language">{l('language')}</InputLabel>
                    <Select value={localeStore.currentLocale}
                            onChange={event => localeStore.setLocale(event.target.value)}
                            fullWidth
                            inputProps={{
                                name: 'language'
                            }}
                    >
                        <MenuItem value="en">
                            {l('englishLanguage')}
                        </MenuItem>
                        <MenuItem value="ru">
                            {l('russianLanguage')}
                        </MenuItem>
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined"
                            color="secondary"
                            onClick={() => settingsDialogStore.setOpen(false)}
                    >
                        {l('close')}
                    </Button>
                </DialogActions>
            </Dialog>
        } else {
            return null;
        }
    }
}

SettingsDialog.propTypes = {
    l: PropTypes.func,
    localeStore: PropTypes.object,
    settingsDialogStore: PropTypes.object,
    fullScreen: PropTypes.bool
};

export default withMobileDialog()(SettingsDialog);
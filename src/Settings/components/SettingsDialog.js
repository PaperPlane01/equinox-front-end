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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import {withLocale} from "../../localization";

@withLocale
@inject('localeStore')
@inject('settingsStore')
@observer
class SettingsDialog extends React.Component {
    render() {
        const {l, localeStore, settingsStore, fullScreen} = this.props;
        const {settingsDialogOpened, colorTheme, useWebSocketForNotifications} = settingsStore;

        if (settingsDialogOpened) {
            return <Dialog open={settingsDialogOpened}
                           onClose={() => settingsStore.setSettingsDialogOpened(false)}
                           fullScreen={fullScreen}
            >
                <DialogTitle>
                    {l('settings')}
                </DialogTitle>
                <DialogContent>
                    <InputLabel htmlFor="languageSelect">{l('language')}</InputLabel>
                    <Select value={localeStore.currentLocale}
                            onChange={event => localeStore.setLocale(event.target.value)}
                            fullWidth
                            inputProps={{
                                name: 'languageSelect'
                            }}
                    >
                        <MenuItem value="en">
                            {l('englishLanguage')}
                        </MenuItem>
                        <MenuItem value="ru">
                            {l('russianLanguage')}
                        </MenuItem>
                    </Select>
                    <InputLabel htmlFor="colorThemeSelect">{l('colorTheme')}</InputLabel>
                    <Select value={colorTheme}
                            onChange={event => settingsStore.setColorTheme(event.target.value)}
                            fullWidth
                            inputProps={{
                                name: 'colorThemeSelect'
                            }}
                    >
                        <MenuItem value="pink">
                            {l('pink')}
                        </MenuItem>
                        <MenuItem value="green">
                            {l('green')}
                        </MenuItem>
                        <MenuItem value="yellow">
                            {l('yellow')}
                        </MenuItem>
                    </Select>
                    <FormControlLabel control={<Switch checked={useWebSocketForNotifications}
                                                       onChange={event => settingsStore.setUseWebSocketForNotifications(event.target.checked)}
                                                       color="primary"
                    />}
                                      label={l('useWebSocketForNotifications')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined"
                            color="secondary"
                            onClick={() => settingsStore.setSettingsDialogOpened(false)}
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
    settingsStore: PropTypes.object,
    fullScreen: PropTypes.bool
};

export default withMobileDialog()(SettingsDialog);
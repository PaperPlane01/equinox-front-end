import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import {DateTimePicker} from 'material-ui-pickers';
import {withLocale} from "../../localization";

@withLocale
@inject('blockSelectedCommentsAuthorsStore')
@observer
class BlockSelectedCommentsAuthorsDialog extends React.Component {
    render() {
        const {blockSelectedCommentsAuthorsStore, l, fullScreen} = this.props;
        const {globalBlockingForm, globalBlockingFormErrors, submitting,
            globalBlockingDialogOpen} = blockSelectedCommentsAuthorsStore;

        return (
            <Dialog open={globalBlockingDialogOpen}
                    fullScreen={fullScreen}
                    onClose={() => blockSelectedCommentsAuthorsStore.setGlobalBlockingDialogOpen(false)}

            >
                <DialogTitle>
                    {l('blockCommentAuthors')}
                </DialogTitle>
                <DialogContent>
                    <TextField value={globalBlockingForm.reason}
                               onChange={({target}) =>
                                   blockSelectedCommentsAuthorsStore.setGlobalBlockingFormValue(target.value, 'reason')}
                               label={l('reason')}
                               margin="dense"
                               error={Boolean(globalBlockingFormErrors.reason)}
                               helperText={globalBlockingFormErrors.reason && l(globalBlockingFormErrors.reason)}
                               fullWidth
                    />
                    <DateTimePicker value={globalBlockingForm.endDate}
                                    onChange={date => blockSelectedCommentsAuthorsStore.setGlobalBlockingFormValue(date, 'endDate')}
                                    disablePast
                                    canclelLabel={l('cancel')}
                                    label={l('blockingEndDate')}
                                    openToYearSelection
                                    fullWidth
                                    format="DD-MM-YYYY hh:mm:ss"
                                    clearable
                                    clearLabel={l('clear')}
                                    autoOk
                    />
                </DialogContent>
                <DialogActions>
                    {submitting && <CircularProgress size={15} color="primary"/>}
                    <Button variant="contained"
                            color="primary"
                            onClick={blockSelectedCommentsAuthorsStore.blockSelectedCommentsAuthors}
                    >
                        {l('block')}
                    </Button>
                    <Button variant="outlined"
                            color="secondary"
                            onClick={() => blockSelectedCommentsAuthorsStore.setGlobalBlockingDialogOpen(false)}
                    >
                        {l('cancel')}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

BlockSelectedCommentsAuthorsDialog.propTypes = {
    blockSelectedCommentsAuthorsStore: PropTypes.object,
    l: PropTypes.func,
    fullScreen: PropTypes.bool
};

export default withMobileDialog()(BlockSelectedCommentsAuthorsDialog);
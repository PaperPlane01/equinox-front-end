import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from "mobx-react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import {DateTimePicker} from "material-ui-pickers";
import {withLocale} from "../../localization";

@withLocale
@inject('blockSelectedBlogPostsAuthorsStore')
@observer
class BlockSelectedBlogPostsAuthorsDialog extends React.Component {
    render() {
        const {blockSelectedBlogPostsAuthorsStore, l, fullScreen} = this.props;
        const {globalBlockingForm, globalBlockingFormErrors, submitting,
            globalBlockingDialogOpen} = blockSelectedBlogPostsAuthorsStore;

        return (
            <Dialog open={globalBlockingDialogOpen}
                    fullScreen={fullScreen}
                    onClose={() => blockSelectedBlogPostsAuthorsStore.setGlobalBlockingDialogOpen(false)}
            >
                <DialogTitle>
                    {l('blockBlogPostsAuthors')}
                </DialogTitle>
                <DialogContent>
                    <TextField value={globalBlockingForm.reason}
                               onChange={({target}) =>
                                   blockSelectedBlogPostsAuthorsStore.setGlobalBlockingFormValue(target.value, 'reason')}
                               label={l('reason')}
                               margin="dense"
                               error={Boolean(globalBlockingFormErrors.reason)}
                               helperText={globalBlockingFormErrors.reason && l(globalBlockingFormErrors.reason)}
                               fullWidth
                    />
                    <DateTimePicker value={globalBlockingForm.endDate}
                                    onChange={date =>
                                        blockSelectedBlogPostsAuthorsStore.setGlobalBlockingFormValue(date, 'endDate')}
                                    disablePast
                                    cancelLabel={l('cancel')}
                                    label={l('blockingEndDate')}
                                    openToYearSelection
                                    fullWidth
                                    format="dd-MM-YYYY hh:mm:ss"
                                    clearable
                                    clearLabel={l('clear')}
                                    autoOk
                    />
                </DialogContent>
                <DialogActions>
                    {submitting && <CircularProgress size={15} color="primary"/>}
                    <Button variant="contained"
                            color="primary"
                            onClick={blockSelectedBlogPostsAuthorsStore.blockSelectedBlogPostsAuthors}
                    >
                        {l('block')}
                    </Button>
                    <Button variant="contained"
                            color="primary"
                            onClick={() => blockSelectedBlogPostsAuthorsStore.setGlobalBlockingDialogOpen(false)}
                    >
                        {l('cancel')}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

BlockSelectedBlogPostsAuthorsDialog.propTypes = {
    blockSelectedBlogPostsAuthorsStore: PropTypes.object,
    l: PropTypes.func,
    fullScreen: PropTypes.bool
};

export default withMobileDialog()(BlockSelectedBlogPostsAuthorsDialog);


import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import BlockedGloballyUserUsernameInput from './BlockedGloballyUserUsernameInput';
import NotEndedBlockingsOnlyCheckBox from './NotEndedBlockingsOnlyCheckBox';
import GlobalBlockingsListItem from './GlobalBlockingsListItem';
import LoadMoreGlobalBlockingsButton from './LoadMoreGlobalBlockingsButton';
import {withLocale} from "../../localization";

@withLocale
@inject('globalBlockingsStore')
@observer
class GlobalBlockingsList extends React.Component {
    render() {
        const {l, globalBlockingsStore} = this.props;
        const {pending, error, globalBlockings} = globalBlockingsStore;

        console.log(globalBlockings);

        if (error) {
            return <Typography variant="headline">
                {l('errorWhenAttemptedToFetchGlobalBlockings', {errorStatus: error.status})}
            </Typography>
        }

        return <Card>
            <CardHeader title={l('globalBlockings')}/>
            <CardContent>
                <BlockedGloballyUserUsernameInput/>
                <NotEndedBlockingsOnlyCheckBox/>
                {globalBlockings.map(globalBlocking => (<GlobalBlockingsListItem globalBlocking={globalBlocking}/>))}
                <br/>
                <LoadMoreGlobalBlockingsButton/>
                {pending && <CircularProgress color="primary"
                                              size={50}
                                              style={{
                                                  marginLeft: 'calc(50% - 50px)',
                                              }}
                />}
            </CardContent>
        </Card>
    }
}

GlobalBlockingsList.propTypes = {
    globalBlockingsStore: PropTypes.object,
    l: PropTypes.func
};

export default GlobalBlockingsList;
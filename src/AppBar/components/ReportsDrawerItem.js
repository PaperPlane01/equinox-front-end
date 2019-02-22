import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ReportIcon from '@material-ui/icons/Report';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import CommentReportsDrawerItem from './CommentReportsDrawerItem';
import {withLocale} from "../../localization";

@withLocale
@inject('appBarStore')
@observer
class ReportsDrawerItem extends React.Component {
    render() {
        const {appBarStore, l} = this.props;
        const {reportsOpened} = appBarStore;

        return (
            <div>
                <ListItem button
                          onClick={() => appBarStore.setReportsOpened(!reportsOpened)}
                >
                    <ListItemIcon>
                        <ReportIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        {l('reports')}
                    </ListItemText>
                    {reportsOpened ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                </ListItem>
                <Collapse in={reportsOpened}
                          timeout="auto"
                          unmountOnExit
                >
                    <List component="div" style={{paddingLeft: '16px'}}>
                        <CommentReportsDrawerItem/>
                    </List>
                </Collapse>
            </div>
        )
    }
}

ReportsDrawerItem.propTypes = {
    appBarStore: PropTypes.object,
    l: PropTypes.func
};

export default ReportsDrawerItem;

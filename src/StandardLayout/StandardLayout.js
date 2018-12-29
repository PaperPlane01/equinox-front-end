import React from 'react';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

export default class StandardLayout extends React.Component {
    render() {
        const {children} = this.props;
        return <Grid container>
            <Hidden mdUp>
                <Grid item xs={12}>
                    <div style={{
                        marginLeft: '2.08333333334%',
                        marginRight: '2.08333333334%',
                    }}>
                        {children}
                    </div>
                </Grid>
            </Hidden>
            <Hidden smDown>
                <Grid item lg={2}/>
                <Grid item xs={10} lg={8}>
                    {children}
                </Grid>
            </Hidden>
        </Grid>
    }
}
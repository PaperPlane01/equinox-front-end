import React from 'react';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import createStyles from "@material-ui/core/styles/createStyles"

const styles = createStyles({
    standardLayout: {
        '@media screen and (max-width: 600px)': {
            maxWidth: '100%',
            paddingLeft: '2.08333333334%',
            paddingRight: '2.08333333334%'
        },
        '@media screen and (max-width: 900px)': {
            maxWidth: '100%',
            paddingLeft: '2.08333333334%',
            paddingRight: '2.08333333334%'
        },
        marginTop: 16
    }
});

class StandardLayout extends React.Component {
    render() {
        const {children, classes} = this.props;
        return (
            <Grid container className={classes.standardLayout}>
                <Grid item md={2}/>
                <Grid item xs={12} md={8}>
                    {children}
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(StandardLayout);
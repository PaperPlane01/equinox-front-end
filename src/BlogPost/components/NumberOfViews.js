import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Typography from '@material-ui/core/Typography';

class NumberOfViews extends React.Component {
    render() {
        const {numberOfViews} = this.props;

        return <IconButton color="primary">
            <VisibilityIcon/>
            <Typography variant="body1" color="primary">
                {numberOfViews}
            </Typography>
        </IconButton>
    }
}

NumberOfViews.propTypes = {
    numberOfViews: PropTypes.number
};

export default NumberOfViews;
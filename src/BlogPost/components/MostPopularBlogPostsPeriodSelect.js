import React from 'react';
import PropTypes from 'prop-types';
import {inject, observer} from 'mobx-react'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import MostPopularBlogPostsPeriod from '../MostPopularBlogPostsPeriod';
import {withLocale} from "../../localization";

@withLocale
@inject('mostPopularBlogPostsStore')
@observer
class MostPopularBlogPostsPeriodSelect extends React.Component {
    render() {
        const {l, mostPopularBlogPostsStore} = this.props;
        const {period} = mostPopularBlogPostsStore;

        return <div>
            <InputLabel htmlFor="mostPopularBlogPostsPeriodSelect"/>
            <Select value={period}
                    onChange={event => mostPopularBlogPostsStore.setPeriod(event.target.value)}
                    inputProps={{
                        name: 'mostPopularBlogPostsPeriodSelect',
                        margin: 'dense'
                    }}
            >
                <MenuItem value={MostPopularBlogPostsPeriod.WEEK}>
                    {l('forWeek')}
                </MenuItem>
                <MenuItem value={MostPopularBlogPostsPeriod.MONTH}>
                    {l('forMonth')}
                </MenuItem>
                <MenuItem value={MostPopularBlogPostsPeriod.YEAR}>
                    {l('forYear')}
                </MenuItem>
            </Select>
        </div>
    }
}

MostPopularBlogPostsPeriodSelect.propTypes = {
    l: PropTypes.func,
    mostPopularBlogPostsStore: PropTypes.object
};

export default MostPopularBlogPostsPeriodSelect;
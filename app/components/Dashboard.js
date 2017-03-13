import React from 'react';
import { Card } from 'semantic-ui-react';

import PieChart from './Chart/PieChart';
import ColumnChart from './Chart/ColumnChart';

export default class Dashboard extends React.Component {
    render() {
        return (
            <div id="dashboard">
                <div class="ui card fluid">
                    <div class="content">
                        <div class="header">Category Chart</div>
                    </div>
                    <div class="content">
                        <PieChart data={this.props.categories} getCategories={this.props.getCategories}/>
                    </div>
                </div>
                <div class="ui card fluid">
                    <div class="content">
                        <div class="card-header">
                            Yearly report
                        </div>
                    </div>
                    <div class="content">
                        <ColumnChart data={this.props.itemCountsPerYear} fetchItemCountsByYearRange={this.props.fetchItemCountsByYearRange}/>
                    </div>
                </div>
            </div>
        );
    }
}

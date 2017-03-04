import React from 'react';

import PieChart from './Chart/PieChart';
import ColumnChart from './Chart/ColumnChart';

export default class Dashboard extends React.Component {
    render() {
        return (
            <div>
                <div class="card">
                    <div class="card-header">
                        Category Chart
                    </div>
                    <div class="card-block">
                        <PieChart data={this.props.categoryPieChartData} getCategories={this.props.getCategories}/>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        Yearly report
                    </div>
                    <div class="card-block">
                        <ColumnChart data={this.props.categoryColumnChartData} getCategories={this.props.getCategories}/>
                    </div>
                </div>
            </div>
        );
    }
}

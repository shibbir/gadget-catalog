import React from 'react';
import { Card, Icon } from 'semantic-ui-react';

import PieChart from './Chart/PieChart';
import ColumnChart from './Chart/ColumnChart';

export default class Dashboard extends React.Component {
    render() {
        return (
            <div id="dashboard">
                <div className="ui raised card fluid">
                    <div className="content">
                        <div className="card-header">
                            <Icon name="pie chart"/>
                            Category Chart
                        </div>
                    </div>
                    <div className="content">
                        <PieChart data={this.props.categories} getCategories={this.props.getCategories}/>
                    </div>
                </div>
                <div className="ui raised card fluid">
                    <div className="content">
                        <div className="card-header">
                            <Icon name="bar chart"/>
                            Yearly report
                        </div>
                    </div>
                    <div className="content">
                        <ColumnChart data={this.props.itemCountsPerYear} fetchItemCountsByYearRange={this.props.fetchItemCountsByYearRange}/>
                    </div>
                </div>
            </div>
        );
    }
}

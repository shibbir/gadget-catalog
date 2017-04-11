import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import PieChart from './Chart/PieChart';
import ColumnChart from './Chart/ColumnChart';

export default class Dashboard extends React.Component {
    render() {
        return (
            <div id="dashboard">
                <Card raised fluid>
                    <Card.Content>
                        <Card.Header>
                            <Icon name="pie chart"/>
                            Category Chart
                        </Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <PieChart data={this.props.categories} getCategories={this.props.getCategories}/>
                    </Card.Content>
                </Card>
                <Card raised fluid>
                    <Card.Content>
                        <Card.Header>
                            <Icon name="bar chart"/>
                            Yearly report
                        </Card.Header>
                    </Card.Content>
                    <Card.Content>
                        <ColumnChart data={this.props.itemCountsPerYear} fetchItemCountsByYearRange={this.props.fetchItemCountsByYearRange}/>
                    </Card.Content>
                </Card>
            </div>
        );
    }
}

import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import PieChart from '../../shared/components/Chart/PieChart';
import ColumnChart from '../../shared/components/Chart/ColumnChart';

export default class Dashboard extends React.Component {
    constructor(props) {
        super();

        props.getCategories();
    }

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
                        <PieChart data={this.props.categories} />
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
                        <ColumnChart data={this.props.itemsPerYear} getData={this.props.fetchItemsByYearRange}/>
                    </Card.Content>
                </Card>
            </div>
        );
    }
}

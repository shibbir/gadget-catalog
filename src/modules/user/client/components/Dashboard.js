import React from "react";
import { Card, Icon } from "semantic-ui-react";
import ColumnChart from "../../../item/client/components/ColumnChart";
import CategoryPieChart from "../../../category/client/components/CategoryPieChart";

export default function Dashboard() {
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
                    <CategoryPieChart/>
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
                    <ColumnChart/>
                </Card.Content>
            </Card>
        </div>
    );
}

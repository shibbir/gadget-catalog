import React from "react";
import { Card, Icon } from "semantic-ui-react";

import ItemChart from "./ItemChart";
import CategoryChart from "./CategoryChart";

export default function Dashboard() {
    return (
        <div id="dashboard">
            <Card raised fluid>
                <Card.Content>
                    <Card.Header>
                        <Icon name="pie chart"/>
                        Category percentages
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <CategoryChart/>
                </Card.Content>
            </Card>

            <Card raised fluid>
                <Card.Content>
                    <Card.Header>
                        <Icon name="bar chart"/>
                        Yearly report on purchased items
                    </Card.Header>
                </Card.Content>
                <Card.Content>
                    <ItemChart/>
                </Card.Content>
            </Card>
        </div>
    );
}

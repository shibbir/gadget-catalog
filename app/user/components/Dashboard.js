import React from "react";
import { connect } from "react-redux";
import { Card, Icon } from "semantic-ui-react";
import { getCategories } from "../../category/category.actions";
import { fetchItemsByYearRange } from "../../item/item.actions";
import PieChart from "../../shared/components/Chart/PieChart";
import ColumnChart from "../../shared/components/Chart/ColumnChart";

class Dashboard extends React.Component {
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
                        <PieChart data={this.props.categories} getData={this.props.getCategories}/>
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

const mapStateToProps = (state) => {
    return {
        categories: state.dashboardReducer.categories,
        itemsPerYear: state.dashboardReducer.itemsPerYear
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => {
            dispatch(getCategories());
        },
        fetchItemsByYearRange: (yearRange) => {
            dispatch(fetchItemsByYearRange(yearRange));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

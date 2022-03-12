import Highcharts from "highcharts";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Icon, Segment, Header, Button } from "semantic-ui-react";

import { getCategories } from "../../../category/client/category.actions";

export default function CategoryChart() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch]);

    const categories = useSelector(state => state.categoryReducer.categories);

    useEffect(() => {
        if(categories.length) {
            let data = [];

            categories.forEach(o => {
                if(o.items && o.items.length) {
                    data.push({
                        name: o.name,
                        y: o.items.length
                    });
                } else {
                    data.push({
                        name: o.name,
                        y: 0
                    });
                }
            });

            Highcharts.chart("category-chart", {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: "Gadget Categories"
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: "pointer",
                        dataLabels: {
                            enabled: true
                        },
                        showInLegend: true
                    }
                },
                series: [{
                    type: "pie",
                    name: "Categories",
                    colorByPoint: true,
                    data
                }],
                credits: {
                    enabled: false
                }
            });
        }
    }, [categories]);

    return (
        <>
            <div id="category-chart"></div>

            { !categories.length &&
                <Segment placeholder basic>
                    <Header icon>
                        <Icon name="warning sign"/>
                        Not enough data is available to generate this report.
                    </Header>
                    <Button primary>
                        <Link to="/items/add" style={{color: "white"}}>Add New Item</Link>
                    </Button>
                </Segment>
            }
        </>
    );
}

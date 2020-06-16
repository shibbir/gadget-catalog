import Highcharts from "highcharts";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select, Icon, Segment, Header, Button } from "semantic-ui-react";

import { fetchItemsByYearRange } from "../../../item/client/item.actions";

export default function ItemChart() {
    const options = [
        { key: "2011-2020", value: "2011-2020", text: "2011-2020" },
        { key: "2001-2010", value: "2001-2010", text: "2001-2010" }
    ];

    const [yearRange, setYearRange] = useState(`${new Date().getFullYear() - 9}-${new Date().getFullYear()}`);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchItemsByYearRange(yearRange));
    }, [dispatch, yearRange]);

    let years = [];
    let itemCounts = [];
    const itemsPerYear = useSelector(state => state.itemReducer.itemsPerYear);

    itemsPerYear.forEach(function(x) {
        years.push(x.year.toString());
        itemCounts.push(x.items);
    });

    if(itemCounts.length && years.length) {
        Highcharts.chart("item-chart", {
            chart: {
                type: "column"
            },
            title: {
                text: `Items purchased from (${yearRange})`
            },
            xAxis: {
                categories: years,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: "Number Of Items"
                },
                allowDecimals: false
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: "Total Items",
                data: itemCounts
            }],
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            }
        });
    }

    return (
        <>
            <Select onChange={(event, data) => {setYearRange(data.value)}} options={options} defaultValue={options[0].value}/>
            <div id="item-chart"></div>

            { !itemCounts.length &&
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

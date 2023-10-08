import { isEmpty } from "lodash";
import Highcharts from "highcharts";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select, Icon, Segment, Header } from "semantic-ui-react";

import { fetchItemsByYearRange } from "../../../item/client/item.actions";

export default function ItemChart() {
    const options = [
        { key: "2021-2030", value: "2021-2030", text: "2021-2030" },
        { key: "2011-2020", value: "2011-2020", text: "2011-2020" },
        { key: "2001-2010", value: "2001-2010", text: "2001-2010" }
    ];

    const [yearRange, setYearRange] = useState(`${new Date().getFullYear()}-${new Date().getFullYear() + 9}`);

    const dispatch = useDispatch();

    useEffect(() => {
        let startYear, endYear;
        [startYear, endYear] = yearRange.split("-");

        dispatch(fetchItemsByYearRange(startYear, endYear));
    }, [dispatch, yearRange]);

    const itemsPerYear = useSelector(state => state.itemReducer.itemsPerYear);

    useEffect(() => {
        let years = [];
        let items = [];

        for (const property in itemsPerYear) {
            years.push(property.toString());
            items.push(itemsPerYear[property]);
        }

        if(items.length && years.length) {
            Highcharts.chart("item-chart", {
                chart: {
                    type: "column"
                },
                title: {
                    text: `Items purchased between year (${yearRange})`
                },
                xAxis: {
                    categories: years,
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: "Number of Items"
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
                    data: items
                }],
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: false
                },
                accessibility: {
                    enabled: false
                }
            });
        }
    }, [itemsPerYear]);

    return (
        <>
            <Select onChange={(event, data) => {setYearRange(data.value)}} options={options} defaultValue={options[0].value}/>

            <div id="item-chart"></div>

            { isEmpty(itemsPerYear) &&
                <Segment placeholder basic>
                    <Header icon>
                        <Icon name="warning sign"/>
                        Not enough data is available to generate the report.
                    </Header>
                </Segment>
            }
        </>
    );
}

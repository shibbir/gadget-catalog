import React from 'react';
import Highcharts from 'highcharts';
import { Select } from 'semantic-ui-react';

export default class ColumnChart extends React.Component {
    constructor(props) {
        super();
        this.state = {
            yearRange: `${new Date().getFullYear() - 4}-${new Date().getFullYear()}`
        };

        props.getData(this.state.yearRange);
    }

    fetchItemsByYearRange(event, data) {
        if(this.state.yearRange !== data.value) {
            this.setState({ yearRange: data.value });
            this.props.getData(data.value);
        }
    }

    componentWillReceiveProps({ data } = props) {
        let years = [];
        let itemsPerYear = [];

        for(let key in data) {
            if (data.hasOwnProperty(key)) {
                years.push(key);
                itemsPerYear.push(data[key]);
            }
        }

        Highcharts.chart('columnChart', {
            chart: {
                type: 'column'
            },
            title: {
                text: `Yearly report (${this.state.yearRange})`
            },
            xAxis: {
                categories: years,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Number of items'
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
                name: 'Total items',
                data: itemsPerYear

            }],
            credits: {
	            enabled: false
	        },
            legend: {
                enabled: false
            }
        });
    }

    render() {
        const options = [
            { key: '2015-2019', value: '2015-2019', text: '2015-2019' },
            { key: '2010-2014', value: '2010-2014', text: '2010-2014' },
            { key: '2005-2009', value: '2005-2009', text: '2005-2009' }
        ];
        return (
            <div>
                <Select onChange={this.fetchItemsByYearRange.bind(this)} options={options} defaultValue={options[0].value}/>
                <div id="columnChart"></div>
            </div>
        );
    }
}

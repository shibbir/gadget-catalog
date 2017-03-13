import React from 'react';
import Highcharts from 'highcharts';
import { Select } from 'semantic-ui-react';

export default class ColumnChart extends React.Component {
    constructor(props) {
        super();
        const yearRange = `${new Date().getFullYear() - 5}-${new Date().getFullYear()}`;
        this.state = { yearRange };

        props.fetchItemCountsByYearRange(yearRange);
    }

    fetchItemCountsByYearRange(event, data) {
        this.setState({ yearRange: data.value });
        this.props.fetchItemCountsByYearRange(data.value);
    }

    componentWillReceiveProps({ data } = nextProps) {
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
            { key: '2012-2017', value: '2012-2017', text: '2012-2017' },
            { key: '2006-2011', value: '2006-2011', text: '2006-2011' },
            { key: '2000-2005', value: '2000-2005', text: '2000-2005' }
        ];
        return (
            <div>
                <Select onChange={this.fetchItemCountsByYearRange.bind(this)} options={options} defaultValue={options[0].value}/>
                <div id="columnChart"></div>
            </div>
        );
    }
}

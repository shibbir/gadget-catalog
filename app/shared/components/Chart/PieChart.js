import React from 'react';
import Highcharts from 'highcharts';

export default class PieChart extends React.Component {
    constructor(props) {
        super();
        props.getData();
    }

    componentWillReceiveProps(props) {
        let data = [];

        for(let idx = 0; idx < props.data.length; idx++) {
            data.push({
                name: props.data[idx].name,
                y: props.data[idx].items.length
            });
        }

        Highcharts.chart('pieChart', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Item categories'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true
                    },
                    showInLegend: true
                }
            },
            series: [{
                name: 'Categories',
                colorByPoint: true,
                data: data
            }],
            credits: {
	            enabled: false
	        }
        });
    }

    render() {
        return <div id="pieChart"></div>;
    }
}

import React from 'react';
import Highcharts from 'highcharts';

export default class PieChart extends React.Component {
    constructor(props) {
        super();
        props.getCategories();
    }

    componentWillReceiveProps(nextProps) {
        let data = [];

        for(let idx = 0; idx < nextProps.data.length; idx++) {
            data.push({
                name: nextProps.data[idx].name,
                y: nextProps.data[idx].items.length
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

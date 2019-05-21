import React from 'react';
import Highcharts from 'highcharts';

export default class PieChart extends React.Component {
    componentDidMount() {
        this.props.getData();
    }

    componentDidUpdate() {
        let data = [];

        this.props.data.forEach(o => {
            if(o.items.length) {
                data.push({
                    name: o.name,
                    y: o.items.length
                });
            }
        });

        Highcharts.chart('pieChart', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: "Item Categories"
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
                type: 'pie',
                name: 'Categories',
                colorByPoint: true,
                data: data
            }],
            credits: {
                enabled: false
            }
        }, function(chart) {
            if(data.length === 0) {
                chart.renderer.text("Report is not generated because you don't have any items!", 140, 120).css({
                    color: '#17A2B8',
                    fontSize: '16px'
                }).add();
            }
        });
    }

    render() {
        return (
            <div id="pieChart"></div>
        );
    }
}

import React from 'react';
import Highcharts from 'highcharts';
import { Link } from 'react-router-dom';
import { Button, Icon, Segment, Header } from 'semantic-ui-react';

export default class PieChart extends React.Component {
    render() {
        let data = [];
        let chart = false;

        this.props.data.forEach(o => {
            data.push({
                name: o.name,
                y: o.items.length
            });

            if(o.items.length) {
                chart = true;
            }
        });

        if(chart) {
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

        return (
            <div id="pieChart">
                <Segment placeholder raised>
                    <Header icon>
                        <Icon name="warning sign"/>
                        Report is not generated because you don't have any items!
                    </Header>
                    <Button primary>
                        <Link to="/items/add" style={{color: 'white'}}>Add New Item</Link>
                    </Button>
                </Segment>
            </div>
        );
    }
}

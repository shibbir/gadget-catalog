import React from "react";
import Highcharts from "highcharts";
import { connect } from "react-redux";
import { Select } from "semantic-ui-react";
import { fetchItemsByYearRange } from "../item.actions";

class ColumnChart extends React.Component {
    constructor(props) {
        super();
        this.state = {
            yearRange: `${new Date().getFullYear() - 4}-${new Date().getFullYear()}`,
            options: [
                { key: "2015-2019", value: "2015-2019", text: "2015-2019" },
                { key: "2010-2014", value: "2010-2014", text: "2010-2014" },
                { key: "2005-2009", value: "2005-2009", text: "2005-2009" }
            ]
        };
        props.fetchItemsByYearRange(this.state.yearRange);
    }

    fetchItemsByYearRange(event, data) {
        if(this.state.yearRange !== data.value) {
            this.setState({ yearRange: data.value });
            this.props.fetchItemsByYearRange(data.value);
        }
    }

    componentDidUpdate() {
        let data = this.props.itemsPerYear;
        let years = [];
        let itemsPerYear = [];
        let report = false;

        for(let key in data) {
            if (data.hasOwnProperty(key)) {
                years.push(key);
                itemsPerYear.push(data[key]);

                if(data[key]) {
                    report = true;
                }
            }
        }

        Highcharts.chart("columnChart", {
            chart: {
                type: "column"
            },
            title: {
                text: `Items purchased from (${this.state.yearRange})`
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
                data: report ? itemsPerYear : []
            }],
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            }
        }, function(chart) {
            if(!report) {
                chart.renderer.text("Report is not generated because you don't have any items!", 140, 120).css({
                    color: "#17A2B8",
                    fontSize: "16px"
                }).add();
            }
        });
    }

    render() {
        return (
            <>
                <Select onChange={this.fetchItemsByYearRange.bind(this)} options={this.state.options} defaultValue={this.state.options[0].value}/>
                <div id="columnChart"></div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        itemsPerYear: state.itemReducer.itemsPerYear
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchItemsByYearRange: (yearRange) => {
            dispatch(fetchItemsByYearRange(yearRange));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ColumnChart);

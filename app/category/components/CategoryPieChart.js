import React from "react"
import Highcharts from "highcharts";
import { connect } from "react-redux";
import { getCategories } from "../category.actions";

class PieChart extends React.Component {
    constructor(props) {
        super();
        props.getCategories();
    }

    componentDidUpdate() {
        let data = [];

        this.props.categories.forEach(o => {
            if(o.items.length) {
                data.push({
                    name: o.name,
                    y: o.items.length
                });
            }
        });

        Highcharts.chart("pieChart", {
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
                data: data
            }],
            credits: {
                enabled: false
            }
        }, function(chart) {
            if(data.length === 0) {
                chart.renderer.text("Report is not generated because you don't have any items!", 140, 120).css({
                    color: "#17A2B8",
                    fontSize: "16px"
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

const mapStateToProps = (state) => {
    return {
        categories: state.categoryReducer.categories
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: () => {
            dispatch(getCategories());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PieChart);

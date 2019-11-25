import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import CandyTheme from 'fusioncharts/themes/fusioncharts.theme.candy';

// Resolves charts dependancy
ReactFC.fcRoot(FusionCharts, Charts, CandyTheme);

const baseUrl = "http://127.0.0.1:5000";

class ChartViewer4 extends React.Component {
    
    constructor(props) {
        super(props);
        this.compaignid = props.compaignid;
        this.url1 = `${baseUrl}/get_diagram_spent_vs_click_in_a_campaign/916`;
        this.url2 = `${baseUrl}/get_diagram_spent_vs_click_in_a_campaign/936`;
        this.url3 = `${baseUrl}/get_diagram_spent_vs_click_in_a_campaign/1178`;
        this.onFetchData = this.onFetchData.bind(this);
        this.state = {
            datasetting:{
                type: "scatter",
                width :"600",
                height :"300",
                dataFormat :"JSON",
                dataSource:{}
            }
        };
    }

    componentDidMount() {
        this.onFetchData(this.url1, this.url2, this.url3);
    }

    onFetchData(url1,url2,url3) {
        Promise.all([fetch(
                url1, {
                    method: 'GET',
                    headers: new Headers({
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'text/plain'
                    }),
                    mode: 'cors'
                }
            ).then(res => res.json()), fetch(
            url2, {
            method: 'GET',
            headers: new Headers({
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/plain'
            }),
            mode: 'cors'
            }
            ).then(res => res.json()),fetch(
                url3, {
                    method: 'GET',
                    headers: new Headers({
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'text/plain'
                    }),
                    mode: 'cors'
                }
            ).then(res => res.json())]).then(res => {
            const res_json1 = res[0];
            const res_json2 = res[1];
            const res_json3 = res[2];

            var category = [
                {
                    x: "0",
                    label: "0"
                }, {
                    x: "5",
                    label: "5"
                }, {
                    x: "10",
                    label: "10"
                }, {
                    x: "15",
                    label: "15"
                }, {
                    x: "20",
                    label: "20"
                }
                // , {
                //     x: "25",
                //     label: "25"
                // }, {
                //     x: "30",
                //     label: "30"
                // }, {
                //     x: "35",
                //     label: "35"
                // }, {
                //     x: "40",
                //     label: "40"
                // }, {
                //     x: "45",
                //     label: "45"
                // }, {
                //     x: "50",
                //     label: "50"
                // }, {
                //     x: "55",
                //     label: "55"
                // }, {
                //     x: "60",
                //     label: "60"
                // }, {
                //     x: "65",
                //     label: "65"
                // }
            ];
            var data1 = [];
            res_json1.forEach((item_json) => {
                var item_data = {
                    x: item_json.Spent.toString(),
                    y: item_json.Clicks
                };
                data1.push(item_data); 
            });
            var data2 = [];
            res_json2.forEach((item_json) => {
                var item_data = {
                    x: item_json.Spent.toString(),
                    y: item_json.Clicks
                };
                data2.push(item_data);
            });
            var data3 = [];
            res_json3.forEach((item_json) => {
                var item_data = {
                    x: item_json.Spent.toString(),
                    y: item_json.Clicks
                };
                data3.push(item_data);
            });

            this.setState({
                datasetting:{
                    dataSource:{
                        chart: {
                            caption: `The relationship between Spent and Click`,
                            subcaption: `Clicks are positively correlated with spend, indicating that Facebook charges advertisers by clicks.`,
                            xaxisname: "Spent",
                            yaxisname: "Click",
                            numbersuffix: "",
                            theme: "candy"
                        },
                        // categories: categories,
                        // dataset:dataset
                        categories: [{
                                category: category
                            }],
                            dataset: [{
                                seriesname: "916",
                                anchorbgcolor: "36B5D8",
                                data: data1
                            }
                            , {
                                seriesname: "936",
                                anchorbgcolor: "E52D8A",
                                data: data2
                            }
                            , {
                                seriesname: "1178",
                                anchorbgcolor: "F1E408",
                                data: data3
                            }
                        ]
                    }
                }
            });
        });
    }

    render() {
        return (<div>
            { 
            < ReactFC {
                ...this.state.datasetting
            }
            />
                // this.state.datasetting.dataSource ? ( < ReactFC {
                //                  ...this.state.datasetting
                //              }
                //              />):('loading...')
        }
        </div>);
    }
}

export default ChartViewer4;
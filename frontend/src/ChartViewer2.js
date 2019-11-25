import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import CandyTheme from 'fusioncharts/themes/fusioncharts.theme.candy';

// Resolves charts dependancy
ReactFC.fcRoot(FusionCharts, Charts, CandyTheme);

const baseUrl = "http://127.0.0.1:5000";

class ChartViewer2 extends React.Component {
    
    constructor(props) {
        super(props);
        this.compaignid = props.compaignid;
        this.url = `${baseUrl}/get_statistic_top_ctr_in_a_campaign/${props.compaignid}/5`;
        this.onFetchData = this.onFetchData.bind(this);
        this.state = {
            datasetting:{
                type: "scrollbar2d",
                width :"600",
                height :"200",
                dataFormat :"JSON",
                dataSource:{}
            }
        };
    }

    componentDidMount() {
        this.onFetchData(this.url);
    }

    onFetchData(url) {
        Promise.all([fetch(
                url, {
                    method: 'GET',
                    headers: new Headers({
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'text/plain'
                    }),
                    mode: 'cors'
                }
            ).then(res => res.json())]).then(res => {
            const res_json = res[0];
            var categories = [];
            var dataset = [];
            var category = [];
            var data = [];
            res_json.forEach((item_json) => {
                var item_category = {
                    label: item_json.ad_id.toString(),
                };
                category.push(item_category);
                
                var item_CTR = {
                    value: item_json.CTR*100,
                };
                data.push(item_CTR);
            });
            categories.push(category);
            dataset.push(data);

            let palettercolor;
            if (this.compaignid === "916") {
                palettercolor =  "#36B5D8";
            }
            else if (this.compaignid === "936") {
                palettercolor = "#E52D8A";
            }
            else {
                palettercolor = "F1E408";
            }
                

            this.setState({
                datasetting:{
                    dataSource:{
                        chart: {
                            caption: `Top5 Ads of CTR on campign id ${this.compaignid} with Facebook`,
                            subcaption: ``,
                            xaxisname: "Ads-id",
                            yaxisname: "CTR",
                            numbersuffix: "%",
                            theme: "candy",
                            palettecolors: palettercolor
                        },
                        // categories: categories,
                        // dataset:dataset
                        categories: [{
                                category: category
                            }],
                            dataset: [{
                                data: data
                            }]
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

export default ChartViewer2;
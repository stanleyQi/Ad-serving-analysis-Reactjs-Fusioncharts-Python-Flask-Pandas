import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import ReactFC from "react-fusioncharts";
import CandyTheme from 'fusioncharts/themes/fusioncharts.theme.candy';

// Resolves charts dependancy
ReactFC.fcRoot(FusionCharts, Charts, CandyTheme);

const url = "http://127.0.0.1:5000/get_statistic_per_campaign";
const jsonify = res => res.json();

let myHeaders = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/plain'
});

const dataFetch = fetch(
   url,
    {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors'
    }
).then(jsonify);

class ChartViewer1 extends React.Component {
    constructor(props) {
        super(props);
        this.onFetchData = this.onFetchData.bind(this);
        this.state = {
            datasetting:{
                type :"column2d",
                width :"600",
                height :"550",
                dataFormat :"JSON",
                dataSource:{}
            }
        };
    }

    componentDidMount() {
        this.onFetchData();
    }

    onFetchData() {
        Promise.all([dataFetch]).then(res => {
            const res_json = res[0];
            // console.log(res_json);
            var datas = [];
            res_json.forEach((item_json) => {
                var item = {
                    label: item_json.xyz_campaign_id.toString(),
                    value: item_json.SpentPerTotalConversion
                };
                datas.push(item);
            });

            this.setState({
                datasetting:{
                    dataSource:{
                        chart: {
                            caption: "Conversion cost per campaign with Facebook",
                            subcaption: `As can be seen from the above figure, xyz conducted 3 campaigns(campaign activities) with 
                            campaign ids of 916, 936, and 1178. 916 placed 54 advertisements, which cost about 149.71,
                            which contributed 58 conversions;
                            464 ads, costing about 2893.37 resulted in 537 conversions;
                            1178 placed 625 ads, costing about 55662.15, resulting in 2669 conversions.Although 1178 has
                            the most conversions, the average cost per conversion is about 20.86.Approximately a drop,
                                the 916 average contributed to about 2.58 per conversion.
                            `,
                            xaxisname: "Campaign id",
                            yaxisname: "Conversion cost(Spent/Conversion)",
                            // numbersuffix: "$",
                            numberPrefix:"$",
                            theme: "candy",
                            palettecolors: "#36B5D8 ,#E52D8A,#F1E408",
                            animation:"1"
                        },
                        data:datas 
                    }
                }
            });
        });
    }

    render() {
        return (<div>
            { 
                this.state.datasetting.dataSource ? ( < ReactFC {
                                 ...this.state.datasetting
                             }
                             />):('loading...')
        }
        </div>);
    }
}

export default ChartViewer1;
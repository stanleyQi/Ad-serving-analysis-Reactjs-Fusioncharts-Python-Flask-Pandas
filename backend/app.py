from flask import Flask, render_template
from flask_cors import *
import tools.analysis_process as tool

app = Flask(__name__)
CORS(app, resources=r'/*')
data_file_path = './ref/ad_conversion_data_facebook_for_analysis.csv'


@app.route('/setup')
def setup():
    tool.data_initializing(data_file_path)
    return 'Setup.'


@app.route('/get_statistic_per_campaign')
def get_statistic_per_campaign():
    return tool.get_statistic_per_campaign().to_json(orient='records') #直方图


@app.route('/get_statistic_top_ctr_in_a_campaign/<int:compaignid>/<int:topamount>')
def get_statistic_top_ctr_in_a_campaign(compaignid=0,topamount=0):
    return tool.get_statistic_top_ctr_in_a_campaign(compaignid,topamount).to_json(orient='records') #直方图
    # return render_template('index.html', campaignid=compaignid, topamount=topamount)#It should return a json to the client.


@app.route('/get_diagram_spent_vs_ctr_in_a_campaign/<int:compaignid>')
def get_diagram_spent_vs_ctr_in_a_campaign(compaignid=0):
    return tool.get_diagram_spent_vs_ctr_in_a_campaign(compaignid).to_json(orient='records') #散点图
    # return render_template('index.html', campaignid=compaignid, topamount=topamount)


@app.route('/get_diagram_spent_vs_click_in_a_campaign/<int:compaignid>')
def get_diagram_spent_vs_click_in_a_campaign(compaignid=0):
    return tool.get_diagram_spent_vs_click_in_a_campaign(compaignid).to_json(orient='records')  # 散点图
    # return render_template('index.html', campaignid=compaignid, topamount=topamount)


@app.route('/get_statistic_per_interested_in_a_campaign/<int:compaignid>')
def get_statistic_per_interested_in_a_campaign(compaignid= 0):
    return tool.get_statistic_per_interested_in_a_campaign(compaignid).to_json(orient='records') #直方图
    # return render_template('index.html', campaignid=compaignid, topamount=topamount)


if __name__ == '__main__':
    app.run()

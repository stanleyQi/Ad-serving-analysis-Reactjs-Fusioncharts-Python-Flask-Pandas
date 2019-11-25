import pandas as pd
from pandas import Series, DataFrame
import numpy as np

data_file_path = './ref/ad_conversion_data_facebook_for_analysis.csv'
df = None


# 统计与分析1
def get_statistic_per_campaign():

    try:
        global df
        if df is None:
            data_initializing(data_file_path)

        df_get_statistic_per_campaign = df.groupby('xyz_campaign_id').agg({'xyz_campaign_id': 'min', 'ad_id': 'count', 'Spent': 'sum', 'Spent': 'sum', 'Total_Conversion': 'sum'})
        df_get_statistic_per_campaign['SpentPerTotalConversion'] = df_get_statistic_per_campaign['Spent']/df_get_statistic_per_campaign['Total_Conversion']
        return df_get_statistic_per_campaign
    except:
        print('error.')
        return DataFrame({})


# 统计与分析2
def get_statistic_top_ctr_in_a_campaign(campaign_id, top_amount):

    try:
        global df
        if df is None:
            data_initializing(data_file_path)

        df_get_statistic_top_ctr_in_a_campaign = df[df.xyz_campaign_id == campaign_id].nlargest(top_amount, 'CTR')
        return df_get_statistic_top_ctr_in_a_campaign
    except:
        print('error.')
        return DataFrame({})


# 统计与分析3
def get_diagram_spent_vs_ctr_in_a_campaign(campaign_id):
    try:
        global df
        if df is None:
            data_initializing(data_file_path)

        df_get_diagram_spent_vs_ctr_in_a_campaign = df[df.xyz_campaign_id == campaign_id].ix[:, ['xyz_campaign_id', 'Spent', 'CTR']]
        return df_get_diagram_spent_vs_ctr_in_a_campaign
    except:
        print('error.')
        return DataFrame({})


# 统计与分析4
def get_diagram_spent_vs_click_in_a_campaign(campaign_id):
    try:
        global df
        if df is None:
            data_initializing(data_file_path)

        df_get_diagram_spent_vs_click_in_a_campaign = df[df.xyz_campaign_id == campaign_id].ix[:, ['xyz_campaign_id', 'Spent', 'Clicks']]
        return df_get_diagram_spent_vs_click_in_a_campaign
    except:
        print('error.')
        return DataFrame({})


# 统计与分析5
def get_statistic_per_interested_in_a_campaign(campaign_id):
    try:
        global df
        if df is None:
            data_initializing(data_file_path)

        df_get_statistic_per_interested_in_a_campaign = df[df.xyz_campaign_id == campaign_id].groupby('interest').agg({'interest': 'min', 'Impressions': 'sum', 'Clicks': 'sum', 'CTR': 'mean', 'Total_Conversion': 'sum', 'Approved_Conversion': 'sum'})
        return df_get_statistic_per_interested_in_a_campaign
    except:
        print('error.')
        return DataFrame({})


# 数据导入和基础清理
def data_initializing(para_file_path=''):
    global df
    df = read_data(para_file_path)
    comb_data(df)
    # df.to_csv("tmp.csv", index=True, sep=',')


# 读数据
def read_data(file_path=""):
    return pd.read_csv(file_path)


# 整理数据（清理->加辅助信息）
def comb_data(data):
    data.fillna(value=0)
    data.drop(['fb_campaign_id'], axis=1, inplace=True)
    data['CTR'] = data['Clicks']/data['Impressions']

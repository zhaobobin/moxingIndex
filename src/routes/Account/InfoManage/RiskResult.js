import React from 'react';
import { connect } from 'dva';
import { Link, Redirect } from 'dva/router';
import {  Button } from 'antd';
import styles from './RiskResult.less';
import { ENV, Storage ,getSearchString} from '~/utils/utils';

/*图表*/
import ReactHighcharts from 'react-highcharts';
import ResultJson from "../../Result/ResultJson";
const fontFamily = '"Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
@connect(state => ({
  global: state.global,
}))
export default class RiskResult extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      data:{},
    }
  }
  componentDidMount(){
    let { userInfo } = this.props.global.currentUser;
    if(userInfo.riskFlag === '1') this.tijao(userInfo.userId);
  }
  tijao(userId){
    this.props.dispatch({
      type: 'global/post',
      url:'/api/risk/findRiskResult',
      payload:{
        userId,
      },
      callback:(res)=>{
        if(res.code === 0){
          console.log(res)
          this.setState({
            data:res.data
          })
        }
      }
    })
  }
  redirect = (action) => {
    //window.CzResult.toast(action);      //与原生交互
    window.location.href = window.location.href + '&action=' + action;
    window.location.reload();
  };
  render(){
    const resultObj=this.state.data
    const config = {
      credits: {
        enabled:false
      },
      chart: {
        spacing : [50, 0 , 110, 0],
        height:500,
      },
      title: {
        text: '',
        floating:true,
        x: 0,
        y: 0,
        style: {
          color: '#888',
          fontSize: '12px',
          fontFamily: fontFamily
        },
      },
      subtitle: {
        text: '根据系统分级，建议不同级别出借人可出借资金额度为：',
        floating:true,
        x: 0,
        y: 320,
        style: {
          color: '#333',
          fontSize: '12px',
          fontWeight:400,
          fontFamily: fontFamily
        },
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      legend: {
        labelFormatter: function () {
          return  this.name + this.y+'万'
        },
        layout: 'horizontal',
        align: 'left',           //水平方向位置
        verticalAlign: 'bottom', //垂直方向位置
        symbolRadius: 0,
        // itemMarginTop: 5,
        // itemMarginBottom: 0,
        x:0,
        y:80,
      },
      plotOptions: {
        pie: {
          showInLegend: true,
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            connectorWidth: 0,          //线长度
            style: {
              fontSize:12,
              x:0,
              y:0,
            }
          },
        }
      },
      colors: [
        {
          linearGradient: { x1: 0.2, x2: 0.2, y1: 0.2, y2: 1 },
          stops: [
            [0, '#F18925'],
            [1, '#FFDCB7']
          ]
        },
        {
          linearGradient: { x1: 0.2, x2: 0.2, y1: 1, y2: 0.2 },
          stops: [
            [0, '#051D37'],
            [1, '#113858']
          ]
        },
        {
          linearGradient: { x1: 0.2, x2: 0.2, y1: 1, y2: 0.2 },
          stops: [
            [0, '#2E5F94'],
            [1, '#2E5F94']
          ]
        },
        {
          linearGradient: { x1: 0.2, x2: 0.2, y1: 1, y2: 0.2 },
          stops: [
            [0, '#FFFAF5'],
            [1, '#FFFAF5']
          ]
        },
        {
          linearGradient: { x1: 0.2, x2: 0.2, y1: 1, y2: 0.2 },
          stops: [
            [0, '#FFE9D4'],
            [1, '#FFE9D4']
          ]
        },
      ],
      series: [{
        type: 'pie',
        size:'50%',
        innerSize: '75%',                                   //圆环内填充比例
        name: '出借资金额度',
        data: [
          ['相对保守型', 1000],
          ['保守型', 1000],
          ['稳健型', 300],
          ['相对积极型', 500],
          ['积极型', 800],
        ]
      }]
    };

    return(
      <div className={styles.Box}>
              <p className={styles.title}>评测完成，以下为您的测评结果</p>
        <div className={styles.ImgBox}>
          <img src={require("~/assets/account/my_risk@2x.png")} alt="" className={styles.img}/>
        </div>
              <p className={styles.stability}>{resultObj.capacity}</p>
              <div className={styles.stabilityContent}>
                <p>根据您所提供的回答，您的总分是：<strong>{resultObj.totalScore}</strong> </p>
                <p> 风险承受能力为：<strong>{resultObj.capacity}</strong></p>
                <p> <strong>{resultObj.capacity}:</strong></p>
                <p>{resultObj.gradeDesc}</p>
                {/*图表*/}
                <div className={styles.container}>
                  <ReactHighcharts config={config} ref="chart"/>
                </div>
                <p className={styles.statement}>重要声明: </p>
                <p>
                  本风险承受能力评估问卷结果系根据您填写问卷当时所提供的个人资料而推论得知，
                  且其结果将作为您未来在去投网中介平台出借参考所用。此问卷内容及其结果不构成与您进行交易之要约或要约之引诱。
                  去投网中介平台不对此份问卷之准确性及咨询是否完整负责。您在此问卷上所填的个人资料本公司将予以保密。
                </p>
                <p> 出借人可在每个年度重新进行出借人风险承受能力评估及分级。</p>
                <p className={styles.btnP}>
                  <Button type="primary"  ><Link to="/account/info-manage/risk-manage">重新评估</Link></Button>
                  <Button type="primary" onClick={() => this.redirect(ResultJson.lend.action)}>我要出借</Button>
                </p>
              </div>

      </div>
    )
  }

}

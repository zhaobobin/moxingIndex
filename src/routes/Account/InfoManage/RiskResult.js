import React from 'react';
import { connect } from 'dva';
import { Link, Redirect } from 'dva/router';
import {  Button } from 'antd';
import styles from './RiskResult.less';
import { ENV, Storage ,getSearchString,str2Number,numberFormat} from '~/utils/utils';
import Loading from '~/components/Common/Loading'

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
    this.ajaxFlag = true;
    this.loading = true;
    this.state = {
      data:{},
      chart:[]
    }
  }
  componentDidMount(){
    this.tijao();
  }
  tijao(){
    let { userId } = this.props.global.currentUser.userInfo;
    this.props.dispatch({
      type: 'global/post',
      url:'/api/risk/findRiskResult',
      payload:{
        userId,
      },
      callback:(res)=>{
        this.loading = false;
        if(res.code === 0){
          let chartArr=res.data.allGrade
          let chart=this.state.chart
          let chartObj=[]
          for(let i=0;i<chartArr.length;i++){
            chartObj=[chartArr[i].capacityDesc, parseInt(chartArr[i].totalLending)]
            chart.push(chartObj)
          }
          this.setState({
            data:res.data,
            chart:chart
          })
        }
      }
    })
  }
  /*IOS*/
  setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(window.WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    let WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    // WVJBIframe.src = ‘wvjbscheme://__BRIDGE_LOADED__’;
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(() => { document.documentElement.removeChild(WVJBIframe);}, 0);
  }
  redirect = (action) => {
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //判断是否是 android终端
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断是否是 ios终端
    if (isiOS) {
      /*ios*/
      this.setupWebViewJavascriptBridge( (bridge) => {
      /*  bridge.registerHandler('h5Action', (data, responseCallback) => {
          responseCallback(data);
        });*/
        bridge.callHandler('h5Action', action, (response) => {

        });
      });
    }else if(isAndroid){
      /*Android*/
      window.app.h5Action(action);      //与原生交互
    }else{
      return ''
    }
  };
  render(){
    let { cusType, riskFlag }=this.props.global.currentUser.userInfo;
    const resultObj=this.state.data
    const chart=this.state.chart
    let config;
    if(chart!=''){
      config = {
        credits: {
          enabled:false
        },
        chart: {
           spacing : [0, 0 , 40, 0],
           height:340,
        },
        title: {
          text: '',
        },
        subtitle: {
          text: '根据系统分级，建议不同级别出借人可出借资金额度为：',
          floating:true,
          x: -10,
          y: 320,
          style: {
            color: '#333',
            fontSize: '12px',
            fontWeight:400,
            fontFamily: fontFamily
          },
        },
        tooltip: {
          enabled: false
          // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        },
        legend: {
          labelFormatter: function () {
            return  this.name + this.y+'万'
          },
        },
        plotOptions: {
          pie: {
            dataLabels: {
              connectorWidth: 0,
              connectorPadding: -20,
              style: {
                fontWeight: 400,
                fontSize:11
              }
            }
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
          allowPointSelect: false,    //动画效果
          innerSize: '60%',                                   //圆环内填充比例
          size:'60%',
          name: '出借资金额度占比',
          data: chart
        }]
      };
    }else {
      config = {
        credits: {
          enabled:false
        },
        chart: {
          spacing : [0, 0 , 20, 0],
          height:340,
        },
        title: {
          text: '',
          floating:true,
          x: -50,
          y: 150,
          style: {
            color: '#888',
            fontSize: '12px',
            fontFamily: fontFamily
          },
        },
        subtitle: {
          text: '根据系统分级，建议不同级别出借人可出借资金额度为：',
          floating:true,
          x: -185,
          y: 380,
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
                fontSize:16
              }
            },
          }
        },
        colors: [

          {
            linearGradient: { x1: 0.2, x2: 0.2, y1: 1, y2: 0.2 },
            stops: [
              [0, '#FFFAF5'],
              [1, '#FFFAF5']
            ]
          },

        ],
        series: [{
          type: 'pie',
          innerSize: '60%',                                   //圆环内填充比例
          name: '出借资金额度占比',
          data: [
            ['', 100],

          ]
        }]
      };
    }

    return(
      <div>
        {
          this.loading ?
            <Loading/>
            :
            <div className={styles.Box}>
              <p className={styles.title}>评测完成，以下为您的测评结果</p>
              <div className={styles.ImgBox}>
                <img src={require("~/assets/account/my_risk@2x.png")} alt="" className={styles.img}/>
              </div>
              <p className={styles.stability}><span>{resultObj.capacity}</span></p>
              <div className={styles.stabilityContent}>
                <p className={styles.totalScore}>根据您所提供的回答，您的总分是：<strong>{resultObj.totalScore}分</strong> </p>
                <p className={styles.capacity}> 风险承受能力为：<strong>{resultObj.capacity}</strong></p>
                <p> <strong>{resultObj.capacity}:</strong></p>
                <p>{resultObj.gradeDesc}</p>
                {/*图表*/}
                <div className={styles.container}>
                  <ReactHighcharts config={config} ref="chart"/>
                  <div className={styles.HighchartsBox}>
                      <div>
                        <span className={styles.LegendColor1}></span>
                        <span>保守型<br/>500万</span>
                      </div>
                      <div>
                        <span className={styles.LegendColor2}></span>
                        <span>相对保守型<br/>600万</span>
                      </div>
                      <div>
                        <span className={styles.LegendColor3}></span>
                        <span>稳健型<br/>700万</span>
                      </div>
                      <div>
                        <span className={styles.LegendColor4}></span>
                        <span>相对积极型<br/>800万</span>
                      </div>
                      <div>
                        <span className={styles.LegendColor5}></span>
                        <span>积极型<br/>900万</span>
                      </div>
                  </div>
                </div>
                <p className={styles.statement}>客户声明: </p>
                <p className={styles.cont}>1、本人愿意接受此问卷的调查方法，并已如实回答，了解了自己的风险承受能力和适合购买的产品类型；</p>
                <p className={styles.cont}>2、如本人所选择的产品风险等级超过本人的风险承受等级时，本人确认此出借行为为本人意愿行为，自愿承担此出借的风险。</p>
                <p className={styles.btnP}>
                  {/*<Link to="/account/info-manage/risk-manage" className={styles.fiskNewBtn}>重新测评</Link>*/}
                  <button onClick={() => this.redirect(ResultJson.risk.action)} className={styles.fiskNewBtn}>重新测评</button>
                  <button type="primary" onClick={() => this.redirect(ResultJson.lend.action)} className={styles.chujieBtn}>立即出借</button>
                </p>
              </div>

            </div>


        }

      </div>

    )
  }

}

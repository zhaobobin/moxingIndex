import React from 'react';
import { connect } from 'dva';
import { Link, Redirect } from 'dva/router';
import {  Button } from 'antd';
import styles from './RiskResult.less';
import { ENV, Storage ,getSearchString} from '~/utils/utils';

/*图表*/
import ReactHighcharts from 'react-highcharts';
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
    window.location.href = ENV.siteUrl + '?action=' + action;
  };
  render(){
    const resultObj=this.state.data
    const config = {
      credits: {
        enabled:false
      },
      chart: {
        spacing : [50, 0 , 110, 0],
      },
      title: {
        text: '',
        floating:true,
        x: -50,
        y: 150,
        style: {
          color: '#888',
          fontSize: 11,
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
          fontSize: 11,
          // fontWeight:400,
          fontFamily: fontFamily
        },
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      legend: {
        layout: 'horizontal',
        align: 'left',           //水平方向位置
        verticalAlign: 'bottom', //垂直方向位置
        symbolRadius: 0,
        itemMarginTop: 5,
        itemMarginBottom: 0,
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
              fontSize:11
            }
            //format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          },
        }
      },
      /*颜色*/
      /*colors:['#FFF18925','#FF0D2F55','#FF2E5F94','#FFFFFAF5','#FFFFE9D4'],*/
      series: [{
        type: 'pie',
        innerSize: '60%',                                   //圆环内填充比例
        name: '出借资金额度',
        data: [
          ['保守型500万', 1000],
          ['相对保守型600万', 1000],
          ['稳健型700万', 300],
          ['相对积极型800万', 500],
          ['积极型900万', 800],
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
                  <Button type="primary"><Link to="/account/info-manage/risk-manage">重新评估</Link></Button>
                  <Button type="primary"><Link to="/lend">我要出借</Link></Button>
                </p>
              </div>

      </div>
    )
  }

}

/* 运营报告详情*/
import React from 'react';
import { connect } from 'dva';
import {filterTel,numberFormat}from'~/utils/utils';
import styles  from './ReportDetail.less';
import Information from "~/components/Information/Information";
import Signature from "~/components/Information/signature";
import Loading from '~/components/Common/Loading';
import HighMaps from '~/components/Table/HighMaps';
/*图表*/
import ReactHighcharts from 'react-highcharts';
const fontFamily = '"Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

@connect(state => ({
  global: state.global,
}))
export default class ReportDetail extends React.Component {
  constructor(props){
    super(props);
    this.loading = true;
    this.state = {
      dataAll: {},
      periodInfoArrOr: [],
      configSexArr: [],
      configTerminalArr:[],
      Map:[]
    }
  }

  componentDidMount(){
    let id = this.props.match.params.id;
    this.props.dispatch({
      type: 'global/post',
      url: '/api/platform/findRunReportDetail',
      payload: {
        reportId: id
      },
      callback: (res) => {
        this.loading = false;
        if (res.code === 0) {
          let data=res.data
          let periodInfoArr2 = [];
          for (let i = 0; i < data.periodInfo.length; i++) {
            if (data.periodInfo[i].investSubType === "SIX" || data.periodInfo[i].investSubType === "TWELVE" || data.periodInfo[i].investSubType === "EIGHTEEN" ||data.periodInfo[i].investSubType === "TWENTYFOUR" || data.periodInfo[i].investSubType === "OTH") {
              let periodInfoObj = [data.periodInfo[i].dataDesc, parseFloat(data.periodInfo[i].showData)]
              periodInfoArr2.push(periodInfoObj)
            }
          }
          /*性别*/
          let SexArr = [];
          for (let j = 0; j < data.genderInfo.length; j++) {
            if (data.genderInfo[j].investSubType === 'F') {
              let SexF = {name: '女', y: parseFloat(data.genderInfo[j].showData)}
              SexArr.push(SexF)
            } else if (data.genderInfo[j].investSubType === 'M') {
              let SexM = {name: '男', y: parseFloat(data.genderInfo[j].showData)}
              SexArr.push(SexM)
            }
          }
          /*终端*/
          let terminalArr=[]
          for(let k=0;k<data.terminalInfo.length;k++){
            if(data.terminalInfo[k].investSubType==='PC'){
              let terminalPC={name:data.terminalInfo[k].investSubType,y:parseFloat(data.terminalInfo[k].showData)}
              terminalArr.push(terminalPC)
            }else if(data.terminalInfo[k].investSubType==='APP'){
              let terminalAPP={name:data.terminalInfo[k].investSubType,y:parseFloat(data.terminalInfo[k].showData)}
              terminalArr.push(terminalAPP)
            }
          }
          /*地图*/
          let MapData=[];
          for(let l=0;l<data.areaTop5.length;l++){
            let mapObj={name:data.areaTop5[l].areaName,value:parseFloat(data.areaTop5[l].showData),color:'#FDE7D6'}
            MapData.push(mapObj)
          }

          this.setState({
            dataAll: res.data,
            periodInfoArrOr: periodInfoArr2,
            configSexArr: SexArr,
            configTerminalArr:terminalArr,
            Map:MapData
          })
        }
      }
    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.id !== this.props.match.params.id){
      let id = nextProps.match.params.id;
    }
  }

  render(){
    const  {dataAll,periodInfoArrOr,configSexArr,configTerminalArr,Map} =this.state;
    /*项目发布数据*/
    const  config = {
      credits: {
        enabled:false
      },
      chart: {
        spacing : [0, 0 , 20, 0],
      },
      title: {
        text: '',
        floating:true,
        x: 0,
        y: 0,
        style: {
          color: '#002F58',
          fontSize: '11px',
          fontFamily: fontFamily
        },
      },
      subtitle: {
        text:dataAll.periodName+'份项目发布数量共'+dataAll.countPeriod+'个' ,
        floating:true,
        x: 0,
        y: 350,
        style: {
          color: '#002F58',
          fontSize: '13px',
          fontWeight:500,
          fontFamily: fontFamily
        },
      },
      tooltip: {
        // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      legend: {
        labelFormatter: function () {
          return  this.name
        },
        layout: 'horizontal',
        align: 'center',           //水平方向位置
        verticalAlign: 'bottom', //垂直方向位置
        symbolRadius: 0,
        itemDistance: 5,
        // itemMarginTop: 5,
        // itemMarginBottom: 0,
        itemStyle: {
          fontSize:11
        },
        x:-14,
        y:20,
      },
      plotOptions: {
        pie: {
          showInLegend: true,
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            connectorWidth: 1,          //线长度
            connectorPadding: -5,
            // format: '{point.name}项目<br/>{point.y}个占{point.percentage:.1f} %',
            formatter: function () {
              // 通过函数判断是否显示数据标签，为了防止数据标签过于密集
              return this.y > 1 ? '<b>' + this.point.name+'项目' + ':</b> ' + numberFormat(this.y,true)+'个' +'<br/>'+'占'+parseFloat(this.percentage).toFixed(1) +'%': null;
              // return this.point.name + numberFormat(this.y,true)+this.percentage
            },
            style: {

              fontSize:11,
              color: '#0D2F55',
              fontWeight:400,
            }
          },
        }
      },
      colors: [
        {
          linearGradient: { x1: 0.2, x2: 0.2, y1: 1, y2: 0.2 },
          stops: [
            [0, '#057CA9'],
            [1, '#0D2F55']
          ]
        },
        {
          linearGradient: { x1: 0.2, x2: 0.2, y1: 1, y2: 0.2 },
          stops: [
            [0, '#FFDCB7'],
            [1, '#F18925']
          ]
        },
        {
          linearGradient: { x1: 0.2, x2: 0.2, y1: 1, y2: 0.2 },
          stops: [
            [0, '#71829B'],
            [1, '#B7CCE1']
          ]
        },
        {
          linearGradient: { x1: 0.2, x2: 0.2, y1: 0.2, y2: 1 },
          stops: [
            [0, '#FFC263'],
            [1, '#FFE7D5']
          ]
        },
      ],
      series: [{
        type: 'pie',
        allowPointSelect: false,    //动画效果
        innerSize: '65%',//圆环内填充比例
        size: '40%',
        name: '账户资产',
        data: periodInfoArrOr
      }]
    };
    /*性别数据*/
    const  configSex = {
      credits: {
        enabled:false
      },
      chart: {
        spacing : [-100, 0 ,0, 0],
        height:300,
      },
      title: {
        text: '',
      },
      subtitle: {
        text: '',
      },
      tooltip: {
        animation:false,
        // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      legend: {
        labelFormatter: function () {
          return  this.name
        },
        layout: 'horizontal',
        align: 'center',           //水平方向位置
        verticalAlign: 'bottom', //垂直方向位置
        symbolRadius: 0,
        floating:true,
        // itemMarginTop: 5,
        // itemMarginBottom: 0,
        x:0,
        y:-50,
      },
      plotOptions: {
        pie: {
          showInLegend: true,
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            connectorWidth: 1,          //线长度
            connectorPadding: -5,
            formatter: function () {
              // 通过函数判断是否显示数据标签，为了防止数据标签过于密集
              return this.y > 1 ? '<b>' + this.point.name+'性' + ':</b> ' + numberFormat(this.y,true)+'人' +'<br/>'+'占'+parseFloat(this.percentage).toFixed(1) +'%': null;
              // return this.point.name + numberFormat(this.y,true)+this.percentage
            },
            style: {
              fontSize:11,
              color: '#0D2F55',
              fontWeight:400,
            }
          },
        }
      },
      colors: [
        {
          linearGradient: { x1: 0.2, x2: 0.2, y1: 1, y2: 0.2 },
          stops: [
            [0, '#057CA9'],
            [1, '#0D2F55']
          ]
        },
        {
          linearGradient: { x1: 0.2, x2: 0.2, y1: 0.2, y2: 1 },
          stops: [
            [0, '#F18925'],
            [1, '#FFDCB7']
          ]
        },
      ],
      series: [{
        type: 'pie',
        allowPointSelect: false,    //动画效果
        innerSize: '65%',//圆环内填充比例
        size: '40%',
        name: '账户资产',
        data: configSexArr
      }]
    };
    /*终端数据*/
    const  configTerminal = {
      credits: {
        enabled:false
      },
      chart: {
        spacing : [0, 0 ,0, 0],
        height:300,
      },
      title: {
        text: '',
        floating:true,
      },
      subtitle: {
        text: '',
      },
      tooltip: {
        animation:false,
        // enabled: true,
       // pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      legend: {
        labelFormatter: function () {
          return  this.name
        },
        layout: 'horizontal',
        align: 'center',           //水平方向位置
        verticalAlign: 'bottom', //垂直方向位置
        symbolRadius: 0,
        // itemMarginTop: 5,
        // itemMarginBottom: 0,
        x:0,
        y:-50,
      },
      yAxis: {
        title: {
          text: ''
        },

      },
      plotOptions: {
        pie: {
          showInLegend: true,
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            connectorWidth: 1,          //线长度
            connectorPadding:-5,
            x:10,
            y:-20,
            formatter: function () {
              // 通过函数判断是否显示数据标签，为了防止数据标签过于密集
              return this.y > 1 ? '<b>' + this.point.name+'端出借' + ':</b> ' + numberFormat(this.y,true)+'元' +'<br/>'+'占'+parseFloat(this.percentage).toFixed(1) +'%': null;
              // return this.point.name + numberFormat(this.y,true)+this.percentage
            },
            style: {
              fontSize:11,
              color: '#0D2F55',
              fontWeight:400,
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
            [0, '#057CA9'],
            [1, '#0D2F55']
          ]
        },

      ],
      series: [{
        type: 'pie',
        allowPointSelect: false,    //动画效果
        innerSize: '65%',//圆环内填充比例
        size: '70%',
        name:'出借',
        data:configTerminalArr
      },

      ]
    }
    return(
      <div>
        {
          this.loading
            ?
            <Loading/>
            :
            dataAll!==''?
            <Information>
              <div className={styles. ReportDetailBox}>
              <h4 className={styles.ReportTitle}><span className={styles.content}>{dataAll.title}数据总览 <span></span></span></h4>
              <div className={styles.pandectBox}>
                <div className={styles.pandect}>
                  <img src={require("~/assets/account/find_operdata_money@2x.png")} alt=""
                       className={styles.pandectImg}/>
                  <div className={styles.pandectCont}>
                    <p>{dataAll.baseAmt===undefined?'0.00':numberFormat(parseFloat(dataAll.baseAmt))}元</p>
                    <p>交易额</p>
                  </div>
                </div>
                <div className={styles.pandect}>
                  <img src={require("~/assets/account/find_operdata_profit@2x.png")} alt=""
                       className={styles.pandectImg}/>
                  <div className={styles.pandectCont}>
                    <p>{dataAll.baseIncome===undefined?'0.00':numberFormat(parseFloat(dataAll.baseIncome))}元</p>
                    <p>用户收益</p>
                  </div>
                </div>
                <div className={styles.pandect}>
                  <img src={require("~/assets/account/find_operdata_people@2x.png")} alt=""
                       className={styles.pandectImg}/>
                  <div className={styles.pandectCont}>
                    <p>{dataAll.baseCount===undefined?'':numberFormat(dataAll.baseCount,true)}人</p>
                    <p>注册人数</p>
                  </div>
                </div>
              </div>
              <h4 className={styles.Beian}><span className={styles.content}>{dataAll.title}项目发布数据 <span></span></span></h4>
              <div className={styles.chartBox}>
                <ReactHighcharts config={config} ref="chart"/>
              </div>
              <h4 className={styles.ReportTitle}><span className={styles.content}>{dataAll.title}出借地域数据TOP5 <span></span></span></h4>
              <div className={styles.ChinaBox}>
                {/*<img src={require("~/assets/account/find_operdata_map@2x.png")} alt="" className={styles.ChinaImg}/>*/}
                        {/*地图*/}
                <HighMaps data={Map}/>
                <div className={styles.areaTop5Box}>
                {
                  dataAll.areaTop5.map((item,index)=>{
                    return(
                      <p className={styles.Ranking} key={index}>
                        <span className={index<3?styles.areaTopNone:''}>{index+1}</span>
                        <span className={styles.province}>{item.areaName}</span>
                        <span>{numberFormat(parseFloat(item.showData))}元</span>
                      </p>
                    )
                  })
                }
                  <img src={require("../../../assets/account/find_operdata_top1@2x.png")} className={styles.TopImgOne}/>
                  <img src={require("../../../assets/account/find_operdata_top2@2x.png")} className={styles.TopImgTwo}/>
                  <img src={require("../../../assets/account/find_operdata_top3@2x.png")} className={styles.TopImgThree}/>
                </div>
              </div>
              <h4 className={styles.ReportTitle}><span className={styles.content}>{dataAll.title}出借用户排名TOP5 <span></span></span></h4>
              <div className={styles.lendRankingBox}>
              <table className={styles.lendRanking}>
                <tbody>
                <tr>
                  <th>排名</th>
                  <th>出借用户</th>
                  <th>性别</th>
                  <th>省份</th>
                  <th>出借金额</th>
                </tr>
                {
                  dataAll.lenderTop5.map((item,index)=>{
                    return(
                      <tr key={index}>
                        <td className={index<3?styles.TableNone:''}>{index+1}</td>
                        <td>{filterTel(item.phone)}</td>
                        <td>{item.gender}</td>
                        <td>{item.areaName}</td>
                        <td>{numberFormat(parseFloat(item.showData))}</td>
                      </tr>
                    )
                  })
                }
                </tbody>
              </table>
                <img src={require("../../../assets/account/find_operdata_top1@2x.png")} className={styles.TopImg1}/>
                <img src={require("../../../assets/account/find_operdata_top2@2x.png")} className={styles.TopImg2}/>
                <img src={require("../../../assets/account/find_operdata_top3@2x.png")} className={styles.TopImg3}/>
              </div>
              {/*图表*/}
              <h4 className={styles.ReportTitle}><span className={styles.content}>{dataAll.title}出借用户性别数据 <span></span></span></h4>
              <div className={styles.chartBox}>
                <ReactHighcharts config={configSex} ref="chart"/>
              </div>
              <h4 className={styles.ReportTitle}><span className={styles.content}>{dataAll.title}出借终端数据 <span></span></span></h4>
              <div className={styles.chartBox}>
                <ReactHighcharts config={configTerminal} ref="chart"/>
              </div>
              <Signature/>
              </div>
            </Information>
              :
              '暂无数据'
        }
      </div>
    )
  }

}

/* 运营报告详情*/
import React from 'react';
import { connect } from 'dva';
import styles  from './ReportDetail.less';
import Information from "~/components/Information/Information";
import Signature from "~/components/Information/signature";
import Loading from '~/components/Common/Loading';
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
      configTerminalArr:[]
    }
  }

  componentDidMount(){
    let id = this.props.match.params.id;
    console.log(id)
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
              let SexF = {name: '女', y: parseInt(data.genderInfo[j].showData)}
              SexArr.push(SexF)
            } else if (data.genderInfo[j].investSubType === 'M') {
              let SexM = {name: '男', y: parseInt(data.genderInfo[j].showData)}
              SexArr.push(SexM)
            }
          }
          /*终端*/
          let terminalArr=[]
          for(let k=0;k<data.terminalInfo.length;k++){
            if(data.terminalInfo[k].investSubType==='PC'){
              let terminalPC={name:data.terminalInfo[k].investSubType,y:parseInt(data.terminalInfo[k].showData)}
              terminalArr.push(terminalPC)
            }else if(data.terminalInfo[k].investSubType==='APP'){
              let terminalAPP={name:data.terminalInfo[k].investSubType,y:parseInt(data.terminalInfo[k].showData)}
              terminalArr.push(terminalAPP)
            }
          }
          this.setState({
            dataAll: res.data,
            periodInfoArrOr: periodInfoArr2,
            configSexArr: SexArr,
            configTerminalArr:terminalArr
          })
        }
      }
    })
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.id !== this.props.match.params.id){
      let id = nextProps.match.params.id;
      console.log(id)
    }
  }

  render(){
    const  {dataAll,periodInfoArrOr,configSexArr,configTerminalArr} =this.state;
    const  config = {
      credits: {
        enabled:false
      },
      chart: {
        spacing : [50, 0 , 110, 0],
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
        text: '',
        floating:true,
        x: 10,
        y: 0,
        style: {
          color: '#333',
          fontSize: '11px',
          fontWeight:400,
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
        // itemMarginTop: 5,
        // itemMarginBottom: 0,
        x:-14,
        y:60,
      },
      plotOptions: {
        pie: {
          showInLegend: true,
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            connectorWidth: 0,          //线长度
            connectorPadding: 20,
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
            [0, '#FFDCB7'],
            [1, '#F18925']
          ]
        },
        {
          linearGradient: { x1: 0.2, x2: 0.2, y1: 0.2, y2: 1 },
          stops: [
            [0, '#FFC263'],
            [1, '#FFE7D5']
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
          linearGradient: { x1: 0.2, x2: 0.2, y1: 1, y2: 0.2 },
          stops: [
            [0, '#057CA9'],
            [1, '#0D2F55']
          ]
        }
      ],
      series: [{
        type: 'pie',
        allowPointSelect: false,
        innerSize: '65%',//圆环内填充比例
        size: '70%',
        name: '账户资产',
        data: periodInfoArrOr
      }]
    };
    const  configSex = {
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
        y: 140,
        style: {
          color: '#888',
          fontSize: '20px',
          fontFamily: fontFamily
        },
      },
      subtitle: {
        text: '',
        floating:true,
        x: -100,
        y: 0,
        style: {
          color: '#333',
          fontSize: '16px',
          fontWeight:400,
          fontFamily: fontFamily
        },
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
        // itemMarginTop: 5,
        // itemMarginBottom: 0,
        x:0,
        y:60,
      },
      plotOptions: {
        pie: {
          showInLegend: true,
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            connectorWidth: 0,          //线长度
            connectorPadding: -20,
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
        allowPointSelect: false,
        innerSize: '65%',//圆环内填充比例
        size: '65%',
        name: '账户资产',
        data: configSexArr
      }]
    };
    const  configTerminal = {
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
          fontSize: '20px',
          fontFamily: fontFamily
        },
      },
      subtitle: {
        text: '',
        floating:true,
        x: -100,
        y: 0,
        style: {
          color: '#333',
          fontSize: '16px',
          fontWeight:400,
          fontFamily: fontFamily
        },
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
        y:46,
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
            connectorWidth: 0,          //线长度
            connectorPadding: -20,
            style: {
              fontSize:16
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
        allowPointSelect: false,
        innerSize: '65%',//圆环内填充比例
        size: '65%',
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
                  <div>
                    <p>{dataAll.baseAmt}元</p>
                    <p>交易额</p>
                  </div>
                </div>
                <div className={styles.pandect}>
                  <img src={require("~/assets/account/find_operdata_profit@2x.png")} alt=""
                       className={styles.pandectImg}/>
                  <div>
                    <p>{dataAll.baseIncome}元</p>
                    <p>用户收益</p>
                  </div>
                </div>
                <div className={styles.pandect}>
                  <img src={require("~/assets/account/find_operdata_people@2x.png")} alt=""
                       className={styles.pandectImg}/>
                  <div>
                    <p>{dataAll.baseCount}人</p>
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
                <img src={require("~/assets/account/find_operdata_map@2x.png")} alt="" className={styles.ChinaImg}/>
                {
                  dataAll.areaTop5.map((item,index)=>{
                    return(
                      <p className={styles.Ranking} key={index}>
                        <span>{index+1}</span>
                        <span className={styles.province}>{item.areaName}</span>
                        <span>{item.showData}元</span>
                      </p>
                    )
                  })
                }


              {/*  <p className={styles.Ranking}>
                  <span> <img src={require("~/assets/account/find_operdata_top1@2x.png")} alt=""
                              className={styles.RankingImg}/></span>
                  <span className={styles.province}>黑龙江省</span>
                  <span>9321692.29元</span>
                </p>
                <p className={styles.Ranking}>
                  <span> <img src={require("~/assets/account/find_operdata_top2@2x.png")} alt=""
                              className={styles.RankingImg}/></span>
                  <span className={styles.province}>湖北省</span>
                  <span>9321692.29元</span>
                </p>
                <p className={styles.Ranking}>
                  <span> <img src={require("~/assets/account/find_operdata_top3@2x.png")} alt=""
                              className={styles.RankingImg}/></span>
                  <span className={styles.province}>福建省</span>
                  <span>9321692.29元</span>
                </p>
                <p className={styles.Ranking}>
                  <span> 4</span>
                  <span className={styles.province}>山东省</span>
                  <span>9321692.29元</span>
                </p>
                <p className={styles.Ranking}>
                  <span> 5</span>
                  <span className={styles.province}>浙江省</span>
                  <span>9321692.29元</span>
                </p>*/}
              </div>
              <h4 className={styles.ReportTitle}><span className={styles.content}>5月份出借用户排名TOP5 <span></span></span></h4>
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
                        <td>{index+1}</td>
                        <td>{item.phone}</td>
                        <td>{item.gender}</td>
                        <td>{item.areaName}</td>
                        <td>{item.showData}</td>
                      </tr>
                    )
                  })
                }
               {/* <tr>
                  <td><img src={require("~/assets/account/find_operdata_top1@2x.png")} alt=""
                           className={styles.lendImg}/></td>
                  <td>185******69</td>
                  <td>女</td>
                  <td>黑龙江</td>
                  <td>69543423.21</td>
                </tr>
                <tr>
                  <td><img src={require("~/assets/account/find_operdata_top1@2x.png")} alt=""
                           className={styles.lendImg}/></td>
                  <td>185******69</td>
                  <td>男</td>
                  <td>黑龙江</td>
                  <td>69543423.21</td>
                </tr>
                <tr>
                  <td><img src={require("~/assets/account/find_operdata_top1@2x.png")} alt=""
                           className={styles.lendImg}/></td>
                  <td>185******69</td>
                  <td>男</td>
                  <td>上海</td>
                  <td>69543423.21</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>185******69</td>
                  <td>女</td>
                  <td>浙江</td>
                  <td>69543423.21</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>185******69</td>
                  <td>男</td>
                  <td>福建</td>
                  <td>69543423.21</td>
                </tr>*/}
                </tbody>
              </table>
              {/*图表*/}
              <h4 className={styles.ReportTitle}><span className={styles.content}>5月份出借用户性别数据 <span></span></span></h4>
              <div className={styles.chartBox}>
                <ReactHighcharts config={configSex} ref="chart"/>
              </div>
              <h4 className={styles.ReportTitle}><span className={styles.content}>5月份出借终端数据 <span></span></span></h4>
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

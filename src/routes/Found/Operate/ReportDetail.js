/* 运营报告详情*/
import React from 'react';
import { connect } from 'dva';
import styles  from './ReportDetail.less';
import Information from "~/components/Information/Information";
/*图表*/
import ReactHighcharts from 'react-highcharts';
const fontFamily = '"Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';

@connect(state => ({
  global: state.global,
}))
export default class ReportDetail extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      arr:[
        {'img':"~/assets/account/find_operdata_top1@2x.png",'province':'黑龙江省','money':'9321692.29元','sex':'女','model':'185******69'},
        {'img':"~/assets/account/find_operdata_top2@2x.png",'province':'黑龙江省','money':'9321692.29元','sex':'男','model':'185******69'},
        {'img':"~/assets/account/find_operdata_top3@2x.png",'province':'上海','money':'9321692.29元','sex':'男','model':'185******69'},
        {'img':"4",'province':'浙江','money':'9321692.29元','sex':'女','model':'185******69'},
        {'img':'5','province':'福建','money':'9321692.29元','sex':'男','model':'185******69'},
      ],
    }
  }

  componentDidMount(){
    let id = this.props.match.params.id;
    console.log(id)
    this.props.dispatch({
      type: 'global/post',
      url:'/api/platform/findRunReportDetail',
      payload:{
        reportId:id
      },
      callback:(res)=>{
        console.log(res)

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
          fontSize: '12px',
          fontFamily: fontFamily
        },
      },
      subtitle: {
        text: '5月份项目发布数量共100个',
        floating:true,
        x: 10,
        y: 250,
        style: {
          color: '#333',
          fontSize: '13px',
          fontWeight:900,
          fontFamily: fontFamily
        },
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        followTouchMove:true
      },
      legend: {
        layout: 'horizontal',
        align: 'right',           //水平方向位置
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
            connectorWidth: 1,          //线长度
            x:0,
            y:0,
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

        ]
      }]
    };
    return(
      <div>
        <Information>
        <h4 className={styles.Beian}> <span className={styles.content}>5月份数据总览 <span></span></span></h4>
          <div className={styles.pandectBox}>
              <div className={styles.pandect}>
                <img src={require("~/assets/account/find_operdata_money@2x.png")} alt="" className={styles.pandectImg}/>
                <div>
                  <p>5535000元</p>
                  <p>交易额</p>
                </div>
              </div>
            <div className={styles.pandect}>
              <img src={require("~/assets/account/find_operdata_profit@2x.png")} alt="" className={styles.pandectImg}/>
              <div>
                <p>28756元</p>
                <p>用户收益</p>
              </div>
            </div>
            <div className={styles.pandect}>
              <img src={require("~/assets/account/find_operdata_people@2x.png")} alt="" className={styles.pandectImg}/>
              <div>
                <p>693人</p>
                <p>注册人数</p>
              </div>
            </div>
          </div>
          <h4 className={styles.Beian}> <span className={styles.content}>5月份项目发布数据 <span></span></span></h4>
          <div className={styles.chartBox}>
            <ReactHighcharts config={config} ref="chart"/>
          </div>
          <h4 className={styles.Beian}> <span className={styles.content}>5月份出借地域数据TOP5 <span></span></span></h4>
          <div className={styles.ChinaBox}>
            <img src={require("~/assets/account/find_operdata_map@2x.png")} alt="" className={styles.ChinaImg}/>
            <p className={styles.Ranking}>
              <span> <img src={require("~/assets/account/find_operdata_top1@2x.png")} alt="" className={styles.RankingImg}/></span>
              <span className={styles.province}>黑龙江省</span>
              <span>9321692.29元</span>
            </p>
            <p className={styles.Ranking}>
              <span> <img src={require("~/assets/account/find_operdata_top2@2x.png")} alt="" className={styles.RankingImg}/></span>
              <span className={styles.province}>湖北省</span>
              <span>9321692.29元</span>
            </p>
            <p className={styles.Ranking}>
              <span> <img src={require("~/assets/account/find_operdata_top3@2x.png")} alt="" className={styles.RankingImg}/></span>
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
            </p>
          </div>
          <h4 className={styles.Beian}> <span className={styles.content}>5月份出借用户排名TOP5 <span></span></span></h4>
          <table className={styles.lendRanking}>
            <tr>
              <th>排名</th>
              <th>出借用户</th>
              <th>性别</th>
              <th>省份</th>
              <th>出借金额</th>
            </tr>
            <tr>
              <td><img src={require("~/assets/account/find_operdata_top1@2x.png")} alt="" className={styles.lendImg}/></td>
              <td>185******69</td>
              <td>女</td>
              <td>黑龙江</td>
              <td>69543423.21</td>
            </tr>
            <tr>
              <td><img src={require("~/assets/account/find_operdata_top1@2x.png")} alt="" className={styles.lendImg}/></td>
              <td>185******69</td>
              <td>男</td>
              <td>黑龙江</td>
              <td>69543423.21</td>
            </tr>
            <tr>
              <td><img src={require("~/assets/account/find_operdata_top1@2x.png")} alt="" className={styles.lendImg}/></td>
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
            </tr>
          </table>
            {/*图表*/}
          <h4 className={styles.Beian}> <span className={styles.content}>5月份出借用户性别数据 <span></span></span></h4>
          <div className={styles.chartBox}>
            <ReactHighcharts config={config} ref="chart"/>
          </div>
          <h4 className={styles.Beian}> <span className={styles.content}>5月份出借终端数据 <span></span></span></h4>
          <div className={styles.chartBox}>
            <ReactHighcharts config={config} ref="chart"/>
          </div>

          <div className={styles.bottomBox}>
            <span>法定代表人签名：</span>
            <img src={require("~/assets/account/find_autograph@2x.png")} alt="" className={styles.img}/>
          </div>


















          </Information>
      </div>
    )
  }

}

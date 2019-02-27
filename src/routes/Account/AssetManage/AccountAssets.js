import React from 'react';
import { connect } from 'dva';
import styles from './AccountAssets.less'
import { Link } from 'dva/router';
import Loading from '~/components/Common/Loading';
import ReactHighcharts from 'react-highcharts';
import { str2Number } from '~/utils/utils';

@connect(state => ({
  global: state.global,
}))
export default class AccountAssets extends React.Component {
  constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.loading = true;
    this.state = {
          data:{}
    }
  }
  componentDidMount(){
    this.AssetDetails()
  }

  AssetDetails=()=>{
    if(!this.ajaxFlag) return;
    this.ajaxFlag = false;

    let { userId } = this.props.global.currentUser.userInfo;

    this.props.dispatch({
      type: 'global/post',
      url: '/api/personalCenterUser/getAssetDetails',
      payload: {
        userId
      },
      callback: (res) => {
        this.loading = false;
        if(res.code===0){
          this.setState({
              data:res.data
          })
       }
      }
    })
  };
  render(){
    const {data}=this.state;

    let config;
    if(data.accountTol==='0.00'){
     config={
           chart: {
             height:300,
             spacing : [0, 0 , 0, 0]
           },
           credits: {
             enabled: false  //版权开关
           },
           title: {
             floating:true,
             text: null,
           },
           tooltip: {
             enabled: false  //提示框开关
           },
           legend: {
             enabled: false  //图例开关
           },
           colors: [
             {
               linearGradient: { x1: 0.2, x2: 0.2, y1: 0.2, y2: 1 },
               stops: [
                 [1, '#F5F5F5']
               ]
             },
           ],
           plotOptions: {
             series: {
               allowPointSelect: false //点击动画开关
             },
             pie: {
               allowPointSelect: true,
               cursor: 'pointer',
               dataLabels: {
                 enabled: false,
               },
             }
           },
           series: [{
             type: 'pie',
             innerSize: '75%',
             size:'70%',
             name: '市场份额',
             data: [
               ['账户可用余额',  100],

             ]
           }]
         };
    }else {
      config={
        chart: {
          height:300,
          spacing : [0, 0 , 0, 0]
        },
        credits: {
          enabled: false  //版权开关
        },
        title: {
          floating:true,
          text: null,
        },
        tooltip: {
          enabled: false  //提示框开关
        },
        legend: {
          enabled: false  //图例开关
        },
        colors: [
          {
            linearGradient: { x1: 0.2, x2: 0.2, y1: 0.2, y2: 1 },
            stops: [
              [1, '#F18925']
            ]
          },
          {
            linearGradient: { x1: 0.2, x2: 0.2, y1: 1, y2: 0.2 },
            stops: [
              [1, '#0D2F55']
            ]
          },
          {
            linearGradient: { x1: 0.2, x2: 0.2, y1: 1, y2: 0.2 },
            stops: [
              [1, '#71829B']
            ]
          },

          {
            linearGradient: { x1: 0.2, x2: 0.2, y1: 1, y2: 0.2 },
            stops: [
              [1, '#FDE7D6']
            ]
          }
        ],
        plotOptions: {
          series: {
            allowPointSelect: false //点击动画开关
          },
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false,
            },
          }
        },
        series: [{
          type: 'pie',
          innerSize: '75%',
          size:'70%',
          name: '市场份额',
          data: [
            ['账户可用余额',parseFloat(data.freeAmt)],
            ['冻结金额', parseFloat(data.frozenAmt)],
            ['待收本金',parseFloat(data.frozenAmt)],
            ['待收回报',parseFloat(data.gainingprincipal)]
          ]
        }]
      };
    }




    return(
      <div className={styles.AccountAssetsBox}>
        {
          this.loading
            ?
            <Loading/>
            :
            <div className={styles.AssetsChartsBox}>
              <ReactHighcharts config={config} ref="chart"/>
              <div className={styles.AssetsChartsContent}>
                <p>{data.accountTol}</p>
                <p>资产总额(元)</p>
              </div>
              <div className={styles.LegendBox}>
                <p>
                  <span className={styles.LegendColor1}> </span>
                  <span>账户可用余额 {data.freeAmt}</span>
                </p>
                <p>
                  <span className={styles.LegendColor2}> </span>
                  <span>冻结金额 {data.frozenAmt}</span>
                </p>
                <p>
                  <span className={styles.LegendColor3}> </span>
                  <span>待收本金 {data.gainingAmt}</span>
                </p>
                <p>
                  <span className={styles.LegendColor4}> </span>
                  <span>待收回报 {data.gainingprincipal}</span>
                </p>
              </div>

            </div>
        }
      </div>
    )
  }

}

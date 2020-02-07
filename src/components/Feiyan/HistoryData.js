import React from 'react'
import {connect} from 'dva';
import {Toast} from 'antd-mobile';
import styles from '~/routes/Other/Feiyan.less'

import Loading from '~/components/Common/Loading'
import HighLine from '~/components/Table/HighLine';

@connect(state => ({
  global: state.global,
}))
export default class HistoryData extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      historyData: '', // 历史数据
    }
  }

  componentDidMount(){
    this.queryHistoryData()
  }

  // 历史数据
  queryHistoryData(){
    this.props.dispatch({
      type: 'global/post',
      url: '/api/pneumonia/history',
      payload: {},
      callback: (res) => {
        if (res.code === '0') {
          const resData = res.data.reverse();
          const data = {
            start_date: new Date(resData[0].date).getTime(),
            confirmedNum: [],
            suspectedNum: [],
            curesNum: [],
            deathsNum: []
          }
          for(let i in resData){
            data.confirmedNum.push(resData[i].confirmedNum);
            data.suspectedNum.push(resData[i].suspectedNum);
            data.curesNum.push(resData[i].curesNum);
            data.deathsNum.push(resData[i].deathsNum);
          }
          this.setState({
            loading: false,
            historyData: data,
          })
        } else {
          Toast.info(res.msg, 2);
        }
      }
    })
  }

  render(){

    const { loading, historyData } = this.state;

    return(
      <>
      {
        loading ?
          <Loading/>
          :
          <div className={styles.section + " " + styles.section2}>
            <h2>全国疫情累计趋势图 <i/></h2>
            <div className={styles.con}>

              <HighLine
                startDate={historyData.start_date}
                data={[
                  {
                    name: '确诊',
                    data: historyData.confirmedNum,
                    color: '#a24d4c'
                  },
                  {
                    name: '疑似',
                    data: historyData.suspectedNum,
                    color: '#f38a6a'
                  }
                ]}
              />

              <HighLine
                startDate={historyData.start_date}
                data={[
                  {
                    name: '治愈',
                    data: historyData.curesNum,
                    color: '#569f5d'
                  },
                  {
                    name: '死亡',
                    data: historyData.deathsNum,
                    color: '#aaa'
                  }
                ]}
              />

            </div>
          </div>
      }
      </>
    )
  }

}
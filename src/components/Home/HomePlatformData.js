import React from 'react';
import { connect } from 'dva';
import styles from './HomePlatformData.less'

import CountUp from 'react-countup';

@connect(state => ({
  global: state.global,
}))
export default class HomePlatformData extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      data: '',
      day: ''
    }
  }

  componentDidMount(){
    this.queryPlatformData()
  }

  queryPlatformData(){
    this.props.dispatch({
      type: 'global/post',
      url: '/api/home/pc/findOperatingBaseInfo',
      payload: {},
      callback: (res) => {
        this.loading = false;
        if(res.code === 0){
          let day = this.calculateDiffTime(res.data.operatingdDays, new Date().getTime());
          this.setState({
            loading: false,
            data: res.data,
            day: day,
          })
        }
      }
    })
  }

  // //计算天数
  // var timeDiff = endTime - startTime
  // var year = Math.floor(timeDiff / 86400 / 365);
  // timeDiff = timeDiff % (86400 * 365);
  // var month = Math.floor(timeDiff / 86400 / 30);
  // timeDiff = timeDiff % (86400 * 30);
  // var day = Math.floor(timeDiff / 86400);
  // timeDiff = timeDiff % 86400;
  // var hour = Math.floor(timeDiff / 3600);
  // timeDiff = timeDiff % 3600;
  // var minute = Math.floor(timeDiff / 60);
  // timeDiff = timeDiff % 60;
  // var second = timeDiff;
  // return [year, month, day, hour, minute, second]
  calculateDiffTime = (startTime, endTime) => {

    let timeDiff = parseInt((endTime - startTime) / 1000, 10);
    return parseInt(timeDiff / 86400, 10);

  };

  render(){

    const {loading, data, day} = this.state;

    let dayLength = [];
    if(day){
      for(let i=0;i<day.toString().length;i++){
        dayLength.push(i)
      }
    }

    return(

      <div className={styles.platformData}>
        {
          loading ?
            null
            :
            <div>

              <div className={styles.box + " " + styles.box1}>
                <h4>
                  <span>平台安全运营</span>
                  <hr/>
                </h4>
                <p className={styles.data}>
                  <span className={styles.dayBox}>
                    <em className={styles.dayBg}>
                      {
                        dayLength.map((item, index) => (
                          <i key={index}/>
                        ))
                      }
                    </em>
                    <CountUp
                      end={day}
                      duration={1}
                      className={styles.dayCount}
                    />
                  </span>
                  <em className={styles.suffix}>天</em>
                </p>
              </div>

              <div className={styles.box}>
                <label className={styles.title}>注册/实缴资本</label>
                <p className={styles.data}>
                  <span>{data.registeredCapital}</span>
                  <em className={styles.suffix}>元</em>
                </p>
              </div>

            </div>
        }
      </div>

    )
  }
}

import React from 'react'
import {connect} from 'dva';
import {Toast} from 'antd-mobile';
import styles from '~/routes/Other/Feiyan.less'

import Loading from '~/components/Common/Loading'

@connect(state => ({
  global: state.global,
}))
export default class Rumours extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      rumoursData: '', // 新闻数据
    }
  }

  componentDidMount(){
    this.queryRumoursData()
  }

  queryRumoursData(){
    this.props.dispatch({
      type: 'global/post',
      url: '/api/pneumonia/loadmore',
      payload: {},
      callback: (res) => {
        if (res.code === '0') {
          this.setState({
            loading: false,
            rumoursData: res.data,
          })
        } else {
          Toast.info(res.msg, 2);
        }
      }
    })
  }

  render(){

    const { loading, rumoursData } = this.state;

    return(
      <>
      {
        loading ?
          <Loading/>
          :
          <div className={styles.section + " " + styles.rumours}>
            <h2>真假辟谣 <i/></h2>
            <div className={styles.con}>
              {
                rumoursData.map((item, index) => (
                  <div key={index} className={styles.item + " " + (item.result === '真' ? styles.true : styles.false)}>
                    <div className={styles.h}>
                      <p className={styles.title}><strong>{item.title}</strong></p>
                      <p className={styles.date}>{item.date}</p>
                    </div>
                    <div className={styles.b}>
                      <p>{item.summary}</p>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
      }
      </>
    )
  }

}
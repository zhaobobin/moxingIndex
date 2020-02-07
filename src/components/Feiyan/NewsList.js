import React from 'react'
import {connect} from 'dva';
import {Toast} from 'antd-mobile';
import styles from '~/routes/Other/Feiyan.less'

import Loading from '~/components/Common/Loading'

@connect(state => ({
  global: state.global,
}))
export default class NewsList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      newsData: '', // 新闻数据
    }
  }

  componentDidMount(){
    this.queryNewsData()
  }

  queryNewsData(){
    this.props.dispatch({
      type: 'global/post',
      url: '/api/pneumonia/news',
      payload: {},
      callback: (res) => {
        if (res.code === '0') {
          this.setState({
            loading: false,
            newsData: res.data,
          })
        } else {
          Toast.info(res.msg || '请求失败', 2);
          this.setState({
            loading: false,
          })
        }
      }
    })
  }

  render(){

    const { loading, newsData } = this.state;

    return(
      <>
      {
        loading ?
          <Loading/>
          :
          <div className={styles.section + " " + styles.news}>
            <h2>最新进展 <i/></h2>
            <div className={styles.con}>
              {
                newsData ?
                  newsData.map((item, index) => (
                    <div key={index} className={styles.item}>
                      <p className={styles.date}>{item.pubDate}</p>
                      <p className={styles.title}>{item.title}</p>
                      <p className={styles.desc}>{item.summary}</p>
                      <p className={styles.source}>来源：{item.infoSource}</p>
                      <i className={styles.arrow}/>
                    </div>
                  ))
                  : null
              }
            </div>
          </div>
      }
      </>
    )
  }

}
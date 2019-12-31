 /**
 * 活动 - 详情
 */
import React from 'react'
import {connect} from 'dva';
import { Link } from 'dva/router'
import {Toast} from 'antd-mobile';
import styles from './ActivityDetail.less'

import mapIcon from '~/assets/com/map.png'
import Loading from '~/components/Common/Loading'

@connect(state => ({
 global: state.global,
}))
export default class ActivityDetail extends React.Component{

  constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.state = {
      loading: true,
      id: '',
      detail: '',
    }
  }

  componentDidMount(){
    window.scrollTo(0, 0);
    let id = this.props.match.params.id;
    this.queryDetail(id);
  }

  //处理用户登录、退出时，重新渲染文章数据
  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.match.params.id !== this.props.match.params.id){
      let id = nextProps.match.params.id;
      this.queryDetail(id);
    }
  }

  // 活动详情
  queryDetail = (id) => {
    this.props.dispatch({
      type: 'global/post',
      url: '/api/activities/activities',
      payload: {
        id
      },
      callback: (res) => {
        setTimeout(() => { this.ajaxFlag = true }, 500)
        if (res.code === '0') {
          this.setState({
            id,
            loading: false,
            detail: res.data
          })
        } else {
          Toast.info(res.msg, 2);
        }
      }
    })
  }

  render(){

    const { id, loading, detail } = this.state;

    return(
      <>
      {
        loading ?
          <Loading/>
          :
          <div className={styles.container}>

            <div className={styles.head}>
              <div className={styles.bg} style={{
                backgroundImage: `url(${detail.image})`
              }}>
                <div className={styles.thumb}>
                  <img src={detail.share_image} alt="img"/>
                </div>
                <p className={styles.title}>{detail.title}</p>
                <p className={styles.price}>¥{detail.range}</p>
              </div>
            </div>

            <div className={styles.body}>
              <div className={styles.date}>
                <p>{detail.start_time}</p>
                <p>{detail.end_time}</p>
              </div>
              <div className={styles.info}>
                <p><strong>{detail.title}</strong></p>
                <p className={styles.place}>{detail.place_details}</p>
                <Link to={`/m/activity/address/${detail.place}`} className={styles.address}>
                  <img src={mapIcon} alt="address"/>
                </Link>
              </div>
              <div className={styles.introduce}>
                <h2>展会介绍</h2>
                <div className={styles.content} dangerouslySetInnerHTML={{__html: detail.content}}/>
              </div>
            </div>

            <div className={styles.foot}>
              {
                detail.state === '1' ?
                  <Link to={`/m/activity/order/${id}`} className={styles.start}>
                    立即报名
                  </Link>
                  :
                  null
              }
              {
                detail.state === '0' ?
                  <a className={styles.disabled}>
                    未开售
                  </a>
                  :
                  null
              }
              {
                detail.state === '2' ?
                  <a className={styles.disabled}>
                    已结束
                  </a>
                  :
                  null
              }
            </div>

          </div>
      }
      </>
    )
  }

}

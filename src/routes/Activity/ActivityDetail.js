 /**
 * 活动 - 详情
 */
import React from 'react'
import {connect} from 'dva';
import { Link } from 'dva/router'
import {Toast} from 'antd-mobile';
import styles from './ActivityDetail.less'

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
          null
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

            <div className={styles.foot}>
              {
                detail.state === '1' ?
                  <Link to={`/activity/order/${id}`} className={styles.start}>
                    立即报名
                  </Link>
                  :
                  null
              }
              {
                detail.state === '0' ?
                  <Link className={styles.disabled}>
                    未开售
                  </Link>
                  :
                  null
              }
              {
                detail.state === '2' ?
                  <Link className={styles.disabled}>
                    已结束
                  </Link>
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

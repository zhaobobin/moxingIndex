import React from 'react'
import {connect} from 'dva';
import { Link, routerRedux } from 'dva/router'
import { Carousel, Toast, Modal } from 'antd-mobile';
import styles from './ActivityTicket.less'

@connect(state => ({
  global: state.global,
}))
export default class ActivityTicket extends React.Component{

  constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.state = {
      loading: true,
      order_no: '',
      detail: '',
    }
  }

  componentDidMount(){
    window.scrollTo(0, 0);
    const { isAuth } = this.props.global;
    if(isAuth) {
      let order_no = this.props.match.params.order_no;
      this.queryDetail(order_no);
    } else {
      this.props.dispatch(routerRedux.push(`/user/login?redirect=${encodeURIComponent(window.location.pathname)}`))
    }

  }

  //处理用户登录、退出时，重新渲染文章数据
  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.match.params.order_no !== this.props.match.params.order_no){
      let order_no = nextProps.match.params.order_no;
      this.queryDetail(order_no);
    }
  }

  // 门票详情
  queryDetail = (order_no) => {
    this.props.dispatch({
      type: 'global/post',
      url: '/api/activity/ticket',
      payload: {
        order_no
      },
      callback: (res) => {
        setTimeout(() => { this.ajaxFlag = true }, 500)
        if (res.code === '0') {
          this.setState({
            order_no,
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

    const { loading, detail } = this.state;

    return(
      <>
      {
        loading ?
          null
          :
          <div className={styles.container}>
            门票详情
          </div>
      }
      </>
    )
  }

}

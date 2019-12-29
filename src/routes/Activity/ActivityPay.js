/**
 * 活动 - 支付
 */
import React from 'react'
import {connect} from 'dva';
import { Carousel, Toast } from 'antd-mobile';

@connect(state => ({
  global: state.global,
}))
export default class ActivityPay extends React.Component{

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

  // 活动票务详情报名详情
  queryDetail = (id) => {
    this.props.dispatch({
      type: 'global/post',
      url: '/api/activity/ticket',
      payload: {
        order_no: id
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
    return(
      <div>
        <h2>购票成功</h2>
      </div>
    )
  }

}

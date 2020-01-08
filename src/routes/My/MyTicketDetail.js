/**
 * 活动 - 详情
 */
import React from 'react'
import {connect} from 'dva';
import { Link } from 'dva/router'
import { Carousel, Toast } from 'antd-mobile';
import styles from './MyTicketDetail.less'

import mapIcon from '~/assets/com/map.png'
import Loading from '~/components/Common/Loading'

@connect(state => ({
  global: state.global,
}))
export default class MyTicketDetail extends React.Component{

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
    let order_no = this.props.match.params.order_no;
    this.queryDetail(order_no);
  }

  //处理用户登录、退出时，重新渲染文章数据
  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.match.params.order_no !== this.props.match.params.order_no){
      let order_no = nextProps.match.params.order_no;
      this.queryDetail(order_no);
    }
  }

  // 活动详情
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
          <Loading/>
          :
          <div className={styles.container}>

            <div className={styles.head + " " + styles.section}>
              {
                detail.ticket.length > 1 ?
                  <Carousel autoplay={false} infinite>
                    {
                      detail.ticket.map((item, index) => (
                        <div key={index} className={styles.item}>
                          <span className={styles.state}>{item.is_use === '1' ? '已使用' : '未使用'}</span>
                          <p className={styles.name}><strong>{item.name}</strong></p>
                          <p><label>使用时间</label><span>{item.time}</span></p>
                          <p><label>门票数量</label><span>{detail.ticket.length}</span></p>
                          <p><label>门票价格</label><span>{item.ticket_price}</span></p>
                          <p><label>姓名</label><span>{item.u_name}</span></p>
                          <p><label>手机号</label><span>{item.u_tel}</span></p>
                          <p><img src={item.image} alt="ma"/></p>
                          <p className={styles.ma}>验证码：{item.code}</p>
                        </div>
                      ))
                    }
                  </Carousel>
                  :
                  detail.ticket.map((item, index) => (
                    <div key={index} className={styles.item}>
                      <span className={styles.state}>{item.is_use === '1' ? '已使用' : '未使用'}</span>
                      <p className={styles.name}><strong>{item.name}</strong></p>
                      <p><label>使用时间</label><span>{item.time}</span></p>
                      <p><label>门票数量</label><span>{detail.ticket.length}</span></p>
                      <p><label>门票价格</label><span>{item.ticket_price}</span></p>
                      <p><label>姓名</label><span>{item.u_name}</span></p>
                      <p><label>手机号</label><span>{item.u_tel}</span></p>
                      <p><img src={item.image} alt="ma"/></p>
                      <p className={styles.ma}>验证码：{item.code}</p>
                    </div>
                  ))
              }

            </div>

            <div className={styles.foot + " " + styles.section}>
              <p><label>订单号</label><span>{detail.order_no}</span></p>
              <p><label>总价</label><span>{detail.price}</span></p>
              <div className={styles.line}/>
              <p className={styles.place}>{detail.place}</p>
              <Link to={`/m/activity/address/${detail.place}`} className={styles.address}>
                <img src={mapIcon} alt="address"/>
              </Link>
            </div>

          </div>
      }
      </>
    )
  }

}

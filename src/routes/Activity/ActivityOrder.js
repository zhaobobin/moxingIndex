/**
 * 活动 - 订单
 */
import React from 'react'
import {connect} from 'dva';
import { Link, routerRedux } from 'dva/router'
import { Row, Col, Button, Icon } from 'antd'
import { Toast, Modal } from 'antd-mobile';
import moment from 'moment'
import { filterTel, Storage, ENV } from '~/utils/utils'
import styles from './ActivityOrder.less'

import InputNumberPlus from '~/components/Form/InputNumberPlus'
import ActivitySignModal from '~/components/Activity/ActivitySignModal'

@connect(state => ({
  global: state.global,
}))
export default class ActivityOrder extends React.Component{

  constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.state = {
      loading: true,
      id: '',
      type: this.props.match.params.type,
      detail: '',
      currentRound: 0,  //当前轮次
      currentTicket: 0, //当前门票
      currentTicketPrice: 0, //当前票价
      totalTicketNumber: 1, //总票数
      totalTicketPrice: 0, //总票价
      signModalVisible: false,
      memberList: []
    }
  }

  componentDidMount(){
    window.scrollTo(0, 0);
    const { isAuth } = this.props.global;
    if(isAuth) {
      let id = this.props.match.params.id;
      this.queryDetail(id);
    } else {
      this.props.dispatch(routerRedux.push(`/user/login?redirect=${encodeURIComponent(window.location.pathname)}`))
    }
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
      url: '/api/activities/signnew',
      payload: {
        id
      },
      callback: (res) => {
        setTimeout(() => { this.ajaxFlag = true }, 500)
        if (res.code === '0') {
          if(res.data.length > 0) {
            const detail = res.data,
              currentTicketPrice = detail[0].ticket[0].price,
              totalTicketPrice = currentTicketPrice * 1;
            this.setState({
              id,
              loading: false,
              detail,
              currentTicketPrice,
              totalTicketPrice
            })
          } else {
            Toast.info('暂无报名信息', 2);
            window.history.go(-1); // 内容为空
          }
        } else {
          Toast.info(res.msg, 2);
          if(res.code === '1075') window.history.go(-1);
        }
      }
    })
  }

  selectRound = (index) => {
    const { detail, totalTicketNumber } = this.state;
    const currentTicketPrice = detail[index].ticket[0].price,
      totalTicketPrice = currentTicketPrice * totalTicketNumber
    this.setState({
      currentRound: index,
      currentTicket: 0,
      currentTicketPrice,
      totalTicketPrice
    })
  }

  selectTicket = (index) => {
    const { detail, currentRound, totalTicketNumber } = this.state;
    const currentTicketPrice = detail[currentRound].ticket[index].price,
      totalTicketPrice = currentTicketPrice * totalTicketNumber
    this.setState({
      currentTicket: index,
      currentTicketPrice,
      totalTicketPrice
    })
  }

  InputNumberPlusCb = (value) => {
    const { currentTicketPrice } = this.state;
    this.setState({
      totalTicketNumber: value,
      totalTicketPrice: currentTicketPrice * value
    })
  }

  // sign
  showSignModal = () => {
    this.activitySignModal.show()
  }

  addSignCb = (values) => {
    let { memberList } = this.state;
    memberList.unshift(values);
    this.setState({
      memberList
    })
  }

  delSignMember = (index) => {
    let { memberList } = this.state;
    memberList.splice(index, 1)
    this.setState({
      memberList
    })
  }

  // 创建活动订单
  createOrder = () => {

    if(!this.ajaxFlag) return;
    this.ajaxFlag = false;

    const { uid } = this.props.global.currentUser.userInfo,
      {
        id, type, detail, currentRound, currentTicket,
        totalTicketNumber, totalTicketPrice, memberList
      } = this.state;

    if(memberList.length === 0){
      Toast.info('请添加参会人员', 2);
      this.ajaxFlag = true;
      return false;
    }

    let ticketArr = [];
    let ticketDetail = detail[currentRound].ticket[currentTicket];
    ticketDetail.num = totalTicketNumber;
    ticketDetail.start_time = detail[currentRound].start_time;
    ticketDetail.end_time = detail[currentRound].end_time;
    // let member_detail = [];
    // for(let i in memberList) {
    //
    // }
    ticketDetail.member_detail = memberList;
    ticketArr.push(ticketDetail)
    ticketArr = JSON.stringify(ticketArr)

    this.props.dispatch({
      type: 'global/post',
      url: '/api/orderweb/create',
      payload: {
        uid,
        activity_id: id,
        type,
        order_amount: totalTicketPrice,
        ticket: ticketArr
      },
      callback: (res) => {
        setTimeout(() => { this.ajaxFlag = true }, 500);
        if (res.code === 0) {
          Storage.set('orderInfo', {
            order_no: res.data.order_no,
            order_amount: totalTicketPrice,
          })
          const ua = window.navigator.userAgent.toLowerCase();
          if(ua.match(/MicroMessenger/i) == "micromessenger") {
            window.location.replace(`${window.location.origin}/m/activity/pay/${res.data.order_no}?token=${Storage.get(ENV.storageAccessToken)}`);
          } else {
            this.props.dispatch(routerRedux.push(`/m/activity/pay/${res.data.order_no}`))
          }
        } else {
          Toast.info(res.msg, 2);
        }
      }
    })
  }

  render(){

    const {
      id, loading, detail,
      currentRound, currentTicket,
      currentTicketPrice, totalTicketPrice,
      memberList
    } = this.state;

    return(
      <>
      {
        loading ?
          null
          :
          <div className={styles.container}>

            <div className={styles.content}>

              <div className={styles.section + " " + styles.section1}>
                <h2>选择场次</h2>
                <div className={styles.con}>
                  {
                    detail.map((item, index) => (
                      <div key={index} className={styles.item}>
                        <a
                          className={currentRound === index ? styles.current : null}
                          onClick={() => this.selectRound(index)}
                        >
                          {/*<span>{item.name}</span>*/}
                          <span>{moment(item.start_time).format('YYYY-MM-DD HH:ss')}</span>
                          <span>~</span>
                          <span>{moment(item.end_time).format('HH:ss')}</span>
                        </a>
                      </div>
                    ))
                  }
                </div>
              </div>

              <div className={styles.section + " " + styles.section2}>
                <h2>门票种类</h2>
                <div className={styles.con}>
                  <Row gutter={10}>
                    {
                      detail[currentRound].ticket.map((item, index) => (
                        <Col span={12} key={index} className={styles.item}>
                          <a
                            className={currentTicket === index ? styles.current : null}
                            onClick={() => this.selectTicket(index)}
                          >
                            <span>{item.name}</span>
                          </a>
                        </Col>
                      ))
                    }
                  </Row>
                </div>
              </div>

              <div className={styles.section + " " + styles.section3}>
                <h2>门票单价</h2>
                <div className={styles.con}>
                  <label className={styles.label}>常规票</label>
                  <span className={styles.p}>¥ {currentTicketPrice}</span>
                </div>
              </div>

              <div className={styles.section + " " + styles.section4}>
                <h2>选择数量</h2>
                <div className={styles.con}>
                  <label>常规票</label>
                  <span className={styles.p}>
                    <InputNumberPlus callback={this.InputNumberPlusCb}/>
                  </span>
                </div>
              </div>

              <div className={styles.section + " " + styles.section5}>
                <h2>参会成员</h2>
                <div className={styles.con}>
                  {
                    memberList.map((item, index) => (
                      <div key={index} className={styles.item}>
                        <span className={styles.avatar}><Icon type="user"/></span>
                        <p className={styles.name}>{item.name}</p>
                        <p className={styles.mobile}>{filterTel(item.mobile)}</p>
                        <a className={styles.del} onClick={() => this.delSignMember(index)}>
                          <Icon type="minus-circle" />
                          <span>移除</span>
                        </a>
                      </div>
                    ))
                  }
                  <Button
                    type="primary"
                    size="large"
                    icon="plus-circle"
                    ghost
                    onClick={this.showSignModal}>
                    添加参会成员
                  </Button>
                </div>
              </div>

            </div>

            <div className={styles.foot}>

              <div className={styles.right}>
                <a className={styles.start} onClick={this.createOrder}>
                  立即购买
                </a>
              </div>

              <div className={styles.left}>
                总价：
                <span>¥{totalTicketPrice}</span>
              </div>

            </div>

            <ActivitySignModal
              onRef={e => this.activitySignModal = e}
              explain={detail[currentRound].ticket[currentTicket].explain}
              callback={this.addSignCb}
            />

          </div>
      }
      </>
    )
  }

}

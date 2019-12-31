/**
 * 活动 - 订单
 */
import React from 'react'
import {connect} from 'dva';
import { Link } from 'dva/router'
import { Row, Col, Button, Icon } from 'antd'
import { Toast, Modal } from 'antd-mobile';
import moment from 'moment'
import { filterTel } from '~/utils/utils'
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
      url: '/api/activities/sign',
      payload: {
        id
      },
      callback: (res) => {
        setTimeout(() => { this.ajaxFlag = true }, 500)
        if (res.code === '0') {
          const detail = res.data,
            currentTicketPrice = detail[0].ticket[0].price,
            totalTicketPrice = currentTicketPrice * 1
          this.setState({
            id,
            loading: false,
            detail,
            currentTicketPrice,
            totalTicketPrice
          })
        } else {
          Toast.info(res.msg, 2);
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
    console.log(values)
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
                <Link to={`/m/activity/pay/${id}`} className={styles.start}>
                  立即购买
                </Link>
              </div>

              <div className={styles.left}>
                总价：
                <span>¥{totalTicketPrice}</span>
              </div>

            </div>

            <ActivitySignModal
              onRef={e => this.activitySignModal = e}
              callback={this.addSignCb}
            />

          </div>
      }
      </>
    )
  }

}

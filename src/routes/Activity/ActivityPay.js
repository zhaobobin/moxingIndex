/**
 * 活动 - 支付
 */
import React from 'react'
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import { Icon } from 'antd';
import { Carousel, Toast, Modal } from 'antd-mobile';
import { numberFormat, getRandomStr } from '~/utils/utils'
import { getSign } from '~/utils/wechat'
import styles from './ActivityPay.less'

@connect(state => ({
  global: state.global,
  pay: state.pay,
}))
export default class ActivityPay extends React.Component{

  constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.state = {
      loading: true,
      order_no: '',
      detail: '',
      payWay: [
        {
          name: '微信支付',
          key: 'wechat',
          pay_type: '1',
          icon: require('~/assets/com/pay_wechat.png')
        },
        {
          name: '支付宝',
          key: 'ali',
          pay_type: '2',
          icon: require('~/assets/com/pay_ali.png')
        },
      ],
      selectedPayWay: 0,
    }
  }

  componentDidMount(){
    window.scrollTo(0, 0);
    let order_no = this.props.match.params.order_no;
    this.queryDetail(order_no);
    this.getClientIp();
  }

  //处理用户登录、退出时，重新渲染文章数据
  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.match.params.order_no !== this.props.match.params.order_no){
      let order_no = nextProps.match.params.order_no;
      this.queryDetail(order_no);
    }
  }

  // 活动票务详情报名详情
  queryDetail = (order_no) => {
    this.props.dispatch({
      type: 'global/post',
      url: '/api/order/order_details',
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

  getClientIp = () => {
    this.props.dispatch({
      type: 'pay/getClientIp',
    })
  }

  selectPayWay = (index) => {
    this.setState({
      selectedPayWay: index
    })
  }

  submitPay = () => {
    const { selectedPayWay } = this.state;

    // 调用支付
    switch(selectedPayWay){
      case 0: this.callWechatPay(); break;
      case 1: this.callAliPay(); break;
      default: break;
    }
    // 弹框提示
    Modal.alert('微信支付', <div>请确认微信支付是否已完成</div>, [
      { text: '已完成支付', onPress: () => {} },
      { text: '支付遇到问题', onPress: () => {} },
      { text: '取消', onPress: () => {} },
    ])
  }

  // 调用微信支付
  callWechatPay = () => {

    const { order_no, detail } = this.state;

    let data = {
      nonce_str: getRandomStr(32),
      body: '趣族-活动购票',
      out_trade_no: order_no,
      total_fee: detail.goods_amount || 1,
      spbill_create_ip: window.client_ip,
      notify_url: `http://www.moxinga.com/m/activity/pay/${order_no}`,
      trade_type: 'MWEB',
      scene_info: {
        "h5_info":
          {
            "type": "Wap",  //场景类型
            "wap_url": "http://www.moxinga.com/",//WAP网站URL地址
            "wap_name": "趣族"  //WAP 网站名
          }
      }
    }
    data = getSign(data)

    this.props.dispatch({
      type: 'pay/wechat',
      payload: data,
      callback: (res) => {

      }
    })
  }

  callAliPay = () => {

  }

  render(){

    const { loading, payWay, selectedPayWay } = this.state;
    const { orderInfo } = this.props.global;

    return(
      <>
      {
        loading ?
          null
          :
          <div className={styles.container}>

            <div className={styles.section}>
              <h2>支付方式</h2>
              <div className={styles.con}>
                {
                  payWay.map((item, index) => (
                    <div key={index} className={styles.item} onClick={() => this.selectPayWay(index)}>
                      <img src={item.icon} alt="icon" className={styles.icon}/>
                      <span>{item.name}</span>
                      <img src={
                        selectedPayWay === index ?
                          require('~/assets/com/check-circle-fill01@2x.png')
                          :
                          require('~/assets/com/check-circle-fill02@2x.png')
                      } alt="selected" className={styles.selected}/>
                    </div>
                  ))
                }
              </div>
            </div>

            <div className={styles.foot}>
              <div className={styles.left}>
                <label>订单金额：</label>
                <span>{numberFormat(100)}</span>
              </div>
              <div className={styles.right} onClick={this.submitPay}>
                <span>去支付</span>
              </div>
            </div>

          </div>
      }
      </>
    )
  }

}

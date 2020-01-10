/**
 * 活动 - 支付
 */
import React from 'react'
import {connect} from 'dva';
import { routerRedux } from 'dva/router';
import { Icon } from 'antd';
import { Carousel, Toast, Modal } from 'antd-mobile';
import { Storage, ENV, numberFormat, getRandomStr, getUrlParams } from '~/utils/utils'
import { getSign } from '~/utils/wechat'
import styles from './ActivityPay.less'

import ActivityPayWechatModal from '~/components/Activity/ActivityPayWechatModal'
import Loading from '~/components/Common/Loading'

const paramsObj = getUrlParams() || '';

@connect(state => ({
  global: state.global,
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
          pay_type: '2',
          icon: require('~/assets/com/pay_wechat.png')
        },
        {
          name: '支付宝',
          key: 'ali',
          pay_type: '1',
          icon: require('~/assets/com/pay_ali.png')
        },
      ],
      selectedPayWay: 0,
    }
  }

  componentDidMount(){
    window.scrollTo(0, 0);
    const { isAuth } = this.props.global;
    if(isAuth) {
      let order_no = this.props.match.params.order_no;
      // 支付宝回调
      if(paramsObj.sign && paramsObj.method === 'alipay.trade.wap.pay.return') {
        this.props.dispatch(routerRedux.push(`/m/activity/ticket/${order_no}`))
      }
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

  // 活动票务详情报名详情
  queryDetail = (order_no) => {
    this.props.dispatch({
      type: 'global/post',
      url: '/api/activity/ticketnew',
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

  selectPayWay = (index) => {
    this.setState({
      selectedPayWay: index
    })
  }

  // 确定支付
  submitPay = () => {

    if(!this.ajaxFlag) return;
    this.ajaxFlag = false;

    const { uid } = this.props.global.currentUser.userInfo;
    const { detail, selectedPayWay, payWay } = this.state;
    const pay_type = payWay[selectedPayWay].pay_type; // 1：ali、2：wechat

    this.props.dispatch({
      type: 'global/post',
      url: '/api/orderweb/again_pay',
      payload: {
        uid,
        order_no: detail.order_no,
        order_amount: detail.price,
        pay_type,
        token: Storage.get(ENV.storageAccessToken)
      },
      callback: (res) => {
        setTimeout(() => { this.ajaxFlag = true }, 500);
        if(res.code === 0 || res.code === '0') {
          switch(pay_type) {
            case '1':
              this.goAliPay(res.data);
              break;
            case '2':
              this.goWechatPay(res.data);
              break;
            default: break;
          }
        } else {
          Toast.info(res.msg, 2);
        }
      }
    })

  }

  // 支付宝支付
  goAliPay = (data) => {
    const ua = window.navigator.userAgent.toLowerCase();
    // 判断是否是微信
    if(ua.match(/MicroMessenger/i) == "micromessenger") {
      this.activitySignWechatModal.show();
    }else{
      const aliOrderForm = data.ali_order;
      const aliPayDiv = document.getElementById('aliPay');
      aliPayDiv.innerHTML = aliOrderForm;
      document.forms[0].submit();
      this.payAlert();
    }

  }

  // 微信支付
  goWechatPay = (data) => {

  }

  // 支付弹框提示
  payAlert = () => {
    Modal.alert('订单支付', <div>请确认支付是否已完成</div>, [
      { text: '已完成支付',
        onPress: () => {
          if(paramsObj.sign && paramsObj.method === 'alipay.trade.wap.pay.return') {
            this.props.dispatch(routerRedux.push(`/m/activity/ticket/${paramsObj.out_trade_no}`))
          }
        }
      },
      { text: '支付遇到问题', onPress: () => {} },
      { text: '取消', onPress: () => {} },
    ])
  }

  // 查询支付情况
  queryOrderPay = (order_no) => {
    this.props.dispatch({
      type: 'global/post',
      url: '/api/pay/query_order_pay',
      payload: {
        order_no
      },
      callback: (res) => {
        if(res.code === '0') {
          this.props.dispatch(routerRedux.push(`/m/activity/ticket/${order_no}`))
        } else {
          this.queryDetail(order_no);
        }
      }
    })
  }

  // 调用微信支付
  // callWechatPay = () => {
  //
  //   const { order_no, detail } = this.state;
  //
  //   let data = {
  //     nonce_str: getRandomStr(32),
  //     body: '趣族-活动购票',
  //     out_trade_no: order_no,
  //     total_fee: detail.goods_amount || 100,
  //     spbill_create_ip: window.client_ip,
  //     notify_url: 'http://www.moxinga.com/m/activity/pay',
  //     trade_type: 'MWEB',
  //     scene_info: {
  //       "h5_info":
  //         {
  //           "type": "Wap",  //场景类型
  //           "wap_url": "http://www.moxinga.com/",//WAP网站URL地址
  //           "wap_name": "趣族"  //WAP 网站名
  //         }
  //     }
  //   }
  //   data = getSign(data)
  //
  //   this.props.dispatch({
  //     type: 'pay/wechat',
  //     payload: data,
  //     callback: (res) => {
  //
  //     }
  //   })
  // }
  //
  // callAliPay = () => {
  //
  // }

  render(){

    const { loading, detail, payWay, selectedPayWay } = this.state;

    return(
      <>
      {
        loading ?
          <Loading/>
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
                <span>{detail.price ? numberFormat(detail.price) : ''}</span>
              </div>
              <div className={styles.right} onClick={this.submitPay}>
                <span>去支付</span>
              </div>
            </div>

            <div id="aliPay"/>

            <ActivityPayWechatModal onRef={e => this.activitySignWechatModal = e}/>

          </div>
      }
      </>
    )
  }

}

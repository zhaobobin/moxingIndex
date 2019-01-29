import React from 'react';
import { connect } from 'dva';
import YaoqingPackage from '~/components/Hdzq/Yaoqing201902/YaoqingPackage';
import YaoqingRegulation from '~/components/Hdzq/Yaoqing201902/YaoqingRegulation';
import YaoqingReturnMoney from '~/components/Hdzq/Yaoqing201902/YaoqingReturnMoney';
import styles from './Yaoqing201902.less';
import ResultJson from '../../../Result/ResultJson';
import moment from 'moment';
import {interaction} from '~/utils/utils'
import LoadLazy from '~/components/Common/LoadLazy';
import Loading from '~/components/Common/Loading'
@connect(state => ({
  global: state.global,
}))
export default class Yaoqing201812 extends React.Component {
  constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.loading = true;
    this.state = {
      detail:'',
      dataLB:{},
      deviceType:true
    }
  }
  componentDidMount(){
    this.YaoqingButton();
    this.Yaoqing()
  }
  YaoqingButton(){
    const ub = window.navigator.userAgent;
    const ua = ub.toLowerCase();
    if(ub.indexOf('Android') > -1 || ub.indexOf('ios') > -1) {
      this.setState({
        deviceType:true
      })
    }else {
      this.setState({
        deviceType:false
      })
    }
  }
  /*页面接口*/
  Yaoqing(){
    let { userId } = this.props.global.currentUser.userInfo;
    this.props.dispatch({
      type: 'global/post',
      url: '/api/coupon/invitationAward',
      payload: {
        userId:userId || '',
      },
      callback: (res) => {
        this.loading = false;
        if(res.code===0){
          this.YaoqingLunBo(res.data)
        }
      }
    });
  }
  /*轮播接口*/
  YaoqingLunBo(detail){
    this.props.dispatch({
      type: 'global/post',
      url: '/api/coupon/invitationBanner',
      payload: {
        rewardType:1,
      },
      callback: (res) => {
        if(res.code===0){
          this.setState({
            dataLB:res.data.list,
            detail:detail
          })
        }
      }
    })
  }
  /*IOS*/
  setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(window.WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    let WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    // WVJBIframe.src = ‘wvjbscheme://__BRIDGE_LOADED__’;
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(() => { document.documentElement.removeChild(WVJBIframe);}, 0);
  }
  redirect = (action) => {
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //判断是否是 android终端
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断是否是 ios终端
    if (isiOS) {
      /*ios*/
      this.setupWebViewJavascriptBridge( (bridge) => {
        /*  bridge.registerHandler('h5Action', (data, responseCallback) => {
            responseCallback(data);
          });*/
        bridge.callHandler('h5Action', action, (response) => {
        });
      });
    }else if(isAndroid){
      /*Android*/
      window.app.h5Action(action);      //与原生交互
    }else{
      return ''
    }
  };

  render(){
    const {detail,dataLB}=this.state;
    const { userId } =this.props.global.currentUser.userInfo;
    return(
      <div className={styles.YaoqingBox}>
        {
          this.loading ?
            <Loading/>
            :
            <div>
              {/*第一部分*/}
              <LoadLazy height={'19%'}>
                {
                  userId
                    ?
                    <img src={require("~/assets/Invitation/invent_app_stars@2x.png")} className={styles.YaoqingStarImg}/>
                    :
                    null
                }
                <img src={require("~/assets/Invitation/invent_app_top@2x.png")} className={styles.YaoqingBoxHeadImg}/>
                <div className={styles.YaoqingTimeBox}>
                  <p>活动时间</p>
                  <p>{moment(detail.startDate).format("YYYY-MM-DD")}至{moment(detail.endDate).format("YYYY-MM-DD")}</p>
                </div>
              </LoadLazy>


              {/*第二部分*/}
              <div className={styles.YaoqingBoxTwo}>

                <LoadLazy height={'32%'}>
                  <YaoqingPackage {...this.props}  Packagedata={detail} userId={userId} dataLB={dataLB}/>
                </LoadLazy>


                {/*第三部分*/}
                <LoadLazy height={'18%'}>
                  <YaoqingRegulation  />
                </LoadLazy>

                {/*第四部分*/}
                <LoadLazy height={'26%'}>
                  <YaoqingReturnMoney />
                </LoadLazy>

                <div className={styles.YaoqingFooter}> </div>
              </div>

              <p className={styles.YaoqingFooterBox}>
                <img src={require("~/assets/Invitation/invent_app_bt1@2x.png")}  onClick={() => this.redirect(ResultJson.invite_share.action)}/>
                <img src={require(userId ? '~/assets/Invitation/invent_app_bt2@2x.png' : "~/assets/Invitation/invent_app_bt3@2x.png")} onClick={() => this.redirect(userId ? ResultJson.invite.action : ResultJson.invite_login.action)}/>
              </p>
            </div>
        }
      </div>
    )
  }
}


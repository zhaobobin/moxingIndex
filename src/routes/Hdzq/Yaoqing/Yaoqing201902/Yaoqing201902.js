import React from 'react';
import { connect } from 'dva';
import YaoqingHeader from '~/components/Hdzq/Yaoqing201902/YaoqingHeader';
import YaoqingOne from '~/components/Hdzq/Yaoqing201902/YaoqingOne';
import YaoqingTwo from '~/components/Hdzq/Yaoqing201902/YaoqingTwo';
import YaoqingThree from '~/components/Hdzq/Yaoqing201902/YaoqingThree';
import styles from './Yaoqing201902.less';
import ResultJson from '../../../Result/ResultJson';

import {interaction} from '~/utils/utils';
import LoadLazy from '~/components/Common/LoadLazy';
import Loading from '~/components/Common/Loading';

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
      deviceType:true,
      share:null,
      style: {display:"block"},

    }
  }
  componentDidMount(){
    this.Yaoqing();
  }

  /*页面接口*/
  Yaoqing(){
    let { userId } = this.props.global.currentUser.userInfo;
    this.props.dispatch({
      type: 'global/post',
      url: '/api/coupon/invitationToBid',
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
         rewardType:2,
       },
       callback: (res) => {
         if(res.code===0){
           const u = window.navigator.userAgent;
           //判断设备
           if(u.indexOf('iPhone') > -1 || u.indexOf('OS') > -1||u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
             this.setState({
               dataLB:res.data,
               detail:detail,
               deviceType:true
             })
           }
           else {
             this.setState({
               dataLB:res.data,
               detail:detail,
               deviceType:false
             })
           }
         }
       }
     })
   }

  FXModel=()=>{
    if (this.state.style.display === "block") {
      this.setState({ style: { display: "none", } })
    }
  }


 /*   YaoqingButton(){
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
    }*/
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

  /*点击事件*/
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
    const {detail,dataLB,deviceType,style}=this.state;
    const { userId } =this.props.global.currentUser.userInfo;
    return(
      <div className={styles.YaoqingBox}>
        {
          this.loading && !detail
            ?
            <Loading/>
            :
            <div>
              {/*头部*/}
              <LoadLazy height={'19%'}>
                  <YaoqingHeader  dataLB={dataLB} userId={userId}/>
              </LoadLazy>


              {/*第一部分*/}
                <LoadLazy height={'32%'}>
                 <YaoqingOne  detail={detail} userId={userId} />
                </LoadLazy>


                {/*第二部分*/}
                <LoadLazy height={'18%'}>
                  <YaoqingTwo  detail={detail} userId={userId} />
                </LoadLazy>

                {/*第三部分*/}
                <LoadLazy height={'26%'}>
                  <YaoqingThree />
                </LoadLazy>

                <div className={styles.YaoqingFooter}> </div>
              {
                deviceType
                  ?
                  <p className={styles.YaoqingFooterBox}>
                    <img src={require("~/assets/invent/Yaoqing201902/invent_h5_btn2@2x.png")}  onClick={() => this.redirect(ResultJson.invite_share.action)}/>
                    <img src={require(userId ? '~/assets/invent/Yaoqing201902/invent_h5_btn1@2x.png' : "~/assets/invent/Yaoqing201902/invent_h5_btn3@2x.png")} onClick={() => this.redirect(userId ? ResultJson.invite.action : ResultJson.invite_login.action)}/>
                  </p>
                  :
                  <div className={styles.FXmodelBox} onClick={this.FXModel} style={style}>
                    <img src={require("~/assets/invent/Yaoqing201902/download_word@2x.png")}/>
                  </div>

              }



              {/*<p className={styles.fenxiang}>
                <img src={require("~/assets/invent/Yaoqing201902/invent_h5_btn4@2x.png")}  onClick={() => this.redirect(ResultJson.invite_share.action)}/>
              </p>*/}

            </div>
        }
      </div>
    )
  }
}



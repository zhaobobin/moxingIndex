import React from 'react';
import { connect } from 'dva';
import YaoqingPackage from '~/components/Hdzq/YaoqingPackage';
import YaoqingRegulation from '~/components/Hdzq/YaoqingRegulation';
import YaoqingReturnMoney from '~/components/Hdzq/YaoqingReturnMoney';
import styles from './Yaoqing201901.less';
import ResultJson from '../../Result/ResultJson';
import moment from 'moment';
import LazyLoad from 'react-lazyload';
@connect(state => ({
  global: state.global,
}))
export default class Yaoqing201812 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        data:{},
        arr:[]
    }
  }
  componentDidMount(){
     let { userId } = this.props.global.currentUser.userInfo;
     if(userId===undefined){
       userId=null
     }else {
       userId;
     }
    this.props.dispatch({
      type: 'global/post',
      url: '/api/coupon/invitationAward',
      payload: {
         userId,
      },
      callback: (res) => {
        if(res.code===0){
          this.setState({
            data:res.data,
          })
        }
      }
    })

    this.props.dispatch({
      type: 'global/post',
      url: '/api/coupon/invitationBanner',
      payload: {
      },
      callback: (res) => {
        if(res.code===0){
          this.setState({
            arr:res.data,
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
    const {data,arr}=this.state;
  	const {isAuth} = this.props.global;
    return(
     <div className={styles.YaoqingBox}>
            {/*第一部分*/}
       <LazyLoad height={'19%'}>
         {
           isAuth
             ?
             null
             :
             <img src={require("~/assets/Invitation/invent_app_stars@2x.png")} className={styles.YaoqingStarImg}/>
         }
       <img src={require("~/assets/Invitation/invent_app_top@2x.png")} className={styles.YaoqingBoxHeadImg}/>
       <div className={styles.YaoqingTimeBox}>
         <p>活动时间</p>
         <p>{moment(data.startDate).format("YYYY-MM-DD")}至{moment(data.endDate).format("YYYY-MM-DD")}</p>
       </div>
       </LazyLoad>
          {/*第二部分*/}
       <div className={styles.YaoqingBoxTwo}>
         <LazyLoad height={'32%'}>
            <YaoqingPackage data={data} isAuth={isAuth} arr={arr}/>
         </LazyLoad>
          {/*第三部分*/}
         <LazyLoad height={'18%'}>
            <YaoqingRegulation />
          </LazyLoad>
          {/*第四部分*/}
         <LazyLoad height={'26%'}>
            <YaoqingReturnMoney />
         </LazyLoad>
         <div className={styles.YaoqingFooter}> </div>
       </div>

        <p className={styles.YaoqingFooterBox}>
          <img src={require("~/assets/Invitation/invent_app_bt1@2x.png")}  onClick={() => this.redirect(ResultJson.invite_share.action)}/>
          <img src={require(isAuth===true?"~/assets/Invitation/invent_app_bt3@2x.png":'~/assets/Invitation/invent_app_bt2@2x.png')} onClick={() => this.redirect(isAuth===true?ResultJson.invite_login.action:ResultJson.invite.action)}/>
        </p>
     </div>
    )
  }

}



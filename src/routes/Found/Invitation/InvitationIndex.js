/*邀请好友首页*/
import React from 'react';
import { connect } from 'dva';
import styles from './InvitationIndex.less';
import QRCode from 'qrcode.react';
import { yaoqingDecrypt } from '~/utils/utils'
import ResultJson from '~/routes/Result/ResultJson';
import ToastLoading from '~/components/Common/ToastLoading';

@connect(state => ({
  global: state.global,
}))
export default class InvitationIndex extends React.Component {
	constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.setupWebViewJavascriptBridge = this.setupWebViewJavascriptBridge.bind(this);
    this.state = {
      invitationCode: '',
      webUrl: '',
    }
  }
  componentDidMount(){
    this.queryInvitationCount()
  }
  //查询邀请码
  queryInvitationCount = () => {

    if(!this.ajaxFlag) return;
    this.ajaxFlag = false;

    const {userId} = this.props.global.currentUser.userInfo;

    this.props.dispatch({
      type: 'global/post',
      url:'/api/accountNotice/sharingNotification',
      payload:{
        userId,
        productType: 5
      },
      callback: (res)=>{
        setTimeout(() => { this.ajaxFlag = true }, 500);

        if(res.code === 0){
          this.setState({

            invitationCode: res.data.invitationCode,

            webUrl: res.data.webUrl

          })

        }
      }
    })
  };
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
  /*一键分享*/
  redirect = (action) => {
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //判断是否是 android终端
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断是否是 ios终端
    if (isiOS) {
      /*ios*/
      this.setupWebViewJavascriptBridge( (bridge) => {
       /* bridge.registerHandler('h5Action', (data, responseCallback) => {
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
  	 const {invitationCode, webUrl} = this.state;
    return(
      <div className={styles.Box}>
        {
          this.loading ?
            <ToastLoading/>
            :
            <div>
        <img src={require("~/assets/Invitation/invite_friends_head@2x.png")} alt="" className={styles.InvitationImg}/>
        <div className={styles.titleBox}>
          <img src={require("~/assets/Invitation/invite_title_icon1@2x.png")} alt="" className={styles.Img}/>
          <span>通过以下方式邀请好友</span>
          <img src={require("~/assets/Invitation/invite_title_icon2@2x.png")} alt="" className={styles.Img}/>
        </div>
        <div className={styles.codeBox}>
              <p>方法一:扫描二维码立即邀请</p>
          <div className={styles.code}>
          {/*<img src={require("~/assets/Invitation/rwm.png")} alt="" />*/}
          <div style={{width:'100%'}}><QRCode value={webUrl} style={{width:'100%',height:'auto'}}/></div>
          </div>
        </div>
        <div className={styles.shareBox}>
          <p>方法二:将邀请码分享至好友</p>
          <h3>{invitationCode ? yaoqingDecrypt(invitationCode) : null}</h3>
          <img src={require("~/assets/Invitation/invite_bottom_btn@2x.png")} alt="" className={styles.Img}  onClick={()=>this.redirect(ResultJson.share_yaoqing.action)}/>
        </div>
        </div>
       }
      </div>
    )
  }

}

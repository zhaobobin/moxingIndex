import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { ENV, getUrlParams } from '~/utils/utils';
import styles from './Result.less';

import img_success from '~/assets/com/success@2x.png';
import ResultJson from './ResultJson';

@connect(state => ({
  global: state.global,
}))
export default class CzResult extends React.Component {

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
    const amount = getUrlParams().amount;
    return(
      <div className={styles.result}>
        <img src={img_success} alt="img_result"/>
        <h1>恭喜您充值成功！</h1>
        <p className={styles.amount}>您已成功充值{amount}元</p>
        <div className={styles.btns}>
          <Button onClick={() => this.redirect(ResultJson.lookCz.action)}>查看我的充值</Button>
          <Button type="primary" onClick={() => this.redirect(ResultJson.lend.action)}>立即出借</Button>
        </div>
      </div>
    )
  }

}

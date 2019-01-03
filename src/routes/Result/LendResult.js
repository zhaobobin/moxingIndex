import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import {ENV, getUrlParams} from '~/utils/utils'
import styles from './Result.less'

import img_success from '~/assets/com/success@2x.png'
import ResultJson from './ResultJson'

@connect(state => ({
  global: state.global,
}))
export default class LendResult extends React.Component {

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

    const params = getUrlParams();

    return(
      <div className={styles.result}>
        <img src={img_success} alt="img_result"/>
        <h1>出借成功！</h1>
        <div className={styles.huibao}>
          <p>
            <span className={styles.sp1}>{params.amount || null}</span>
            <span className={styles.sp2}>出借金额(元)</span>
          </p>
          <p>
            <span className={styles.sp1}>{params.cifAccount || null}</span>
            <span className={styles.sp2}>目标回报(元)</span>
          </p>
        </div>
        <div className={styles.btns}>
          <Button type="default" onClick={() => this.redirect(ResultJson.lookCj.action)}>查看我的出借</Button>
          <Button type="primary" onClick={() => this.redirect(ResultJson.lend.action)}>继续出借</Button>
        </div>
      </div>
    )
  }

}

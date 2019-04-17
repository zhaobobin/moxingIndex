import React from 'react'
import { Link } from 'dva/router'
import { Toast } from 'antd-mobile'
import { ENV } from '~/utils/utils'
import styles from './Download.less'

import { Alert } from '~/components/Dialog/Dialog'
import jiantou from '~/assets/download/h5_jiantou@2x.png'

function alert(){
  Alert({
    width: '270px',
    title: '应用还在上架中，敬请期待哦！',
    btns: '知道了',
    callback: (res) => {

    }
  })
}

export default class Download extends React.Component{

  constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.state = {
      isWeixin: '',
      deviceType: '',
      version: 1,
      iosUrl: '',
      androidUrl: '',
    }
  }

  queryDetail = () => {

    Toast.loading('数据加载中');

    let { isWeixin, deviceType } = this.state;

    const u = window.navigator.userAgent,
      ua = u.toLowerCase();

    if(ua.match(/MicroMessenger/i) == "micromessenger") {
      isWeixin = 'weixin'
    }else{
      isWeixin = 'web'
    }

    //判断设备
    if(u.indexOf('iPhone') > -1 || u.indexOf('iPad') > -1) {
      deviceType = 'ios';
      this.setState({
        isWeixin,
        deviceType
      },()=>{
        this.getAppUrl();
      });

    }else if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){//
      deviceType = 'android';
      this.setState({
        isWeixin,
        deviceType
      },()=>{
        this.getAppUrl();
      });
    }else{
      Toast.info('APP暂不支持在该设备上安装',3);
    }

  };

  getAppUrl=()=>{
    const { isWeixin, version, deviceType} = this.state;
    this.props.dispatch({
      type: 'global/post',
      url: '/api/download',
      payload: {
        deviceType,
        version
      },
      callback: (res) => {
        if(res.code === '0'){
          this.setState({
            isWeixin,
            deviceType,
            url: res.data.appUrl
          })
        }else{
          Toast.info(res.message, 3);
        }
        setTimeout(() => { Toast.hide() }, 1000);
      }
    })
  };

  render(){

    const {isWeixin} = this.state;

    return(
      <div className={styles.download}>

        {
          isWeixin === 'weixin' ?
            <div
              className={styles.modal}
            >
              <div className={styles.jiantou}>
                <img src={jiantou} alt="jiantou"/>
                <p className={styles.btn}>点击这里，并在浏览器中打开</p>
              </div>
            </div>
            :
            null
        }

        {
          isWeixin === 'weixin' ?
            null
            :
            <Link to="/user/login" className={styles.login}>登录</Link>
        }

        <img className={styles.bg} src={require('~/assets/download/download_bg.jpg')} alt="bg"/>

        <div className={styles.left}>

          <Link to="/">
            <img className={styles.logo} src={require('~/assets/home/logo.png')} alt="趣族logo" />
          </Link>

          <p className={styles.btns}>
            <span>
              <a className={styles.ios} onClick={alert}>
                <img src={require('~/assets/home/btn_ios.png')} alt="趣族ios下载" />
              </a>
            </span>
            <span>
              <a className={styles.android} href={ENV.download.android}>
                <img src={require('~/assets/home/btn_android.png')} alt="趣族android下载" />
              </a>
            </span>
          </p>

        </div>

        <div className={styles.text}>
          <img src={require('~/assets/download/text.png')} alt="text"/>
        </div>

      </div>
    )
  }

}

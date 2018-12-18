/***扫码下载过渡页面
	**********/
import React from 'react';
import { connect } from 'dva';
import { Toast } from 'antd-mobile'
import styles from './Download.less';

@connect(state => ({
  global: state.global,
}))
export default class Download extends React.Component {

  constructor(props){
    super(props);
    this.loading = false;
    this.state = {
      isWeixin: null,
      deviceType: '',
      version: 1,
    }
  }

  componentDidMount(){
    this.initPlatform();
  }

  initPlatform = () => {

    let { isWeixin, deviceType } = this.state;

    const u = window.navigator.userAgent,
      ua = u.toLowerCase();

    if(ua.match(/MicroMessenger/i) == "micromessenger") {
      isWeixin = 1
    }else{
      isWeixin = 0
    }

    //判断设备
    if(u.indexOf('iPhone') > -1 || u.indexOf('OS') > -1) {
      deviceType = 'ios'
    }
    else if(u.indexOf('Android') > -1 || u.indexOf('Adr') > -1){
      deviceType = 'android'
    }

    this.setState({
      isWeixin
    });

    if(isWeixin){
      //this.initDownload({isWeixin, deviceType})
    }

  };

  //自动下载
  initDownload = ({isWeixin, deviceType}) => {

    this.loading = true;

    this.props.dispatch({
      type: 'global/post',
      url: '/api/home/app/version',
      payload: {
        appName: '1',
        deviceType,
        version: 1,
      },
      callback: (res) => {
        this.loading = false;
        if(res.code === 0){
          window.location.href = res.data.appUrl;
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
      <div align="center" className={styles.downloadtip}>
        {
          !isWeixin ?
            <div className={styles.downimg1}><img src={require('../../assets/down/download_word.png')} /></div>
            :
            null
        }
        <div className={styles.downimg2}><img src={require('../../assets/down/download_logo.png')} /></div>
        <div className={styles.downimg3}><img src={require('../../assets/down/download_downword.png')} /></div>
      </div>
    )
  }

}

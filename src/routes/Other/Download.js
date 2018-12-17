/***扫码下载过渡页面
	**********/
import React from 'react';
import { connect } from 'dva';
import styles from './Download.less';

@connect(state => ({
  global: state.global,
}))
export default class Download extends React.Component {

  render(){
    return(
      <div align="center" className={styles.downloadtip}>      
          <div className={styles.downimg1}><img src={require('../../assets/down/download_word.png')} /></div>
          <div className={styles.downimg2}><img src={require('../../assets/down/download_logo.png')} /></div>
          <div className={styles.downimg3}><img src={require('../../assets/down/download_downword.png')} /></div>
      </div>
    )
  }

}
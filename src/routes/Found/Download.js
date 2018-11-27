import React from 'react';
import { connect } from 'dva';
import top from '~/theme/top.less';
import styles from './Download.less';

@connect(state => ({
  global: state.global,
}))
export default class Download extends React.Component {

  render(){
    return(
      <div>
        <div align="center" className={top.header}><img src={require('../../assets/top.png')} /><span>扫码下载</span></div>
        {/*以上标题可以忽略*/}
        <div className={styles.download}>
          <img src={require('../../assets/down/down_02_01.jpg')} />
          <div className={styles.downloadImg}>
          <img src={require('../../assets/down/down_02_02.jpg')} />
            <div className={styles.downloadImg1}><img src={require('../../assets/down/rwm.png')} /></div>
          </div>
        </div>
      </div>
    )
  }

}

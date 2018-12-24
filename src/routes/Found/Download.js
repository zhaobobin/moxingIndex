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
      <div className={styles.download}>
        <div style={{fontSize:'0'}}>
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


/**
 * 微博微信
 */
import React from 'react';
import { connect } from 'dva';
import styles from './Aboutweibo.less';
@connect(state => ({
  global: state.global,
}))

class AboutWeibo extends React.Component {

  render(){


    return(
      <div className={styles.helpweibo}>
        <img src={require('../../../assets/help/ewm-bg.jpg')} className={styles.weiboBg} />
        <div className={styles.weiboRwm}><img src={require('../../../assets/help/ewm_03.png')} /><span>下一站，微信见</span></div>
        <div className={styles.weiboRwm1}><img src={require('../../../assets/help/ewm_02.png')} /><span>下一站，微博见</span></div>
      </div>
    )
  }

}
export default AboutWeibo;

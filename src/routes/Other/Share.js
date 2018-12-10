import React from 'react';
import { connect } from 'dva';
import styles from './Share.less';
import ResultJson from '~/routes/Result/ResultJson'
@connect(state => ({
  global: state.global,
}))
export default class Share extends React.Component {

  redirect = (action) => {
    window.location.href = window.location.href + '&action=' + action;
    setTimeout(() => {
      window.location.reload();
    }, 500)
  };

  render(){
    return(
      <div className={styles.share}>
      <img src={require('../../assets/share/bask_bg_01.jpg')}  className={styles.shareimg}/>
      <div className={styles.sharemiddle}>
        <div className={styles.shareicon}><img src={require('../../assets/share/bask_bg_03.jpg')} /><span>张**</span></div>
        <div className={styles.sharetip}>2018年回报</div>
        <div className={styles.sharemoney}><img src={require('../../assets/share/bask_goldcoin.png')} />204,580.32元</div>
        <p className={styles.shareword}>超越了23.12%的全国投友</p>
        </div>
        <div className={styles.sharebottom}>
        <img src={require('../../assets/share/bask_bg_03.jpg')}  className={styles.shareimg} />
        <div className={styles.sharecon} align="center">
	        <div className={styles.shareBut} onClick={() => this.redirect(ResultJson.share_shouyi.action)}><span>分享</span></div>
	        <p>京ICP证 京B2-20160180 | 京ICP备14014223</p>
	        <p>北京恒远鑫达投资管理有限公司</p>
	        </div>
        </div>
      </div>
    )
  }

}

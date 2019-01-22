import React from 'react';
 import styles from './YaoqingThree.less';

const  YaoqingThree =()=> {
  return(
    <div className={styles.ThreeBox}>
      <div className={styles.ThreeImgBox}>
        <img src={require("~/assets/invent/Yaoqing201902/invent_h5_title3@2x.png")}/>
      </div>
      <div className={styles.ThreeContBox}>
        <img src={require("~/assets/invent/Yaoqing201902/invent_h5_icon3@2x.png")} className={styles.LImg}/>
        <div className={styles.ContBox}>
          <img src={require("~/assets/invent/Yaoqing201902/invent_h5_red4@2x.png")}/>
          <p>活动期间所邀请的全部好友出借总额≥180万元，再送iPhoneXs 256G （价值10099元）！活动结束后10天内寄出。</p>
        </div>
      </div>
      <div className={styles.FooterContBox}>
        <p>注意：</p>
        <p> 您最多可获得：2.8*10+200*10=2028元和iPhone Xs一部，拿满以后不再多奖。</p>
        <p>活动最终解释权归去投网所有。</p>
      </div>
    </div>
  )
}
export default  YaoqingThree;

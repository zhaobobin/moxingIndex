import React from 'react';
import styles from './YaoqingTwo.less';

const  YaoqingTwo =({detail})=> {
  return(
    <div className={styles.TwoBox}  >
      <div className={styles.TwoImgBox}>
        <img src={require("~/assets/invent/Yaoqing201902/invent_h5_title2@2x.png")}/>
      </div>

      <div className={styles.TwoContBox}>

        <div className={styles.TwoContHeadBox}>
          <img src={require("~/assets/invent/Yaoqing201902/invent_h5_icon2@2x.png")} className={styles.LImg}/>
          <div className={styles.RBox}>
            <img src={require("~/assets/invent/Yaoqing201902/invent_h5_red2@2x.png")} />
            <p>每有一位好友，在活动期间出借总金额满足以下条件，您都可获得额外奖励：</p>
          </div>
        </div>

          <ul className={styles.ContUl}>
            <li>
              <span>每位好友活动期<br/>间出借总金额</span>
              <span>额外奖励红包</span>
              <span>您已获得</span>
            </li>
            <li>
              <span>2000元≤好友出借<br/>总金额＜5000元</span>
              <span>28元</span>
              <span>{detail.listTwo.one}次</span>
            </li>
            <li>
              <span>5000元≤好友出借<br/>总金额＜10000元</span>
              <span>58元</span>
              <span>{detail.listTwo.two}次</span>
            </li>
            <li>
              <span>10000元≤好友出借<br/>总金额＜20000元</span>
              <span>88元</span>
              <span>{detail.listTwo.three}次</span>
            </li>
            <li>
              <span>20000元≤好<br/>友出借总金额</span>
              <span>200元</span>
              <span>{detail.listTwo.four}次</span>
            </li>
          </ul>
        <p className={styles.TwoFooterP}>额外奖励红包将于2月25日活动结束后统一发放，最多可拿10次，按最高奖励。</p>
      </div>
      <div className={styles.TwoFooterBox}>
        <img src={require("~/assets/invent/Yaoqing201902/invent_h5_wordinfo@2x.png")}/>
        <p>您已获得<span>{detail.listTwo.totalNum}</span>次额外奖励红包，共<span>{detail.listTwo.totalReward===''?'0.00':detail.listTwo.totalReward}</span>元，还可获得{detail.listTwo.residualNum}次</p>
      </div>
    </div>
  )
}
export default  YaoqingTwo;

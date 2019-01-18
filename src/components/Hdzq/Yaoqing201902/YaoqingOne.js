import React from 'react';
import styles from './YaoqingOne.less';
import { numberFormat } from "~/utils/utils";
const  YaoqingOne =({detail})=> {
    return(
      <div className={styles.OneBox} >
          <div className={styles.OneImgBox}>
            <img src={require("~/assets/invent/Yaoqing201902/invent_h5_title1@2x.png")}/>
          </div>
        <div className={styles.OneContBox}>
          <img src={require("~/assets/invent/Yaoqing201902/redpacket@2x.png")} className={styles.ImgL}/>
          <div className={styles.OneCont}>
            <img src={require("~/assets/invent/Yaoqing201902/redpacket_lend@2x.png")}/>
            <p>活动期间邀请好友，好友出借即可得2.8元红包（可提现）。</p>
            <p className={styles.p2}>好友出借红包实时发放，最多可获得10次。</p>
          </div>
        </div>
      <div className={styles.OneFooterBox}>
        <img src={require("~/assets/invent/Yaoqing201902/invent_h5_wordinfo@2x.png")}/>
          <p>您已获得<span>{detail.total}</span>次好友出借红包，共<span>{detail.reward}</span>元，还可获得{detail.num}次</p>
      </div>
      </div>
    )
}
export default  YaoqingOne;

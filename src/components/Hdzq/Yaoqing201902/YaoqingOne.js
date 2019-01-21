import React from 'react';
import styles from './YaoqingOne.less';
import { numberFormat } from "~/utils/utils";
const  YaoqingOne =({detail,userId})=> {
    return(
      <div className={styles.OneBox} >
          <div className={styles.OneImgBox}>
            <img src={require("~/assets/invent/Yaoqing201902/invent_h5_title1@2x.png")}/>
          </div>
        <div className={styles.OneContBox}>
          <img src={require("~/assets/invent/Yaoqing201902/redpacket@2x.png")} className={styles.ImgL}/>
          <div className={styles.OneCont}>
            <img src={require("~/assets/invent/Yaoqing201902/redpacket_lend@2x.png")}/>
            <p>活动期间邀请好友，好友出借即可得<span className={styles.qian}> 2.8</span>元红包（可提现）。</p>
            <p className={styles.p2}>好友出借红包<span>实时发放</span>  ，最多可获得10次。</p>
          </div>
        </div>
        {
          userId
          ?
            <div className={styles.OneFooterBox}>
              <img src={require("~/assets/invent/Yaoqing201902/invent_h5_wordinfo@2x.png")}/>
              {
                detail.total!==0
                ?
                  <p>您已获得<span>{detail.total}</span>次好友出借红包，共<span>{numberFormat(parseInt(detail.reward,10)/100)}</span>元，还可获得{detail.num}次</p>
                  :
                  <p>您尚未获得好友出借红包，还可获得28元。</p>
              }
            </div>
            :
            null
        }

      </div>
    )
}
export default  YaoqingOne;

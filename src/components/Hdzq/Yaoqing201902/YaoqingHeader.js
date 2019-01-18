import React from 'react';
import styles from './YaoqingHeader.less';
import { numberFormat } from "~/utils/utils";
import { Carousel } from 'antd';
const  YaoqingHeader =({dataLB,userId})=> {
  return(
    <div className={styles.HeaderBox} >
          <div className={styles.ImgBox}>
            <img src={require("~/assets/invent/Yaoqing201902/invent_h5_top@2x.png")}/>
            <div className={styles.ContBox}>
              <p>朋友都是壕，给你一个证明自己的机会<br/>看你能抱走多少红包</p>
              <p>活动时间：{dataLB.startTime}至{dataLB.endTime}</p>
            </div>
          </div>
      <div className={styles.BoxLb}>
        <Carousel vertical autoplay dots={false}>
          {
            dataLB.list.map((item, index) => (
              <p key={index}>{item.phone} <span>已获得好友出借红包{numberFormat(parseInt(item.reward, 10)/100)}元</span> </p>
            ))
          }
        </Carousel>
      </div>
    </div>
  )
}
export default  YaoqingHeader;

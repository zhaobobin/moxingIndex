import React from 'react';
import styles from './YaoqingPackage.less';
import { numberFormat } from "~/utils/utils";
import { Carousel } from 'antd';
const  YaoqingPackage =({data,isAuth})=> {
  console.log(data)
    return(
      <div className={styles.PackageBox} >
        {
          isAuth
            ?
            null
            :
            <div className={styles.PackageTitleBox}>
              <div className={styles.lingquBox}>
                <p>您已领取</p>
                <p>{numberFormat(parseInt(data.rewardSum, 10)/100)}<span>元</span></p>
              </div>
              <div className={styles.yaoqingBox}>
                <p>您已邀请</p>
                <p>{ data.total}<span>人</span></p>
              </div>
            </div>
        }

        <h2 className={styles.PackageTitle}>
          <img src={require("~/assets/Invitation/invent_app_title@2x.png")}/>
          <p>好友多 红包多</p>
        </h2>

        <div className={styles.PackageDivBox}>
          <img src={require("~/assets/Invitation/invent_app_icon1@2x.png")}/>
          <img src={require("~/assets/Invitation/invent_app_icon2@2x.png")}/>
          <img src={require("~/assets/Invitation/invent_app_icon3@2x.png")}/>
        </div>
        <p className={styles.PackageP}>您再邀请xx位有效好友就可以领取xx元红包</p>
        <div className={styles.PackageLunBo}>
            <Carousel vertical autoplay dots={false}>
              <p>
                130****1234好友出借获50元现金红包
              </p>
              <p>
                130****1234好友出借获50元现金红包
              </p>
              <p>
                130****1234好友出借获50元现金红包
              </p>
            </Carousel>
        </div>
      </div>
    )
}
export default  YaoqingPackage;

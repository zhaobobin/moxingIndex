import React from 'react';
import styles from './YaoqingPackage.less';
import { numberFormat } from "~/utils/utils";
import { Carousel } from 'antd';
const  YaoqingPackage =({Packagedata,isAuth,dataLB})=> {
    return(
      <div className={styles.PackageBox} >
        {
          isAuth
            ?
            <div className={styles.PackageTitleBox}>
              <div className={styles.lingquBox}>
                <p>您已领取</p>
                <p>{numberFormat(parseInt(Packagedata.rewardSum, 10)/100)}<span>元</span></p>
              </div>
              <div className={styles.yaoqingBox}>
                <p>您已邀请</p>
                <p>{ Packagedata.total}<span>人</span></p>
              </div>
            </div>
            :
          null
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

        {
          isAuth
            ?
            <p className={styles.PackageP}>您再邀请{Packagedata.num}位有效好友就可以领取{numberFormat(parseInt(Packagedata.awardSum, 10)/100)}元红包</p>
            :
           null
        }

        <div className={styles.PackageLunBo}>
            <Carousel vertical autoplay dots={false}>
              {
                dataLB.map((item, index) => (
                  <p key={index}>{item.phone}{isAuth?'邀友获得':'好友出借获'}{numberFormat(parseInt(item.reward, 10)/100)}元红包</p>
                ))
              }
            </Carousel>

        </div>
      </div>
    )
}
export default  YaoqingPackage;

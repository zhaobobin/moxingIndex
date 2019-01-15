import React from 'react';
import styles from './YaoqingRegulation.less';

const  YaoqingRegulation =()=> {
  return(
    <div className={styles.RegulationBox}  >
      <h2 className={styles.PackageTitle}>
        <img src={require("~/assets/Invitation/invent_app_title@2x.png")}/>
        <p>豪友多 返现多</p>
      </h2>
      <div className={styles.RegulationImgBox}>
        <img src={require("~/assets/Invitation/invent_app_redenvelopes@2x.png")}/>
      </div>
    </div>
  )
}
export default  YaoqingRegulation;

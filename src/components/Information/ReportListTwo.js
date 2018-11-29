/*
*   报告列表   ReportList
*
*
*
* */
import React from "react";
import styles from "./ReportListTwo.less";

const ReportListTwo = (props)=>{
  console.log(props)
  return <div className={props.colorBlu ? styles.backBlueColor : styles.backRedColor}>
    <div className={styles.imgBackground}>
      <div>2018-06-20</div>
      <div className={styles.title}>去投网运营报告</div>
      <div className={styles.compyName}>北京恒远鑫达投资管理有限公司</div>
    </div>
  </div>


}
export default ReportListTwo

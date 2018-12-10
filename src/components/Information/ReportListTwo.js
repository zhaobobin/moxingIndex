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
  return  <div>{
    props.colorBlu ?
      <div className={ styles.backBlueColor}>

          <div className={styles.imgBackground}>
            <a target="_blank" href="http://investtest.qutouwang.com/hyxd_qtw/customer_invest_info/pdf/Information_level _report_2017.pdf">
            <p className={styles.time}>2018-01-21</p>
            <p className={styles.title}>等级保护测评报告</p>
            <p className={styles.compyName}>北京恒远鑫达投资管理有限公司</p>
            </a>
            </div>
          <div className={styles.imgBackground}>
            <a target="_blank" href="http://investtest.qutouwang.com/hyxd_qtw/customer_invest_info/pdf/Information_level _report_2017.pdf">
            <p  className={styles.time}>2018-05-31</p>
            <p className={styles.title}>等级保护测评报告</p>
            <p className={styles.compyName}>北京恒远鑫达投资管理有限公司</p>
            </a>
          </div>
      </div>
      :
        <div className={styles.backRedColor}>
          <a target="_blank" href="http://investtest.qutouwang.com/hyxd_qtw/customer_invest_info/pdf/Information_level _report_2018.pdf
">
          <p className={styles.time}>2018-01-21</p>
          <p className={styles.title}>系统安全评估报告</p>
          <p className={styles.compyName}>北京恒远鑫达投资管理有限公司</p>
          </a>
        </div>

  }

  </div>




}
export default ReportListTwo

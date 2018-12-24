/*审核信息*/
import React from 'react';
import { connect } from 'dva';
import styles from './Examine.less';
import Information from "~/components/Information/Information";

@connect(state => ({
  global: state.global,
}))
export default class Examine extends React.Component {
  render(){
    return(
      <div className={styles.Examine}>
          <div className={styles.contentBox}>
            <a target="_blank" href="https://www.qutouwang.com/hyxd_qtw/customer_invest_info/pdf/financial_report_2017.pdf">
            <img src={require("~/assets/account/find_audit_img1@2x.png")} alt="" className={styles.auditImg}/>
            <span>2017年度财务审计报告</span>
            <p className={styles.contP}>上一年度的财务审计报告</p>
            </a>
          </div>
        <div className={styles.contentBox}>
          <a target="_blank" href="https://www.qutouwang.com/hyxd_qtw/customer_invest_info/pdf/audit_report.pdf">
          <img src={require("~/assets/account/find_audit_img2@2x.png")} alt="" className={styles.auditImg}/>
          <span>专项审计报告</span>
          <p className={styles.contP}>经营合规重点环节的审计结果</p>
          </a>
        </div>
        <div className={styles.contentBox}>
          <a target="_blank" href="https://www.qutouwang.com/hyxd_qtw/customer_invest_info/pdf/compliance_report_2018.pdf">
          <img src={require("~/assets/account/find_audit_img3@2x.png")} alt="" className={styles.auditImg}/>
          <span>合规报告</span>
          <p className={styles.contP}>上一年度的合规性审查报告</p>
          </a>
        </div>

      </div>
    )
  }

}

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
      <div >
        <Information>
          <div className={styles.contentBox}>
            <img src={require("~/assets/account/find_audit_img1@2x.png")} alt="" className={styles.auditImg}/>
            <span>2017年度财务审计报告</span>
            <p>上一年度的财务审计报告</p>
          </div>
        <div className={styles.contentBox}>
          <img src={require("~/assets/account/find_audit_img2@2x.png")} alt="" className={styles.auditImg}/>
          <span>专项审计报告</span>
          <p>经营合规重点环节的审计结果</p>
        </div>
        <div className={styles.contentBox}>
          <img src={require("~/assets/account/find_audit_img3@2x.png")} alt="" className={styles.auditImg}/>
          <span>合规报告</span>
          <p>上一年度的合规性审查报告</p>
        </div>
          </Information>
      </div>
    )
  }

}

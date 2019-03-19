/*
* 报告列表   ReportListTwo
* */
import React from "react";
import { connect } from 'dva';
import {routerRedux} from 'dva/router';
import styles from "./ReportListTwo.less";

@connect(state => ({
  global: state.global,
}))
export default class ReportListTwo extends React.Component {

  renderPdf = (url) => {
    let params = window.location.href.split('?')[1];
    this.props.dispatch(routerRedux.push(`/pdf?url=${url}&${params}`))
  };

  render() {

    const {colorBlu} = this.props;

    return (
      <div className={styles.ReportListBox}>
        {
          colorBlu ?
            <div className={styles.backBlueColor}>
              <div className={styles.imgBackground}>
                <a
                  onClick={() => this.renderPdf("https://www.qutouwang.com/hyxd_qtw/customer_invest_info/pdf/Information_level_report_2018.pdf")}>
                  <p className={styles.time}>2018-09-10</p>
                  <p className={styles.title}>等级保护测评报告</p>
                  <p className={styles.compyName}>北京恒远鑫达投资管理有限公司</p>
                </a>
              </div>
              <div className={styles.imgBackground}>
                <a
                  onClick={() => this.renderPdf("https://www.qutouwang.com/hyxd_qtw/customer_invest_info/pdf/Information_level_report_2017.pdf")}>
                  <p className={styles.time}>2018-02-02</p>
                  <p className={styles.title}>等级保护测评报告</p>
                  <p className={styles.compyName}>北京恒远鑫达投资管理有限公司</p>
                </a>
              </div>
            </div>
            :
            <div className={styles.backRedColor}>
              <a
                onClick={() => this.renderPdf("https://www.qutouwang.com/hyxd_qtw/customer_invest_info/pdf/system_safe_report.pdf")}>
                <p className={styles.time}>2018-09-09</p>
                <p className={styles.title}>信息系统安全评估报告</p>
                <p className={styles.compyName}>北京恒远鑫达投资管理有限公司</p>
              </a>
            </div>
        }
      </div>
    )
  }

};

/**
 * 去投网介绍
 */
import React from 'react';
import { connect } from 'dva';
import styles from './AboutIntroduction.less';

@connect(state => ({
  global: state.global,
}))

class AboutIntroduction extends React.Component {

  render(){

    return(
      <div className={styles.introduction}>
        <h1>去投网&nbsp;惠生活，更自由！</h1>
        <div className={styles.word}>
          <p>去投网，运营主体为北京恒远鑫达投资管理有限公司，是恒远鑫达集团旗下网络借贷信息中介平台，2014年3月7日于北京注册成立，2016年6月18日正式上线，实缴注册资本1.5亿元。</p>
          <p>去投网遵从金融本质，以科技为基石，通过科技驱动金融创新，为中国广大小微企业和个人用户，提供生产周转和有真实消费场景的点对点、小额分散的网络借贷信息中介服务，推动供给侧改革，促进消费升级，践行普惠金融。</p>
          <p>去投网始终将风险防控放在首位，依托大数据、云计算和人工智能等先进科技，研发出的“先知”大数据风控系统，能够自动采集2000多个维度的征信数据，结合人脸识别、微表情、关系图谱等，帮助去投网甄别隐藏的风险点，防范欺诈行为。</p>
          <p>去投网坚持合规经营理念，积极推动行业自律，先后获得信息安全等级保护三级证书和ICP经营许可证，并成功接入廊坊银行资金存管，成为行业内少有的三证齐全的平台之一，同时也是第一批向金融局提交自查报告的平台之一。此外，去投网还成功接入中国金融认证中心CFCA电子签章，保障合同真实有效；完成京公网安备案，使平台始终处于公安机关监控范围内，合规运营走在行业的前列。</p>
          <p>放心投，去投网！</p>
        </div>
      </div>
    )
  }

}
export default AboutIntroduction;

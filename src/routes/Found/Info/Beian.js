import React from 'react';
import { connect } from 'dva';
import styles from './Beian.less';
import Information from "~/components/Information/Information";
import Signature from "~/components/Information/signature";
@connect(state => ({
  global: state.global,
}))
export default class Beian extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    return(
      <div  >
        <Information>
          <div className={styles.Box}>
        <h4 className={styles.Beian}> <span className={styles.content}>备案信息 <span></span></span></h4>
          <div className={styles.BeianContent}>
            <p>地方金融监管部门的备案登记信息：<span>无</span> </p>
            <p>备案登记地方金融监管部门：<span>无</span> </p>
            <p>备案登记时间：<span>无</span> </p>
            <p>备案登记编号：<span>无</span> </p>
          </div>
        <h4 className={styles.Beian}> <span className={styles.content}>电信业务经营许可信息 <span></span></span> </h4>
          <img src={require("~/assets/account/find_record_img1@2x.png")} alt="" className={styles.permission}/>

        <h4 className={styles.Beian}> <span className={styles.content}>资金存管信息 <span></span></span></h4>
          <div className={styles.deposit}>
            <p>资金存管银行全称：<span>恒丰银行股份有限公司</span></p>
            <p>三方存管协议：<span className={styles.agreement}> <a target="_blank" href="http://investtest.qutouwang.com/hyxd_qtw/customer_invest_info/pdf/depository_agreement.pdf">存管协议</a> </span></p>
            <p>资金存管上线时间：<span>2017-07-01</span></p>
          </div>

        <h4 className={styles.Beian}> <span className={styles.content}>公安机关核发的网站备案图标和编号 <span></span></span></h4>
          <p>京公网安备11010502036682号</p>
        <h4 className={styles.Beian}> <span className={styles.content}>信息安全测评认证信息 <span></span></span></h4>
        <img src={require("~/assets/account/find_record_img2@2x.png")} alt="" className={styles.authentication}/>

        <h4 className={styles.Beian}> <span className={styles.content}>风险管理信息 <span></span></span></h4>
        <h4>风险管理制度</h4>
        <p>一、风险管理组织架构</p>
        <img src={require("~/assets/account/find_record_img3@2x.png")} alt=""  className={styles.framework}/>
        <p>二、风险评估流程</p>
        <p className={styles.flow}>借款人在去投网官网提交借款申请后，申请数据将即时传送至风控中心，并按照如下流程进行审查，最终形成审批结果：</p>
        <img src={require("~/assets/account/find_record_img4@2x.png")} alt=""  className={styles.flowImg}/>
        <p className={styles.flow}>去投网风控部门经过对借款人信息进行综合判断、分析、比较和评价，完成风险评估流程后，最终出具审批意见。对于存在欺诈风险的申请，将第一时间反馈至反欺诈岗，进行反欺诈调查。反欺诈调查中确定存在欺诈行为的借款人，根据情况加入对应黑名单并按照相关法律法规进行上报。</p>
        <p>三、风险预警管理情况</p>
        <p className={styles.flow}>信息披露：我们对借款项目进行了风险测评，并在平台上进行了充分的风险提示。同时，我们也将按照监管要求对项目信息和借款人信息及时进行披露；</p>
        <p className={styles.flow}>风险预警：制定和落实风险预警管理职责，明确风险预警信息收集和管理责任，每月监测还款情况，提前风险预警;</p>
        <p className={styles.flow}>定期回访：定期核查、回访。</p>
        <p>四、贷后管理流程</p>
        <p className={styles.flow}>贷后管理是指从借贷行为发生后直到本息收回或借贷行为结束的全过程中的各项管理与服务活动，是风险管理的最终环节。</p>
        <p>贷后管理流程</p>
        <img src={require("~/assets/account/find_record_img5@2x.png")} alt=""  className={styles.flowImg}/>
        <p className={styles.flow}>逾期前：预警电话&短信提醒；</p>
        <p className={styles.flow}>逾期初：电话催收；</p>
        <p className={styles.flow}>严重逾期：移交合作律所催缴&#8594拉入信用黑名单&#8594报送网络金融征信系统</p>

          <Signature/>


          </div>
        </Information>
      </div>
    )
  }

}

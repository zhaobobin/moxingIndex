import React from 'react';
 import styles from './YaoqingReturnMoney.less';

const  YaoqingReturnMoney =()=> {
  return(
    <div className={styles.ReturnMoneyBox}>
      <h2 className={styles.PackageTitle}>
        <img src={require("~/assets/Invitation/invent_app_title@2x.png")}/>
        <p>活动规则</p>
      </h2>
      <div className={styles.ReturnMoneyContent}>
          <p>1、活动期间，邀请好友每出借一笔智享服务，您可根据好友单笔年化出借金额获得一定金额红包奖励；</p>
          <p> 2、年化出借金额=出借金额*出借期限(月)/12；</p>
          <p> 举个例子：小智邀请一位好友，好友完成两笔智享服务出借，出借6个月智享服务3万元以及12个月智享服务2万元，小智可获得现金红包50元+200元=250元； </p>
          <p>  3、有效好友指在活动期间内注册并完成首次出借的好友； </p>
          <p> 4、红包在好友完成出借后实时发放到您的账户中； </p>
          <p> 5、红包可直接提现； </p>
          <p> 6、本活动最终解释权归去投网所有。</p>
      </div>
    </div>
  )
}
export default  YaoqingReturnMoney;

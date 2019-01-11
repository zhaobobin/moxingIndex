/*存管常见问题*/
import React from 'react';
import { connect } from 'dva';
//样式
import styles from './BankdepositorIssue.less';

@connect(state => ({
  global: state.global,
}))
export default class BankdepositorIssue extends React.Component {
  render(){
    return(
      <div className={styles.BankdepositorIssueBox}>
        <div className={styles.IssueTitleImgBox}>
          <img src={require("~/assets/Bankdepositor/bank_app_subheading3@2x.png")} className={styles.IssueTitleImg}/>
        </div>

        <div className={styles.IssueContentBox}>
          <p>
            A、如何开通存管账户？
          </p>
          <p>
            新用户在去投网注册成功后，我们会提醒您前往存管银行进行账户存管，在开通存管账户页面输入【姓名】、【身份证号】、【银行卡号】，确认无误后，点击【立即开通】按钮。
          </p>
          <p>
            B、开通存管账户后对您资金有什么影响？
          </p>
          <p>
            您开通存管账户后，存管银行就会给您开通独立的个人存管账户，因此在出借前增加了存管账户开户操作，您在进行充值、出借、提现等涉及资金的操作时，均由存管银行校验交易密码，有效保障了您的交易安全。
          </p>
          <p>
            C、存管银行支持绑定哪些银行卡？
          </p>
          <p>
            目前支持14家银行进行绑卡,包含：邮政储蓄、工商银行、农业银行、中国银行、中国建设银行、交通银行、中信银行、光大银行、广发银行、平安银行、招商银行、兴业银行、浦发银行、浙商银行。
          </p>
        </div>
        <div className={styles.IssueFooterContentBox}>
          <p>
            <img src={require("~/assets/Bankdepositor/bank_app_icon7@2x.png")} />
            <span>
              开通银行存管账户，实现资金完全隔离 <br/>让资金流向更透明
            </span>
            <img src={require("~/assets/Bankdepositor/bank_app_icon8@2x.png")} />
          </p>
        </div>
            {/*按钮*/}
       {/* <div className={styles.IssueFooterBtnImgBox}>
          <img src={require("~/assets/Bankdepositor/bank_app_bt@2x.png")} />
        </div>*/}
      </div>
    )
  }
}

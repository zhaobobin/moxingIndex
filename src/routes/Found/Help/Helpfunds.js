/**
 * 银行资金存管
 */
import React from 'react';
import { connect } from 'dva';
import { Collapse } from 'antd';
import styles from './Helplogin.less';

@connect(state => ({
  global: state.global,
}))

class Helpfunds extends React.Component {

  render(){
    const Panel = Collapse.Panel;

    return(
      <div className={styles.helplogin}>
        <Collapse  bordered={false} defaultActiveKey={['1']} accordion>
          <Panel header="1、银行存管？" key="1">
            <p>网页端注册：登录去投网官网网官网www.qutouwang.com，点击网，点击网页右上角【注册】，填写相关信息，输入手机号码及密码，获取验证码即可注册成功。 手机端注册（ios版本/安卓版本）：打开手机APP点击【账号】转跳界面进入注册页面输入手机号码获取验证码，按照步骤注册成功。</p>
          </Panel>
          <Panel header="2、注册时手机收不到验证码怎么办？怎么办？ 怎么办？怎么办？怎么办？" key="2">
            <p><p>网页端注册：登录去投网官网网官网www.qutouwang.com，点击网，点击网页右上角【注册】，填写相关信息，输入手机号码及密码，获取验证码即可注册成功。 手机端注册（ios版本/安卓版本）：打开手机APP点击【账号】转跳界面进入注册页面输入手机号码获取验证码，按照步骤注册成功。</p></p>
          </Panel>
          <Panel header="3、如何成为去投网注册会员？" key="3">
            <p><p>网页端注册：登录去投网官网网官网www.qutouwang.com，点击网，点击网页右上角【注册】，填写相关信息，输入手机号码及密码，获取验证码即可注册成功。 手机端注册（ios版本/安卓版本）：打开手机APP点击【账号】转跳界面进入注册页面输入手机号码获取验证码，按照步骤注册成功。</p></p>
          </Panel>
        </Collapse>
      </div>
    )
  }

}
export default Helpfunds;

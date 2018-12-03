/**
 * 常见问题
 */
import React from 'react';
import { connect } from 'dva';
import { Collapse } from 'antd';
import styles from './Helplogin.less';
@connect(state => ({
  global: state.global,
}))
export default class Question extends React.Component {

  render(){
  	const Panel = Collapse.Panel;
    return(
      <div className={styles.question}>
        <Collapse  bordered={false} defaultActiveKey={['1']} accordion>
          <Panel header="1、什么是智享服务？" key="1">
            <p>智享自动投标服务（本网站称“智享服务”）是基于去投网网贷大数据，运用自动投标、分散出借、风险管理等方法实现的帮助出借人快速出借、智能匹配债权的自动投标工具，同时兼顾出借人回报和流动性的需求而推出的智能出借服务。该服务的宗旨是帮助出借人尽快匹配到合适的散标债权，提高资金利用效率，让出借更便捷、轻松、智能。</p>
          </Panel>
          <Panel header="2、回报目标值如何计算？" key="2">
            <p><p>网页端注册：登录去投网官网网官网www.qutouwang.com，点击网，点击网页右上角【注册】，填写相关信息，输入手机号码及密码，获取验证码即可注册成功。 手机端注册（ios版本/安卓版本）：打开手机APP点击【账号】转跳界面进入注册页面输入手机号码获取验证码，按照步骤注册成功。</p></p>
          </Panel>
          <Panel header="3、服务期限结束后如何退出？是否可以提前退出？" key="3">
            <p><p>网页端注册：登录去投网官网网官网www.qutouwang.com，点击网，点击网页右上角【注册】，填写相关信息，输入手机号码及密码，获取验证码即可注册成功。 手机端注册（ios版本/安卓版本）：打开手机APP点击【账号】转跳界面进入注册页面输入手机号码获取验证码，按照步骤注册成功。</p></p>
          </Panel>
        </Collapse>
      </div>
    )
  }

}

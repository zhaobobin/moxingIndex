/**
 * 常见问题
 * 
 * 
 * 
 * 
 */
import React from 'react';
import { connect } from 'dva';
import { Collapse } from 'antd';
import styles from './Question.less';



@connect(state => ({
  global: state.global,
}))
export default class Question extends React.Component {

  render(){
  	const Panel = Collapse.Panel;
    return(
      <div className={styles.question}>
        <Collapse  bordered={false}  defaultActiveKey={['1']} accordion>
          <Panel header="1、什么是智享服务？" key="1">
            <p>智享自动投标服务（本网站称“智享服务”）是基于去投网网贷大数据，运用自动投标、分散出借、风险管理等方法实现的帮助出借人快速出借、智能匹配债权的自动投标工具，同时兼顾出借人回报和流动性的需求而推出的智能出借服务。该服务的宗旨是帮助出借人尽快匹配到合适的散标债权，提高资金利用效率，让出借更便捷、轻松、智能。</p>
          </Panel>
          <Panel header="2、回报目标值如何计算？" key="2">
            <p>当出借人授权服务期限结束时，若出借人加入资金对应借款产生的总利息（下称"期间总利息"）小于或等于回报目标值，则去投网平台不向出借人收取管理费用；若期间总利息大于回报目标值，则超过目标值的部分为去投网平台收取的服务管理费用，在出借人授权服务期限结束时予以扣除。<br />
            出借人加入智享服务的回报目标值=P×Y⁄12×M+P×Y⁄360×D，其中<br />
            P: 甲方授权出借本金<br />
Y: 参考年回报率<br />
M: 授权服务期限开始日（含）至甲方退出本次智享服务之日（含）之间足月部分的月数。<br />
D: 授权服务期限开始日（含）至甲方退出本次智享服务之日（含）之间足月部分以外的剩余天数。<br />
            </p>
          </Panel>
          <Panel header="3、服务期限结束后如何退出？是否可以提前退出？" key="3">
            <p>授权服务期限结束后，系统会自动发起债权转让；去投网将协助出借人与其他用户之间进行债权转让。当出借人所持有的全部债权标的转让完成后，资金回收到出借人的去投网账户余额，对应的智享服务终止。目前智享服务不支持提前退出。</p>
          </Panel>
          <Panel header="4、智享服务安全吗？" key="4">
            <p>去投网将始终秉持严谨负责的态度对每笔借款进行严格筛选，同时具备专业的贷后管理团队和高效的催收流程，最大限度的保护出借人的权益。<br />
            去投网平台仅为信息发布平台，未以任何明示或暗示的方式对出借人提供担保或承诺保本保息，出借人应根据自身的出借偏好和风险承受能力进行独立判断和作出决策，并自行承担资金出借的风险与责任。网贷有风险，出借需谨慎。</p>
          </Panel>          
        </Collapse>
      </div>
    )
  }

}

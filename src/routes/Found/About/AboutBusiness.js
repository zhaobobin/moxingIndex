/**
 * 业务模式
 */
import React from 'react';
import { connect } from 'dva';
import styles from './AboutBusiness.less';
@connect(state => ({
  global: state.global,
}))

class AboutBusiness extends React.Component {

  render(){

    return(
      <div className={styles.helpBusiness}>
        <p>“散标出借”是去投网平台推出的线上个人网络借贷撮合匹配及信息中介服务；<br />借款人通过去投网平台的审核后，方可在去投网平台上发布借款信息，出借人可通过去投网平台与借款人直接完成电子借款协议的签署，并通过银行存管系统进行款项的划转；<br />出借人通过等额本息的方式每月收取出借本金和利息回报。</p>
        <img src={require('../../../assets/help/business.jpg')} />
      </div>
    )
  }

}
export default AboutBusiness;

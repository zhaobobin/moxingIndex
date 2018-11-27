/**
 * 去投网介绍
 */
import React from 'react';
import { connect } from 'dva';
import styles from './HelpIntroduction.less';

@connect(state => ({
  global: state.global,
}))

class HelpIntroduction extends React.Component {

  render(){

    return(
      <div className={styles.introduction}>
        <h1>投网惠生活，更自由！</h1>
        <div className={styles.word}>
          <p>去投网，国内领先的创新型互联网出借服务平台，普惠金融的践行者，专注中小微企业、个体商户及个人的资金发展需求，长期致力于全民信用体系的构建与完善。 </p>
          <p>去投网是一家纯粹的第三方网络借贷信息中介服务平台。去投网绝不设立“资金池”，仅提供信用咨询、评审、推荐等服务，在出借者和借款者之间搭起资金调配的桥梁。通过去投网平台，您可以将手中的富余资金，出借给由信用良好的小微企业或个人，并获得相应的出借回报。 </p>
          <p>去投网平台发布的项目均要对借款企业、商户和个人信息的真实性、抵质押物的有效性、评估借款风险性等指标进行有效严格审核评估；平台坚决不接触用户资金，资金会通过存管银行直接汇入借款企业、商户或个人账户。</p>
          <p>去投网致力于打造一个便捷高效的P2P、P2C模式的互联网出借平台。专业的风控体系，严格的资产管理，完善的措施，专家级的金融团队，一站式的服务体验。</p>
          <p>去投网，互联网金融的领跑者。</p>
        </div>
      </div>
    )
  }

}
export default HelpIntroduction;

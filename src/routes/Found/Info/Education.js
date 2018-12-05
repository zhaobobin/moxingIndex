import React from 'react';
import { connect } from 'dva';
import styles from "./Education.less";
import {Link} from "react-router-dom";
import { Icon } from 'antd';
import Information from "~/components/Information/Information";
import Signature from "~/components/Information/signature";
@connect(state => ({
  global: state.global,
}))
export default class Education extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    return(
      <div >
        <Information>
          <p>《网络借贷信息中介机构业务活动管理暂行办法》第九条规定网络借贷信息中介机构应当履行下列义务：“持续开展网络借贷知识普及和风险教育活动，加强信息披露工作，引导出借人以小额分散的方式参与网络借贷，确保出借人充分知悉借贷风险”。去投网平台根据监管规定开立专门的出借人教育专栏，并分为“法律法规”和“风险提示书”栏目，供平台用户了解学习。</p>
        <h4 className={styles.EducationTitle}> <span className={styles.content}>风险提示 <span></span></span></h4>
        <p>尊敬的出借人:</p>
        <p className={styles.EducationCont}>出借有风险，当您（贵公司）出借时，可能获得利息，但同时也面临着风险。您（贵公司）在做出接受网络借贷信息中介机构服务和出借决策之前，请仔细阅读本风险提示书，全面认识网络借贷出借人的禁止性行为及网络借贷的风险和特性，认真考虑本服务存在的各项风险因素，并充分考虑自身的投资风险意识、风险识别能力和风险承受能力，谨慎做出接受服务和出借的决策。 根据有关法律法规，网络借贷信息中介机构和出借人做出如下承诺、风险提示及声明：</p>

        <h4>一、禁止性行为</h4>
        <div>
          <p>您作为网络借贷活动的出借人，不得从事以下行为或存在以下情形： </p>
          <p>1、向网络借贷信息中介机构提供不真实、不准确、不完整的信息； </p>
          <p>2、使用非法资金或非自有资金进行出借； </p>
          <p>3、不具备与进行网络借贷活动相适应的风险认知和承受能力，投资于与自身风险承受能力不匹配的融资项目； </p>
          <p>4、其他借贷合同及有关协议约定的禁止性行为。</p>
        </div>
        <h4>二、风险提示</h4>
        <div>
          <p>（一）主要风险 </p>
          <p>1、资金损失风险 网络借贷信息中介机构将按照依法、诚信、自愿、公平的原则为出借人和借款人提供信息中介服务，维护出借人与借款人的合法权益。但网络借贷信息中介机构不提供增信服务，不承担借贷违约风险。出借人和借款人遵循借贷自愿、诚实守信、责任自负、风险自担的原则承担借贷风险，出借人自行承担借贷产品的本息损失。</p>
          <p>2、借款人风险 借款人因经验及能力不足风险、婚姻及家庭不稳定风险、居住不稳定风险、品质及道德风险、健康风险、信用风险、经营风险、股权风险、管理不足风险、还款能力不足风险、过度负债风险等原因，未按照合同约定还款，导致出借人的出借本金和利息无法按时回收。</p>
          <p>3、出借人风险 出借人因其出借风险意识、风险识别能力、出借经历、风险承受能力等原因，未能准确了解借贷风险，出借决策产生偏差，致使自身遭受损失。</p>
          <p>4、资金回收风险 针对出借人出借本金或者回款再出借资金，网络借贷信息中介机构会积极协助出借人寻找、推荐借款人，以完成资金出借、获取利息之目的，但寻找、推荐借款人日期存在一定不确定性，会导致出借人在出借期限届满后可能无法完全回收出借资金和获得利息。</p>
          <p>5、促成失败的风险 本次借款的促成需符合相关法律法规的规定和借款合同的约定，可能存在不能满足成立条件从而无法成立的风险。</p>
          <p>6、市场风险 网络借贷行业因受经济因素、政治因素等各种因素影响而引起的波动，从而会产生风险。</p>
        </div>
        <div>
          <p>（二）一般风险 </p>
          <p>1、税收风险 对于本借款所适用的税务政策，中国财政机关和税务机关尚未制定统一、完善的税务法律体系，且由于各地方政府税务机关存在执行不统一、稳定性差、缺乏足够的政策支持等特点，出借人的利息收入可能会因相应的税收政策的变化而受到不利影响。</p>
          <p>2、经济周期风险 经济运行具有周期性的特点，全球宏观经济运行状况将对出借人获得期待利息产生影响，从而产生风险。</p>
          <p>3、管理风险 网络借贷信息中介机构的知识、经验、判断、决策、技能等，会影响其对信息的搜集、信息交互和对借款人的资信评估，将会影响出借人的利息收入，从而产生风险。</p>
          <p>4、经营风险 网络借贷信息中介机构承诺将按照相关法律法规的规定进行运营及管理，但无法保证永久符合相关法律和监管部门的要求。如网络借贷信息中介机构无法继续经营网络借贷信息中介业务或发生重大业务调整，或财产状况发生重大变化，则可能会对出借人产生不利影响。 网络借贷信息中介机构有权将借款人信息复核、贷后跟踪等用户服务事项以委托服务/服务外包等方式交由其他机构办理，因合作机构不符合监管部门规定的资质，或被监管部门撤销相关业务许可、责令停业整顿等原因不能正常履行职责，或不具备提供服务的相关条件、或因管理不善，或发生停业、解散、破产、被吊销营业执照等情形，可能会给出借人带来一定的风险。</p>
          <p>5、操作或技术风险 操作或技术风险是指网络借贷信息中介机构、支付机构或资金存管机构在业务操作过程中，因内部控制存在缺陷或者人为因素造成操作失误或违反操作规程等引致的风险，例如交易错误、IT系统故障等风险。</p>
          <p>6、法律和政策风险 法律法规的变化，货币政策、财政政策、行业政策的调整，以及监管部门对金融市场和网贷行业监管政策的调整，均可能影响本次借款的资金成本和履约表现，从而产生本息损失的风险。</p>
          <p>7、其他风险 战争、自然灾害等不可抗力的出现，可能导致借贷本息遭受损失。代理机构违约等超出网络借贷信息中介机构自身直接控制能力范围之外的风险，也可能导致出借人的利益受损，从而带来风险。</p>
        </div>
        <h4 className={styles.EducationTitle}> <span className={styles.content}>法律法规 <span></span></span></h4>
              <ul className={styles.listUl}>
                <li>
                <a href='http://www.gov.cn/zhengce/content/2016-10/13/content_5118471.htm'>
                <span className={styles.LiCont}>国务院办公厅关于印发互联网金融风险专项整治工作实施方案的通知</span> <Icon type="right" />
                </a>
                </li>
                <li>
                <a href='http://www.gov.cn/xinwen/2017-06/28/content_5206540.htm'>
                  <span className={styles.LiCont}>三部门关于进一步加强校园贷规范管理工作的通知</span> <Icon type="right" />
                </a>
                </li>
                <li>
                <a target="_blank" href='https://hyxd.qutouwang.com/pdf/xjd.pdf'>
                 <span className={styles.LiCont}>关于规范整顿“现金贷”业务的通知</span> <Icon type="right" />
                </a>
                </li>
                <li>
                <a href='http://www.cbrc.gov.cn/govView_C8D68D4C980A4410B9F4E21BA593B4F2.html'>
                 <span className={styles.LiCont}>中国银监会办公厅关于印发网络借贷信息中介机构业务活动信息披露指引的通知</span> <Icon type="right" />
                </a>
                </li>
                <li>
                <a href='http://www.miit.gov.cn/n1146285/n1146352/n3054355/n3057254/n3057259/c3868973/content.html'>
                 <span className={styles.LiCont}>中华人民共和国电子签名法（2015年修正）</span> <Icon type="right" />
                </a>
                </li>
                <li>
                <a href='http://www.court.gov.cn/zixun-xiangqing-15146.html'>
                  <span className={styles.LiCont}>最高人民法院关于审理民间借贷案件适用法律若干问题的规定</span> <Icon type="right" />
                </a>
                </li>
                <li>
                <a href='http://www.cbrc.gov.cn/chinese/home/docDOC_ReadView/275.html'>
                 <span className={styles.LiCont}>中国银监会办公厅关于印发网络借贷资金存管业务指引的通知</span> <Icon type="right" />
                </a>
                </li>
                <li>
                <a href='http://www.cbrc.gov.cn/chinese/home/docDOC_ReadView/275.html'>
                 <span className={styles.LiCont}>中国人民银行、中国银行业监督管理委员会公告</span> <Icon type="right" />
                </a>
                </li>
                <li>
                <a href='http://www.gov.cn/xinwen/2015-07/18/content_2899360.htm'>
                  <span className={styles.LiCont}>人民银行等十部门发布《关于促进互联网金融健康发展的指导意见》 </span> <Icon type="right" />
                </a>
                </li>
                <li>
                <a href='http://www.cbrc.gov.cn/govView_37D312933F1A4CECBC18F9A96293F450.html'>
                 <span className={styles.LiCont}>网络借贷信息中介机构业务活动管理暂行办法</span> <Icon type="right" />
                </a>
                </li>

              </ul>


       <Signature/>
      </Information>
      </div>
    )
  }

}

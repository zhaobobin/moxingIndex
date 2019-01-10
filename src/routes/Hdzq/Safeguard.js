//banner-等级保护
import React from 'react';
import { connect } from 'dva';
//样式
import styles from './Safeguard.less';

@connect(state => ({
  global: state.global,
}))
export default class Safeguard extends React.Component {
  
  render(){   
    return(
     <div className={styles.safeguard}>
        <div className={styles.safeguardBanner}>
           <img src={require('../../assets/safeguard/app_sanjdb_top.png')} />
        </div>   
        <div className={styles.safeguardCon}>
            <div className={styles.safeguardWid}>
                  <div className={styles.safeguard1}>
                      <div className={styles.safeguardWord}>
                       <h1>2017年5月17日</h1>                       
                       <p>去投网以91分的高分顺利通过公安部信息系统安全等级保护三级测评，这标志着去投网拥有完善的网络攻击防范机制，为保护用户隐私、交易安全筑起了一道坚实的防火墙。</p>
                       </div>
                       <div className={styles.safeguard1img}><img src={require('../../assets/safeguard/app_sanjdb_pre.png')} /><span>非银行机构信息安全最高级别</span></div>
                  </div>
                  <div className={styles.safeguard2}>                     
                     <dl className={styles.safeguard2Dl}>
                       <dt>01</dt>
                       <dd><span>国家网络信息安全等级是什么?</span><i>What is the level of National Network Information Security</i></dd>
                     </dl>
                     <div className={styles.safeguard2Word}>
                     <img src={require('../../assets/safeguard/pc_sanjdb_mestop.png')} />
                     <div className={styles.safeguard2midd}><p>国家信息安全等级保护认证是中国最权威的信息产品安全等级资格认证，由公安机关依据国家信息安全保护条例及相关制度，按照管理规范和技术标准，对各机构的信息系统安全等级保护状况进行认可及评定。</p><p>信息安全保护等级共分为5级，等级越高意味着安全保护能力越强，其中三级是国家对非银行机构的最高级认证。</p><p> 目前，大多数互联网金融平台以第二级认证为主，第三级属于“监管级别”，四大国有银行(总行)的一二级分行(省行、市行)等<span>重要金融机构一般是第三级认证</span>。</p></div>
                    <img src={require('../../assets/safeguard/pc_sanjdb_mesbot.png')} />
                    </div>
                  </div>
                  <div className={styles.safeguard2}>
                     <dl className={styles.safeguard2Dl}>
                       <dt>02</dt>
                       <dd><span>三级等保认证有多严格?</span><i>How strict is the certification of third-class insurance</i></dd>
                     </dl>
                     <div className={styles.safeguard2Word}>
                     <img src={require('../../assets/safeguard/pc_sanjdb_mestop.png')} />
                       <div className={styles.safeguard2midd}><p>三级等保是由国家信息安全监管部门进行监督、检查，认证需要测评内容涵盖5个等级保护安全技术要求和5个安全管理要求，主要包含信息保护、安全审计、通信保密等近300项要求，共涉及测评分类73类，<span>要求十分严格</span>。</p></div>
                     <img src={require('../../assets/safeguard/pc_sanjdb_mesbot.png')} />
                     </div>
                  </div>
                  <div className={styles.safeguard2}>
                     <dl className={styles.safeguard2Dl}>
                       <dt>03</dt>
                       <dd><span>三级等保有何作用？</span><i>What is the role of tertiary retention</i></dd>
                     </dl>
                     <div className={styles.safeguard2Word}>
                     <img src={require('../../assets/safeguard/pc_sanjdb_mestop.png')} />
                      <div className={styles.safeguard2midd}><p>（1）保障去投网客户信息不被窃取或损坏； </p><p>（2）有效防范黑客等不法分子通过网络展开的各种攻击以及病毒入侵； </p><p>（3）加强去投网对客户信息库的安全防护，<span>防止客户信息泄露</span>。</p></div>
                     <img src={require('../../assets/safeguard/pc_sanjdb_mesbot.png')} />
                     </div>
                  </div>
             </div>
        </div>
    </div>
    )
  }

}

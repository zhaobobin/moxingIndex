//banner-安心签
import React from 'react';
import { connect } from 'dva';

//样式
import styles from './Electronic.less';

@connect(state => ({
  global: state.global,
}))
export default class Electronic extends React.Component {
  render(){  
    return(
      <div className={styles.electronic}>      
      <div className={styles.electronicTop}><img src={require('../../assets/electronic/app_bg_01.jpg')} /></div>
      <div className={styles.cfca}>
      <div className={styles.electronicWin}>
         <div className={styles.cfcaWord}>
              <h1><img src={require('../../assets/electronic/title01.png')} /></h1>
              <p>中国金融认证中心：China Financial Certification Authority，简称CFCA，是由中国人民银行于1998年牵头组建、经国家信息安全管理机构批准成立的国家级权威安全认证机构，是国家重要的金融信息安全基础设施之一。在《中华人民共和国电子签名法》颁布后，CFCA成为首批获得电子认证服务许可的电子认证服务机构。</p>
         </div>
      </div>   
      </div> 
      <div className={styles.cfcaBottom}><img src={require('../../assets/electronic/app_bg_03.jpg')} /></div>
      <div className={styles.dzqz}>
      <div className={styles.electronicWin}>
        <div className={styles.cfcaWord}>
              <h1><img src={require('../../assets/electronic/title02.png')} /></h1>
              <p>电子签章，是以先进的数字技术模拟传统实物印章，其管理、使用方式符合实物印章的习惯和体验，其加盖的电子文件具有与实物印章加盖的纸张文件相同的外观、相同的有效性和相似的使用方式。 中国于2005年4月1日正式实施《电子签名法》后，电子签章的有效性得到官方保障。</p>
         </div>
         </div>
      </div>
      <div className={styles.dzqzYsTop}><img src={require('../../assets/electronic/app_bg_05.jpg')} /></div>
      <div className={styles.dzqzYs}>
         <div className={styles.electronicWin}>
        <div className={styles.cfcaWord}>
              <h1><img src={require('../../assets/electronic/title03.png')} /></h1>
              <p>去投网引进的CFCA电子签章，通过可视化签章效果，为用户提供了身份识别、数据加密等安全加密服务，并通过X.509数字证书、对称密钥算法、非对称密钥算法，实现了数据防篡改和不可否认性。 <br />这意味着用户在去投网签署的电子合同，具有与纸质合同相同的法律效力,<span>被法律保护、不可被篡改、不能被否认、不会被泄露。</span></p>
         </div>
         </div>
      </div>
      <div className={styles.dzqzYsBom}>
           <div className={styles.electronicWin}>
           <ul>
             <li className={styles.dzqzYs1}><img src={require('../../assets/electronic/pc_icon1.png')} /><span><img src={require('../../assets/electronic/word_01.png')} /></span></li>
             <li className={styles.dzqzYs2}><img src={require('../../assets/electronic/pc_icon2.png')} /><span><img src={require('../../assets/electronic/word_02.png')} /></span></li>
             <li className={styles.dzqzYs3}><img src={require('../../assets/electronic/pc_icon3.png')} /><span><img src={require('../../assets/electronic/word_03.png')} /></span></li>
           </ul>
      </div>
      </div>
      </div>
    )
  }

}

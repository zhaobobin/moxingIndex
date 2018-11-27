/**
 * 品牌优势
 */
import React from 'react';
import { connect } from 'dva';
import styles from './HelpBrand.less';
@connect(state => ({
  global: state.global,
}))

class HelpBrand extends React.Component {

  render(){

    return(
      <div>
        <ul className={styles.helpbrand}>
          <li className={styles.helpbrandLi1}>
            <div className={styles.brandImg}>
              <img src={require('../../../assets/help/aboutus_advantage1.png')} />
              <div className={styles.brandWord}><span>平台优势</span>专业、高效！出借灵活，小额分期</div>
            </div>
            </li>
          <li className={styles.helpbrandLi2}>
            <div className={styles.brandImg}>
              <img src={require('../../../assets/help/aboutus_advantage2.png')} />
            <div className={styles.brandWord}><span>服务优势</span>专业服务团队，快速响应，确保优质用户体验。</div>
            </div>
          </li>
          <li className={styles.helpbrandLi3}>
            <div className={styles.brandImg}>
              <img src={require('../../../assets/help/aboutus_advantage3.png')} />
              <div className={styles.brandWord}><span>技术优势</span>技术团队很多都来自国内主流的金融、互联网公司</div>
            </div>
          </li>
          <li className={styles.helpbrandLi4}>
            <div className={styles.brandImg}>
              <img src={require('../../../assets/help/aboutus_advantage4.png')} />
              <div className={styles.brandWord}>
            <span>风控优势</span>专业的风控团队，严谨的信审流程。
              </div>
            </div>
          </li>
        </ul>
      </div>
    )
  }

}
export default HelpBrand;

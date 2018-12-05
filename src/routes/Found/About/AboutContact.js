/**
 * 联系我们
 */
import React from 'react';
import { connect } from 'dva';
import styles from './AboutContact.less';

@connect(state => ({
  global: state.global,
}))

class AboutContact extends React.Component {

  render(){

    return(
      <div className={styles.contact}>
        <div className={styles.contactBg}>
          <img src={require('../../../assets/help/aboutus_contectus.png')} />
          <div>客服、投诉、举报电话<span>400 181 0588</span></div>
        </div>
        <ul>
          <li><span>联系地址：</span><i>北京市朝阳区亮马桥路甲40号1幢4层401内B0 2A室</i></li>
          <li><span>邮政编码：</span>100105</li>
          <li><span>客服、投诉、举报邮箱：</span>qutouwang@chinacfsc.com</li>
        </ul>
      </div>
    )
  }

}
export default AboutContact;

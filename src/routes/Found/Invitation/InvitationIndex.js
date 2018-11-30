/*邀请好友首页*/
import React from 'react';
import { connect } from 'dva';
import styles from './InvitationIndex.less';

@connect(state => ({
  global: state.global,
}))
export default class InvitationIndex extends React.Component {

  render(){
    return(
      <div className={styles.Box}>
        <img src={require("~/assets/Invitation/invite_friends_head@2x.png")} alt="" className={styles.InvitationImg}/>
        <div className={styles.titleBox}>
          <img src={require("~/assets/Invitation/invite_title_icon1@2x.png")} alt="" className={styles.Img}/>
          <span>通过以下方式邀请好友</span>
          <img src={require("~/assets/Invitation/invite_title_icon2@2x.png")} alt="" className={styles.Img}/>
        </div>
        <div className={styles.codeBox}>
              <p>方法一:扫描二维码立即邀请</p>
          <div className={styles.code}>
          </div>
        </div>
        <div className={styles.shareBox}>
          <p>方法二:将邀请码分享至好友</p>
          <h3>1800000001234</h3>
          <img src={require("~/assets/Invitation/invite_bottom_btn@2x.png")} alt="" className={styles.Img}/>
        </div>
      </div>
    )
  }

}

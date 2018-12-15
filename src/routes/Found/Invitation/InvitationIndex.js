/*邀请好友首页*/
import React from 'react';
import { connect } from 'dva';
import styles from './InvitationIndex.less';
import ResultJson from '~/routes/Result/ResultJson'
@connect(state => ({
  global: state.global,
}))
export default class InvitationIndex extends React.Component {
	constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.state = {
      invitationCode: '',
      webUrl: '',
    }
  }

  componentDidMount(){
    this.queryInvitationCount()
  }

  //查询邀请码
  queryInvitationCount = () => {

    if(!this.ajaxFlag) return;
    this.ajaxFlag = false;

    const {userId} = this.props.global.currentUser.userInfo;

    this.props.dispatch({
      type: 'global/post',
      url:'/api/accountNotice/sharingNotification',
      payload:{
        userId,
        productType: 5
      },
      callback: (res)=>{
        setTimeout(() => { this.ajaxFlag = true }, 500);
        if(res.code === 0){
          this.setState({
            invitationCode: res.data.invitationCode,
            webUrl: res.data.webUrl
          })
        }
      }
    })
  };
 redirect = (action) => {
    window.location.href = window.location.href + '&action=' + action;
    setTimeout(() => {
      window.location.reload();
    }, 500)
  };
  render(){
  	 const {invitationCode} = this.state;
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
          <img src={require("~/assets/Invitation/rwm.png")} alt="" />
          </div>
        </div>
        <div className={styles.shareBox}>
          <p>方法二:将邀请码分享至好友</p>
          <h3>{invitationCode}</h3>
          <img src={require("~/assets/Invitation/invite_bottom_btn@2x.png")} alt="" className={styles.Img}  onClick={() => this.redirect(ResultJson.share_yaoqing.action)}/>
        </div>
      </div>
    )
  }

}

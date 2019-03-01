import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Button } from 'antd';
import { Toast } from 'antd-mobile';
import copy from 'copy-to-clipboard';
import { numberFormat } from "~/utils/utils";
import styles from './InviteRecord.less'

import InviteList from '~/components/Account/AccountInvite/InviteList'

@connect(state => ({
  global: state.global,
}))
export default class InviteRecord extends React.Component {

  constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.state = {
      loading: true,
      total: null,
      invitationDetail: '',
      webUrl: '',
    }
  }

  componentDidMount(){
    this.queryInvitationCount();
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
        productType: 5,
        equipmentType: 'pc',
        //exp: 3600 * 24
      },
      callback: (res)=>{
        setTimeout(() => { this.ajaxFlag = true }, 500);
        if(res.code === 0){
          this.setState({
            webUrl: res.data.webUrl
          })
        }
      }
    })
  };

  copyLink = () => {
    copy(this.state.webUrl);
    Toast.info('邀请好友链接已复制成功，可分享给好友', 2);
  };

  listCb = (data) => {
    this.setState({
      loading: false,
      invitationDetail: data.invitationDetail
    })
  };

  render(){

    const { invitationDetail } = this.state;

    return(
      <div className={styles.record}>

        <div className={styles.head}>
          <div className={styles.com}>
            <div className={styles.amt}>
              <p>
                <span>
                  {
                    invitationDetail && invitationDetail.invitationTotalAmt ?
                      numberFormat(invitationDetail.invitationTotalAmt)
                      :
                      '0.00'
                  }
                </span>
                <em>元</em>
              </p>
              <label>累计奖励金额</label>
            </div>
            <ul className={styles.p2}>
              <li>
                <p>
                  <span>
                    {
                      invitationDetail && invitationDetail.receiverNum ?
                        invitationDetail.receiverNum
                        :
                        0
                    }
                  </span>
                  <em>人</em>
                </p>
                <label>累计邀请好友人数</label>
              </li>
              <li>
                <p>
                  <span>
                    {
                      invitationDetail && invitationDetail.investTotalAmt ?
                        numberFormat(invitationDetail.investTotalAmt)
                        :
                        '0.00'
                    }
                  </span>
                  <em>元</em>
                </p>
                <label>累计好友出借金额</label>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.body}>
          <InviteList callback={this.listCb}/>
        </div>

        <div className={styles.foot}>
          <Button type="primary" size="large" onClick={this.copyLink}>立即邀请</Button>
        </div>

      </div>
    )
  }

}

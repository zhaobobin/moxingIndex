import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Button } from 'antd';
import { Toast } from 'antd-mobile';
import copy from 'copy-to-clipboard';
import { numberFormat } from "~/utils/utils";
import styles from './InviteRecord.less'

import CusListView from '~/components/List/CusListView'
import InviteItem from '~/components/Account/AccountInvite/InviteItem'

@connect(state => ({
  global: state.global,
}))
export default class InviteRecord extends React.Component {

  constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.state = {
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

  queryCallback = (values) => {
    if(!values) return;
    this.setState({
      total: values.count,
      invitationDetail: values.invitationDetail
    })
  };

  render(){

    const { userId } = this.props.global.currentUser.userInfo;
    const { total, invitationDetail, webUrl } = this.state;

    return(
      <div className={styles.record}>

        {
          total > 0 ?
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
            :
            null
        }

        {
          total > 0 ?
            <div className={styles.tableHead}>
              <div className={styles.hr}/>
              <p>
                <span className={styles.sp1}>好友手机号码</span>
                <span className={styles.sp2}>累计邀请好友奖励</span>
                <span className={styles.sp3}>注册时间</span>
              </p>
            </div>
            :
            null
        }

        <div className={styles.body}>
          <CusListView
            api="/api/home/app/findAppInvitationRecord"
            queryParams={{
              userId,                 //19010310321353
            }}
            listViewProps={{
              pageSize: 10,
              useBodyScroll: false,
              renderHeader: false,
              renderItem: (item, id, webUrl) => <InviteItem item={item} id={id} webUrl={webUrl}/>
            }}
            callback={this.queryCallback}
          />
        </div>

        {
          total > 0 ?
            <div className={styles.foot}>
              <Button type="primary" size="large" onClick={this.copyLink}>立即邀请</Button>
            </div>
            :
            null
        }

      </div>
    )
  }

}

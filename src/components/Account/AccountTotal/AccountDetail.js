import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Avatar, Icon } from 'antd';
import styles from './AccountDetail.less'

import eye_img1 from '~/assets/sign/signremind_open@2x.png'
import eye_img2 from '~/assets/sign/invisible@2x.png'

@connect(state => ({
  global: state.global,
}))
export default class AccountDetail extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      showAmt: true
    }
  }

  changeEye = () => {
    let showAmt = !this.state.showAmt;
    this.setState({
      showAmt
    })
  };

  render(){

    const { showAmt } = this.state;
    const { userInfo } = this.props.global.currentUser;

    return(
      <div className={styles.detail}>
        <div className={styles.com}>

          <div className={styles.head}>
            <Link to="/account/assets">
              <div className={styles.avatar}>
                {
                  userInfo.headImg ?
                    <Avatar src={userInfo.headImg} size={28} />
                    :
                    <Avatar icon="user" size={28} />
                }
              </div>
              <div className={styles.username}>
                {userInfo.mobile}
              </div>
            </Link>
          </div>

          <div className={styles.body}>

            <span className={styles.eye} onClick={this.changeEye}>
              <img src={showAmt ? eye_img1 : eye_img2} alt="eye"/>
            </span>

            <div className={styles.assets}>
              <label>资产总额(元) <i/></label>
              <p>
                {
                  showAmt ?
                    <span>{userInfo.accountTol}</span>
                    :
                    <span>******</span>
                }
              </p>
            </div>

            <div className={styles.amt}>
              <ul>
                <li>
                  <label>昨日回报(元)</label>
                  <p>
                    {
                      showAmt ?
                        <span className={styles.orange}>{userInfo.todayIncome || '0.00'}</span>
                        :
                        <span>******</span>
                    }
                  </p>
                </li>
                <li>
                  <label>账户可用余额(元)</label>
                  <p>
                    {
                      showAmt ?
                        <span>{userInfo.oldFreeAmt!=='0.00' ? userInfo.freeAmt + '+' + userInfo.oldFreeAmt :  userInfo.freeAmt}</span>
                        :
                        <span>******</span>
                    }
                  </p>
                </li>
              </ul>
            </div>

          </div>

          <div className={styles.foot}>
            <ul>
              <li>
                <p>
                  <img src={require('~/assets/account/m_my_invent@2x.png')} alt="我的邀请"/>
                  <Link to="/account/invite">我的邀请 <span>{userInfo.invitationCount || 0}</span></Link>
                </p>
              </li>
              <li>
                <p>
                  <img src={require('~/assets/account/m_my_coupon@2x.png')} alt="我的优惠卷"/>
                  <Link to="/account/coupons">我的优惠卷 <span>{userInfo.couponNum || 0}</span></Link>
                </p>
              </li>
            </ul>
          </div>

        </div>
      </div>
    )
  }

}


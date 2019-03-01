import React from 'react';
import { connect } from 'dva';
import { Link, Redirect } from 'dva/router';
import { Button } from 'antd';
import { Modal } from 'antd-mobile';
import styles from './AccountTotal.less'

import AccountDetail from '~/components/Account/AccountTotal/AccountDetail'
import AccountLinks from '~/components/Account/AccountTotal/AccountLinks'

const Alert = Modal.alert;

@connect(state => ({
  global: state.global,
}))
export default class AccountTotal extends React.Component {

  //退出
  logout = () => {
    Alert('退出登录', '', [
      { text: '取消'},
      {
        text: '确定',
        onPress: () => {
          this.props.dispatch({
            type: 'global/logout',
            callback: () => {}
          })
        }
      },
    ])
  };

  render(){

    return(
      <div className={styles.total}>

        <AccountDetail/>

        <AccountLinks/>

        <p className={styles.download}>
          <span>提现等更多操作请</span>
          <Link to='/download'>下载去投网App</Link>
        </p>

        <div className={styles.logout}>
          <Button type="primary" size="large" onClick={this.logout}>安全退出</Button>
        </div>
      </div>
    )
  }

}

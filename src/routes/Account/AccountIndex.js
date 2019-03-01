import React from 'react';
import { connect } from 'dva';
import { Redirect } from 'dva/router';
import { ENV, Storage } from '~/utils/utils';
import styles from './AccountIndex.less'

import Loading from '~/components/Common/Loading';
import LoadingBg from '~/components/Common/LoadingBg';
import AccountTotal from './Total/AccountTotal'

@connect(state => ({
  global: state.global,
}))
export default class AccountIndex extends React.Component {

  constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.state = {
      loading: true
    }
  }

  componentDidMount(){
    let {isAuth} = this.props.global;
    if(isAuth) this.queryUserInfo();
  }

  //查询账户详情
  queryUserInfo(){
    let {userId} = this.props.global.currentUser.userInfo;
    this.props.dispatch({
      type: 'global/userinfo',
      payload:{
        userId: userId || Storage.get(ENV.storageUserId),
        platform: 'pc',
      },
      callback: (res) => {
        this.setState({
          loading: false
        })
      }
    });

  }

  render(){

    const {isAuth} = this.props.global;

    return(
      <div className={styles.account}>
        {
          isAuth ?
            <div>
              {
                this.state.loading ?
                  <LoadingBg style={{height: '100vh'}} />
                  :
                  <AccountTotal/>
              }
            </div>
            :
            <Redirect to="/user/login" />
        }
      </div>
    )
  }

}

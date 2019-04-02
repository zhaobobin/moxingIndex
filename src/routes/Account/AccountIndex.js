import React from 'react';
import { connect } from 'dva';
import { Route, Redirect, Switch } from 'dva/router';
import { Row, Col } from 'antd'
import { ENV, Storage } from '~/utils/utils';
import styles from './AccountIndex.less'

import NotFound from "~/routes/Other/page404";
import LoadingBg from '~/components/Common/LoadingBg';

import SlideUserinfo from '~/components/Account/SlideUserinfo'
import SlideMenu from '~/components/Account/SlideMenu'
import AccountContent from '~/components/Account/AccountContent'
import { Confirm } from '~/components/Dialog/Dialog'

//导入路由
import RouteExtend from '~/components/Common/RouteExtend'
const Routes = RouteExtend('account');

@connect(state => ({
  global: state.global,
}))
export default class AccountIndex extends React.Component {

  constructor(props){
    super(props);
    this.loading = false;
    this.state = {

    }
  }

  componentDidMount(){
    let {isAuth} = this.props.global;
    if(isAuth) this.queryUserInfo();
  }

  //查询账户详情
  queryUserInfo(){
    this.loading = true;
    let {uid} = this.props.global.currentUser.userInfo;
    this.props.dispatch({
      type: 'global/userinfo',
      payload:{
        uid: uid,
      },
      callback: (res) => {
        this.loading = false;
      }
    });

  }

  logout = () => {
    Confirm({
      title: '确定要退出登录吗？',
      callback: (res) => {
        if(res === 1){
          this.props.dispatch({
            type: 'global/logout',
            payload: {},
            callback: () => {}
          })
        }
      }
    })
  };

  render(){

    const { isAuth, currentUser } = this.props.global;

    return(
      <div className={styles.account}>

        {
          this.loading ?
            <LoadingBg/>
            :
            <Row>

              <Col xs={1} sm={2} md={4} lg={4}/>

              <Col xs={22} sm={20} md={16} lg={16}>

                <div className={styles.container}>
                  <div className={styles.slide}>
                    <SlideUserinfo userInfo={currentUser.userInfo}/>
                    <p className={styles.logout}>
                      <a onClick={this.logout}>安全退出</a>
                    </p>
                    <SlideMenu routes={Routes} />
                  </div>

                  <div className={styles.content}>
                    <AccountContent>
                      <Switch>
                        {
                          isAuth ?
                            <Redirect to="/user/login" />
                            :
                            Routes.children.map((item, index) => (
                              <Route
                                exact={item.exact}
                                key={item.path}
                                path={`/${Routes.path}/${item.path}`}
                                component={item.component}
                              />
                            ))
                        }
                        <Redirect exact from="/account" to="/account/total"/>
                        <Route component={NotFound} />
                      </Switch>
                    </AccountContent>
                  </div>
                </div>

              </Col>

              <Col xs={1} sm={2} md={4} lg={4}/>

            </Row>

        }

      </div>
    )
  }

}

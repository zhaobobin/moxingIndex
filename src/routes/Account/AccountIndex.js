import React from 'react';
import { connect } from 'dva';
import { Route, Redirect, Switch } from 'dva/router';
import { ENV, Storage } from '~/utils/utils';
import styles from './AccountIndex.less'

import NotFound from "~/routes/Other/page404";
import LoadingBg from '~/components/Common/LoadingBg';
import SlideMenu from '~/components/Account/SlideMenu'

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
    //if(isAuth) this.queryUserInfo();
  }

  //查询账户详情
  queryUserInfo(){
    this.loading = true;
    let {userId} = this.props.global.currentUser.userInfo;
    this.props.dispatch({
      type: 'global/userinfo',
      payload:{
        userId: userId || Storage.get(ENV.storageUserId),
        platform: 'pc',
      },
      callback: (res) => {
        this.loading = false;
      }
    });

  }

  render(){

    const { isAuth, currentUser } = this.props.global;

    return(
      <div>

        {
          this.loading ?
            <LoadingBg/>
            :
            <div className={styles.container}>
              <div className={styles.slide}>
                <SlideMenu routes={Routes} />
              </div>

              <div className={styles.content}>
                <Switch>
                  {
                    !isAuth ?
                      <Redirect to="/user/login" />
                      :
                      Routes.children.map(item =>
                        item.children.map(topic =>
                          (
                            <Route
                              exact={topic.exact}
                              key={topic.path}
                              path={`/${Routes.path}/${item.path}/${topic.path}`}
                              component={topic.component}
                            />
                          )
                        )
                      )
                  }
                  <Redirect exact from="/account" to="/account/total"/>
                  <Route component={NotFound} />
                </Switch>
              </div>
            </div>
        }

      </div>
    )
  }

}

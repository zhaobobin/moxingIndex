import React from 'react';
import { connect } from 'dva';
import { Route, Redirect, Switch } from 'dva/router';
import { ENV, Storage, getUrlParams } from '~/utils/utils';
import DocumentTitle from 'react-document-title';
import NotFound from "~/routes/Other/404";

import styles from './BaseLayout.less'
import Loading from '~/components/Common/Loading';
import GlobalHeader from '~/components/Common/GlobalHeader';
import GlobalContent from '~/components/Common/GlobalContent';

const paramsObj = getUrlParams() || '';

@connect(state => ({
  global: state.global,
}))
export default class BaseLayout extends React.Component {

  componentDidMount(){
    const { isAuth } = this.props.global;
    //处理app调用h5
    if(paramsObj.platform === 'app'){
      if(paramsObj.accessToken) Storage.set(ENV.storageAccessToken, paramsObj.accessToken);               //保存token
      if(paramsObj.userId) Storage.set(ENV.storageUserId, paramsObj.userId);                         //保存userId
      this.saveUserinfo(paramsObj)
    }else{
      if(isAuth) return;                              //isAuth为true时不校验token
      let refreshToken = Storage.get(ENV.storageRefreshToken),
        userId = Storage.get(ENV.storageUserId);
      setTimeout(() => {
        this.validateToken(refreshToken, userId, paramsObj.platform);     //页面F5刷新时执行token验证
      }, 200);
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.location.pathname !== this.props.location.pathname){
      window.scrollTo(0, 0);
      let routerHistory = Storage.get(ENV.storageHistory) || [];
      routerHistory.push(nextProps.location.pathname);
      Storage.set(ENV.storageHistory, routerHistory);
    }
  }

  //保存用户信息 http://localhost:8001/demo?accessToken=c572cadb54a74357aec2f932d7285c76&refreshToken=18b9e1df769f48d0adf5d407456f8cb6&userId=18111457224731&platform=app
  saveUserinfo = (paramsObj) => {
    this.props.dispatch({
      type: 'global/changeUserInfo',
      payload: {
        accessToken: paramsObj.accessToken,
        userId: paramsObj.userId
      },
    })
  };

  //验证token
  validateToken = (refreshToken, userId, platform) => {
    this.props.dispatch({
      type: 'global/token',
      payload: {
        refreshToken,
        userId,
        platform: platform || 'h5',
      },
      callback: (res) => {}
    })
  };

  //获取页面标题
  getPageTitle() {
    const { location, getRouteData } = this.props;
    const { pathname } = location;
    const routeData = getRouteData('BaseLayout');

    let appname = paramsObj.platform === 'app' ? '' : ' - ' + ENV.appname;

    let title = '';
    if(pathname === '/'){
      title = paramsObj.platform === 'app' ? '' : ENV.hometitle;
    }else{
      title = this.foreachTitle(routeData, pathname).slice(3) + appname;
    }
    return title;
  }

  //循环标题
  foreachTitle(routeData, pathname){
    let title = '';
    for(let i in routeData){
      if (pathname.indexOf(routeData[i].key) > -1) {
        title = this.foreachTitle(routeData[i].children, pathname) + ' - ' + routeData[i].name;
      }
    }
    return title;
  }

  getMenuData = (data, parentPath) => {
    let arr = [];
    data.forEach((item) => {
      if (item.children) {
        arr.push({ path: `${parentPath}/${item.path}`, name: item.name });
        arr = arr.concat(this.getMenuData(item.children, `${parentPath}/${item.path}`));
      }
    });
    return arr;
  };

  render(){

    const { getRouteData } = this.props;
    const { loading } = this.props.global;

    const layout = (
      <div className={styles.layout}>

        {
          paramsObj.platform === 'app' ?
            null
            :
            <GlobalHeader/>
        }

        {
          loading ?
            <Loading/>
            :
            <GlobalContent>

              <Switch>
                {
                  getRouteData('BaseLayout').map(item =>
                    (
                      <Route
                        exact={item.exact}
                        key={item.path}
                        path={item.path}
                        component={item.component}
                      />
                    )
                  )
                }
                <Redirect exact from="/account" to="/account/total" />
                <Route component={NotFound} />
              </Switch>

            </GlobalContent>
        }

      </div>
    );

    return(
      <DocumentTitle title={this.getPageTitle()}>
        {layout}
      </DocumentTitle>
    )
  }

}

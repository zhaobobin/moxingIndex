import React from 'react';
import { connect } from 'dva';
import { Route, Redirect, Switch, routerRedux } from 'dva/router';
import { TabBar } from 'antd-mobile';
import { ENV, Storage, getUrlParams } from '~/utils/utils';
import DocumentTitle from 'react-document-title';
import styles from './MobileLayout.less'

import NotFound from "~/routes/Other/page404";
import Loading from '~/components/Common/Loading';

const paramsObj = getUrlParams() || '';

@connect(state => ({
  global: state.global,
}))
export default class MobileLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fullScreen: false,
    };
  }

  componentDidMount(){
    if(paramsObj.invite) Storage.set(ENV.storageInviteCode, paramsObj.invite); // 保存邀请码
    if(paramsObj.channel) Storage.set(ENV.storageChannelCode, paramsObj.channel); // 保存邀请码
    const { isAuth } = this.props.global;
    if(isAuth) return;                              //isAuth为true时不校验token
    // console.log(Storage.get(ENV.storageAccessToken))
    let accessToken = Storage.get(ENV.storageAccessToken) || paramsObj.token;
    // let userId = Storage.get(ENV.storageUserId);
    setTimeout(() => {
      this.validateToken(accessToken);     //页面F5刷新时执行token验证
    }, 200);
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.location.pathname !== this.props.location.pathname){
      window.scrollTo(0, 0);
      let routerHistory = Storage.get(ENV.storageHistory) || [];
      routerHistory.push(nextProps.location.pathname);
      Storage.set(ENV.storageHistory, routerHistory);
    }
  }

  //验证token
  validateToken = (accessToken) => {
    this.props.dispatch({
      type: 'global/token',
      payload: {
        login_code: accessToken,
        // uid: userId
      },
      callback: (res) => {}
    })
  };

  //获取页面标题
  getPageTitle() {
    const { location, getRouteData } = this.props;
    const { pathname } = location;
    const routeData = getRouteData('MobileLayout');

    let appname = ' - ' + ENV.appname;

    let title = '';
    if(pathname === '/'){
      title = ENV.hometitle;
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

  renderContent() {
    return (
      <Switch>
        {
          this.props.getRouteData('MobileLayout').map(item =>
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
        <Redirect exact from="/m/activity" to="/m/activity/list" />
        <Redirect exact from="/m/my" to="/m/my/index" />
        <Route component={NotFound} />
      </Switch>
    );
  }

  render(){

    const { location } = this.props;
    const { loading } = this.props.global;

    const hiddenTab = location.pathname !== '/m/activity/list' && location.pathname !== '/m/my/index'
    const selectedTab = location.pathname.split('/')[2]

    const layout = (
      <div className={styles.layout}>
        {
          loading ?
            <Loading/>
            :
            <TabBar
              unselectedTintColor="#353535"
              tintColor="#FFBC00"
              barTintColor="white"
              hidden={hiddenTab}
            >
              <TabBar.Item
                title="活动"
                key="Activity"
                icon={
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: `url(${require('~/assets/tabs/home01.png')}) center center /  auto 22px no-repeat` }}
                  />
                }
                selectedIcon={
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: `url(${require('~/assets/tabs/home02.png')}) center center /  auto 22px no-repeat` }}
                  />
                }
                selected={selectedTab === 'activity'}
                // badge={1}
                onPress={() => {
                  this.setState({
                    selectedTab: 'activity',
                  });
                  this.props.dispatch(routerRedux.push('/m/activity/list'))
                }}
              >
                {
                  selectedTab === 'activity' ?
                    this.renderContent()
                    :
                    null
                }
              </TabBar.Item>
              <TabBar.Item
                icon={
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: `url(${require('~/assets/tabs/my01.png')}) center center /  auto 22px no-repeat` }}
                  />
                }
                selectedIcon={
                  <div style={{
                    width: '22px',
                    height: '22px',
                    background: `url(${require('~/assets/tabs/my02.png')}) center center /  auto 22px no-repeat` }}
                  />
                }
                title="我的"
                key="My"
                selected={selectedTab === 'my'}
                onPress={() => {
                  this.setState({
                    selectedTab: 'my',
                  });
                  this.props.dispatch(routerRedux.push('/m/my/index'))
                }}
              >
                {
                  selectedTab === 'my' ?
                    this.renderContent()
                    :
                    null
                }
              </TabBar.Item>
            </TabBar>
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

import React from 'react';
import { connect } from 'dva';
import { Route, Redirect, Switch } from 'dva/router';
import { ENV, Storage } from '~/utils/utils';
import DocumentTitle from 'react-document-title';
import NotFound from "~/routes/Other/404";

import styles from './BaseLayout.less'
import GlobalHeader from '~/components/Common/GlobalHeader';
import GlobalContent from '~/components/Common/GlobalContent';

@connect(state => ({
  global: state.global,
}))
export default class BaseLayout extends React.Component {

  componentDidMount(){
    const { isAuth } = this.props.global;
    if(!isAuth && Storage.get(ENV.storageRefreshToken)) {
      this.validateToken();     //页面F5刷新时执行token验证
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.location.pathname !== this.props.location.pathname){
      window.scrollTo(0, 0);
    }
  }

  //验证token
  validateToken = () => {
    this.props.dispatch({
      type: 'global/token',
      payload: {
        refreshToken: Storage.get(ENV.storageRefreshToken),
        userId: Storage.get(ENV.storageUserId)
      },
      callback: (res) => {}
    })
  };

  //获取页面标题
  getPageTitle() {
    const { location, getRouteData } = this.props;
    const { pathname } = location;
    const routeData = getRouteData('BaseLayout');

    let title = '';
    if(pathname === '/'){
      title = ENV.hometitle;
    }else{
      title = this.foreachTitle(routeData, pathname).slice(3) + ' - ' + ENV.appname;
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

    const layout = (
      <div className={styles.layout}>

        {/*<GlobalHeader/>*/}

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
            <Route component={NotFound} />
          </Switch>

        </GlobalContent>

      </div>
    );

    return(
      <DocumentTitle title={this.getPageTitle()}>
        {layout}
      </DocumentTitle>
    )
  }

}

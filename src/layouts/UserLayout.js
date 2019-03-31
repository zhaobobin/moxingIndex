import React from 'react';
import { Route, Redirect, Switch } from 'dva/router';
import DocumentTitle from 'react-document-title';
import NotFound from "~/routes/Other/page404";
import { ENV, getUrlParams } from '~/utils/utils';

import styles from './UserLayout.less'

import GlobalHeader from '~/components/Common/GlobalHeader';

const paramsObj = getUrlParams() || '';

export default class BaseLayout extends React.Component {

  getPageTitle() {
    const { location, getRouteData } = this.props;
    const { pathname } = location;
    const routeData = getRouteData('UserLayout');
    let title = '';
    for(let i in routeData){
      if (pathname.indexOf(routeData[i].key) > -1) {
        title = routeData[i].name + ' - ' + ENV.appname;
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

        {
          paramsObj.platform === 'app' ?
            null
            :
            <GlobalHeader/>
        }

        <div
          className={styles.content}
          style={paramsObj.platform === 'app' ? null : {paddingTop: '46px'}}
        >
          <Switch>
            {
              getRouteData('UserLayout').map(item =>
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
            <Redirect exact from="/user" to="/user/login" />
            <Redirect exact from="/user/reset" to="/user/reset/index" />
            <Route component={NotFound} />
          </Switch>
        </div>

      </div>
    );

    return(
      <DocumentTitle title={this.getPageTitle()}>
        {layout}
      </DocumentTitle>
    )
  }

}

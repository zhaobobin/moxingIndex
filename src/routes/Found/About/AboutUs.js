import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import styles from './aboutUs.less';
import AboutIntroduction from './AboutIntroduction';
import AboutBusiness from './AboutBusiness';
import AboutBrand from './AboutBrand';
import AboutContact from './AboutContact';
import AboutWeibo from './AboutWeibo';
@connect(state => ({
  global: state.global,
}))
export default class AboutUs extends React.Component {

  render(){
    const TabPane = Tabs.TabPane;
    function callback(key) {
      console.log(key);
    }
    return(
      <div className={styles.helplist}>
      <Tabs defaultActiveKey="1" onChange={callback}>      
      <TabPane tab="去投网介绍" key="1"><AboutIntroduction /></TabPane>
      <TabPane tab="业务模式" key="2"><AboutBusiness /></TabPane>
      <TabPane tab="品牌优势" key="3"><AboutBrand /></TabPane>
      <TabPane tab="联系我们" key="4"><AboutContact /></TabPane>
      <TabPane tab="微博微信" key="5"><AboutWeibo /></TabPane>
      </Tabs>
      </div>
    )
  }

}

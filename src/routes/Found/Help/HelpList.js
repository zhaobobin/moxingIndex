import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import styles from './HelpList.less';
import Helplogin from './Helplogin';
import Helpfunds from './Helpfunds';
import Helpmind from './Helpmind';
import Helpmoney from './Helpmoney';
import HelpIntroduction from './HelpIntroduction';
import HelpBusiness from './HelpBusiness';
import HelpBrand from './HelpBrand';
import HelpContact from './HelpContact';
import HelpWeibo from './HelpWeibo';
@connect(state => ({
  global: state.global,
}))

export default class HelpList extends React.Component {

  render(){
    const TabPane = Tabs.TabPane;
    function callback(key) {
      console.log(key);
    }
    return(
      <div className={styles.helplist}>
      <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="登录注册" key="1"><Helplogin /></TabPane>
      <TabPane tab="银行资金存管" key="2"><Helpfunds /></TabPane>
      <TabPane tab="安心签" key="3"><Helpmind /></TabPane>
      <TabPane tab="充值提现" key="4"><Helpmoney /></TabPane>
      <TabPane tab="去投网介绍" key="5"><HelpIntroduction /></TabPane>
      <TabPane tab="业务模式" key="6"><HelpBusiness /></TabPane>
      <TabPane tab="品牌优势" key="7"><HelpBrand /></TabPane>
      <TabPane tab="联系我们" key="8"><HelpContact /></TabPane>
      <TabPane tab="微博微信" key="9"><HelpWeibo /></TabPane>
      </Tabs>
      </div>
    )
  }

}

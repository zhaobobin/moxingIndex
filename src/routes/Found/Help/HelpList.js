import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import styles from './HelpList.less';
import HelpSecurity from './HelpSecurity';
import HelpLending from './HelpLending';
import HelpCash from './HelpCash';
import HelpNoun from './HelpNoun';
import HelpLegal from './HelpLegal';
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
      <TabPane tab="安全与隐私" key="1"><HelpSecurity /></TabPane>
      <TabPane tab="出借与借款" key="2"><HelpLending /></TabPane>
      <TabPane tab="充值与提现" key="3"><HelpCash /></TabPane>
      <TabPane tab="名词解释" key="4"><HelpNoun /></TabPane> 
      <TabPane tab="法律声明" key="5"><HelpLegal /></TabPane>      
      </Tabs>
      </div>
    )
  }

}

import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import styles from './HelpList.less';
import Helplogin from './Helplogin';
import Helpfunds from './Helpfunds';
import Helpmind from './Helpmind';
import Helpmoney from './Helpmoney';

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
      </Tabs>
      </div>
    )
  }

}

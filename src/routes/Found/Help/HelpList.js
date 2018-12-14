import React from 'react';
import { connect } from 'dva';
import { Tabs, WhiteSpace } from 'antd-mobile';
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
  	const tabs = [
{ title: '安全与隐私' },
{ title: '出借与借款' },
{ title: '充值与提现' },
{ title: '名词解释' },
{ title: '法律声明' },
];
    return(<div className={styles.helplist}>
    	<Tabs tabs={tabs} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3.6} />}>
  <div>
<p><HelpSecurity /></p>
</div>
<div>
<p><HelpLending /></p>
</div>
<div>
<p><HelpCash /></p>
</div>
<div>
<p><HelpNoun /></p>
</div>
<div>
<p><HelpLegal /></p>
</div>
  </Tabs>      
      </div>
    )
  }

}

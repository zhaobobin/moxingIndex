import React from 'react';
import { connect } from 'dva';
import { Tabs, WhiteSpace } from 'antd-mobile';
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
  	const tabs = [
{ title: '去投网简介' },
{ title: '业务模式' },
{ title: '品牌优势' },
{ title: '联系我们' },
{ title: '微信微博' },
];   
    return(
      <div className={styles.helplist}>      
      <Tabs tabs={tabs} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3.6} />}>
  <div>
<p><AboutIntroduction /></p>
</div>
<div>
<p><AboutBusiness /></p>
</div>
<div>
<p><AboutBrand /></p>
</div>
<div>
<p><AboutContact /></p>
</div>
<div>
<p><AboutWeibo /></p>
</div>
  </Tabs>   
      </div>
    )
  }

}

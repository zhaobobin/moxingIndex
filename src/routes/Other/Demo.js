import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './Demo.less'

@connect(state => ({
  global: state.global,
}))
export default class Demo extends React.Component {

  render(){
    return(
      <div className={styles.demo}>

        <h1>网站地图</h1>

        <dl>
          <dt><strong>结果页</strong></dt>
          <dd>
            <p><Link to="/user/register/success">开户结果页</Link></p>
            <p><Link to="/user/cz-result">充值成功</Link></p>
            <p><Link to="/user/tx-result">提现成功</Link></p>
            <p><Link to="/user/bank-add">银行卡绑卡成功</Link></p>
            <p><Link to="/user/bank-remove">银行卡解绑成功</Link></p>
            <p><Link to="/user/lend-result">出借成功</Link></p>
          </dd>
        </dl>

        <dl>
          <dt><strong>发现板块</strong></dt>
          <dd>
            <p><Link to="/found">发现首页</Link></p>
            <p><Link to="/download">下载</Link></p>
            <p><Link to="/activity-list">活动列表</Link></p>
            <p><Link to="/activity-detail/123">活动详情</Link></p>
            <p><Link to="/notices-list">公告列表</Link></p>
            <p><Link to="/notices-detail/123">公告详情</Link></p>
            <p><Link to="/help-list">帮助中心</Link></p>
            <p><Link to="/help-detail/123">帮助中心详情</Link></p>
            <p><Link to="/news-list">公司新鲜事</Link></p>
            <p><Link to="/news-detail/123">公司新鲜事详情</Link></p>
            <p><Link to="/aboutus">关于我们</Link></p>
            <p><Link to="/info">信息披露</Link></p>
            <p><Link to="/beian">备案信息</Link></p>
            <p><Link to="/organization">组织信息</Link></p>
            <p><Link to="/examine">审核信息</Link></p>
            <p><Link to="/disclosure">经营信息</Link></p>
            <p><Link to="/event">重大事项</Link></p>
            <p><Link to="/other">其他事项</Link></p>
            <p><Link to="/education">出借人教育</Link></p>
            <p><Link to="/operate">运营报告</Link></p>
            <p><Link to="/operate-detail/123">运营报告详情</Link></p>
            <p><Link to="/invitation">邀请好友</Link></p>
            <p><Link to="/invitation-list">邀请好友列表</Link></p>
            <p><Link to="/platform">平台优势</Link></p>
          </dd>
        </dl>

      </div>
    )
  }

}

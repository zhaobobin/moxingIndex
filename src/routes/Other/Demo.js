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
            <p><Link to="/result/kaihu-result">开户结果页</Link></p>

            <p><Link to="/result/cz-result">充值成功</Link></p>
            <p><Link to="/result/tx-result">提现成功</Link></p>

            <p><Link to="/result/bank-add">银行卡绑卡成功</Link></p>
            <p><Link to="/result/bank-remove">银行卡解绑成功</Link></p>

            <p><Link to="/result/zxfw-result">智享出借成功</Link></p>
            <p><Link to="/result/lend-result">出借成功</Link></p>
            <p><Link to="/result/zhaiquan-result">债转成功</Link></p>
          </dd>
        </dl>

        <dl>
          <dt><strong>发现板块</strong></dt>
          <dd>
            <p><Link to="/found">发现首页</Link></p>
            <p><Link to="/found/download">下载</Link></p>
            <p><Link to="/found/activity-list">活动列表</Link></p>
            <p><Link to="/found/activity-detail/123">活动详情</Link></p>
            <p><Link to="/found/notices-list">公告列表</Link></p>
            <p><Link to="/found/notices-detail/123">公告详情</Link></p>
            <p><Link to="/found/help-list">帮助中心</Link></p>
            <p><Link to="/found/help-detail/123">帮助中心详情</Link></p>
            <p><Link to="/found/news-list">公司新鲜事</Link></p>
            <p><Link to="/found/news-detail/123">公司新鲜事详情</Link></p>
            <p><Link to="/found/aboutus">关于我们</Link></p>
            <p><Link to="/found/info">信息披露</Link></p>
            <p><Link to="/found/beian">备案信息</Link></p>
            <p><Link to="/found/organization">组织信息</Link></p>
            <p><Link to="/found/examine">审核信息</Link></p>
            <p><Link to="/found/disclosure">经营信息</Link></p>
            <p><Link to="/found/event">重大事项</Link></p>
            <p><Link to="/found/other">其他事项</Link></p>
            <p><Link to="/found/education">出借人教育</Link></p>
            <p><Link to="/found/operate">运营报告</Link></p>
            <p><Link to="/found/operate-detail/123">运营报告详情</Link></p>
            <p><Link to="/found/invitation">邀请好友</Link></p>
            <p><Link to="/found/invitation-list">邀请好友列表</Link></p>
            <p><Link to="/found/platform">平台优势</Link></p>
          </dd>
        </dl>

        <dl>
          <dt><strong>其他</strong></dt>
          <dd>
            <p><Link to="/account/info-manage/risk-manage">风险测评</Link></p>
            <p><Link to="/account/info-manage/risk-result">风险测评-结果页</Link></p>
            <p><Link to="/share">分享页面</Link></p>
            <p><Link to="/user/register">用户注册</Link></p>
            <p><Link to="/user/register-result">用户注册-结果页</Link></p>
          </dd>
        </dl>

      </div>
    )
  }

}

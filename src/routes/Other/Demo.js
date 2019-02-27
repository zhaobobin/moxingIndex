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
            <p><Link to="/result/kaihu-result?platform=app">开户结果页</Link></p>
            <p><Link to="/result/jihuo-result?platform=app">激活结果页</Link></p>

            <p><Link to="/result/cz-result?platform=app&amount=100.00">充值成功</Link></p>
            <p><Link to="/result/tx-result?platform=app&amount=100.00">提现成功</Link></p>

            <p><Link to="/result/bank-add?platform=app">银行卡绑卡成功</Link></p>
            <p><Link to="/result/bank-remove?platform=app">银行卡解绑成功</Link></p>

            <p><Link to="/result/zxfw-result?platform=app">智享出借成功</Link></p>
            <p><Link to="/result/lend-result?platform=app">出借成功</Link></p>
            <p><Link to="/result/zhaiquan-result?platform=app">债转成功</Link></p>
          </dd>
        </dl>
        <dl>
          <dt><strong>发现板块</strong></dt>
          <dd>
            <p><Link to="/found?platform=app">发现首页</Link></p>
            <p><Link to="/download">H5分享下载</Link></p>
            <p><Link to="/found/download">发现扫码下载</Link></p>
            <p><Link to="/news/notices-list?platform=app">公告列表</Link></p>
            <p><Link to="/news/notices-list/detail/68?platform=app">公告详情</Link></p>
            <p><Link to="/found/help-list?platform=app">帮助中心</Link></p>
            <p><Link to="/news/news-list?platform=app">公司新鲜事</Link></p>
            <p><Link to="/news/news-list/detail/25?platform=app">公司新鲜事详情</Link></p>
            <p><Link to="/found/aboutus?platform=app">关于我们</Link></p>
            <p><Link to="/found/info?platform=app">信息披露</Link></p>
            <p><Link to="/found/beian?platform=app">备案信息</Link></p>
            <p><Link to="/found/organization?platform=app">组织信息</Link></p>
            <p><Link to="/found/examine?platform=app">审核信息</Link></p>
            <p><Link to="/found/disclosure?platform=app">经营信息</Link></p>
            <p><Link to="/found/event?platform=app">重大事项</Link></p>
            <p><Link to="/found/other?platform=app">其他事项</Link></p>
            <p><Link to="/found/education?platform=app">出借人教育</Link></p>
            <p><Link to="/found/operate?platform=app">运营报告</Link></p>
            <p><Link to="/found/operate-detail/123?platform=app">运营报告详情</Link></p>
            <p><Link to="/found/invitation?platform=app&userId=18121276596049">邀请好友</Link></p>
            <p><Link to="/found/invitation-list?platform=app">邀请好友列表</Link></p>
            <p><Link to="/found/platform?platform=app">平台优势</Link></p>
          </dd>
        </dl>
        <dl>
          <dt><strong>其他</strong></dt>
          <dd>
            <p><Link to="/account/info-manage/risk-manage?platform=app&accessToken=f7c71382245845aea9e05f7727bc1235&userId=18122128277409">风险测评</Link></p>
            <p><Link to="/account/info-manage/risk-result?platform=app&accessToken=f7c71382245845aea9e05f7727bc1235&userId=18122128277409">风险测评-结果页</Link></p>
            <p><Link to="/share-shouyi?platform=app&bidShare=1&userId=18121276596049">分享页面-晒一晒</Link></p>
            <p><Link to="/user/register">用户注册</Link></p>
            <p><Link to="/user/quick-register?invitationCode=A78CBF4AB81A5340E96DC8BE73AF10F0">快速注册</Link></p>
            <p><Link to="/user/register-result?platform=app">用户注册-结果页</Link></p>
            <p><Link to="/xieyi/49?platform=app">协议查询</Link></p>
            <p><Link to="/lend/zxfwxq/xsb20181130001?platform=app">智享详情</Link></p>
            <p><Link to="/lend/sbxq/bd18120100005?platform=app">散标详情</Link></p>
            <p><Link to="/lend/zqxq/18111056560681?platform=app">债权详情</Link></p>
            <p><Link to="/account/asset?platform=app&userId=18121276596049&accessToken=12345">资产详情</Link></p>
            <p><Link to="/account/record?platform=app&userId=18121276596049&accessToken=12345">交易记录</Link></p>
            <p><Link to="/question?platform=app">常见问题</Link></p>
            <p><Link to="/hdzq/yaoqing-201902?platform=app&userId=18121276596049&accessToken=12345">邀请有礼</Link></p>
          </dd>
        </dl>

      </div>
    )
  }

}

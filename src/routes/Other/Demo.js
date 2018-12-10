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
            <p><Link to="/result/kaihu-result?equipmentType=app">开户结果页</Link></p>
            <p><Link to="/result/jihuo-result?equipmentType=app">激活结果页</Link></p>

            <p><Link to="/result/cz-result?equipmentType=app&amount=100.00">充值成功</Link></p>
            <p><Link to="/result/tx-result?equipmentType=app&amount=100.00">提现成功</Link></p>

            <p><Link to="/result/bank-add?equipmentType=app">银行卡绑卡成功</Link></p>
            <p><Link to="/result/bank-remove?equipmentType=app">银行卡解绑成功</Link></p>

            <p><Link to="/result/zxfw-result?equipmentType=app">智享出借成功</Link></p>
            <p><Link to="/result/lend-result?equipmentType=app">出借成功</Link></p>
            <p><Link to="/result/zhaiquan-result?equipmentType=app">债转成功</Link></p>
          </dd>
        </dl>
        <dl>
          <dt><strong>发现板块</strong></dt>
          <dd>
            <p><Link to="/found?equipmentType=app">发现首页</Link></p>
            <p><Link to="/found/download?equipmentType=app">下载</Link></p>
            <p><Link to="/news/notices-list?equipmentType=app">公告列表</Link></p>
            <p><Link to="/news/notices-list/detail/68?equipmentType=app">公告详情</Link></p>
            <p><Link to="/found/help-list?equipmentType=app">帮助中心</Link></p>
            <p><Link to="/news/news-list?equipmentType=app">公司新鲜事</Link></p>
            <p><Link to="/news/news-list/detail/25?equipmentType=app">公司新鲜事详情</Link></p>
            <p><Link to="/found/aboutus?equipmentType=app">关于我们</Link></p>
            <p><Link to="/found/info?equipmentType=app">信息披露</Link></p>
            <p><Link to="/found/beian?equipmentType=app">备案信息</Link></p>
            <p><Link to="/found/organization?equipmentType=app">组织信息</Link></p>
            <p><Link to="/found/examine?equipmentType=app">审核信息</Link></p>
            <p><Link to="/found/disclosure?equipmentType=app">经营信息</Link></p>
            <p><Link to="/found/event?equipmentType=app">重大事项</Link></p>
            <p><Link to="/found/other?equipmentType=app">其他事项</Link></p>
            <p><Link to="/found/education?equipmentType=app">出借人教育</Link></p>
            <p><Link to="/found/operate?equipmentType=app">运营报告</Link></p>
            <p><Link to="/found/operate-detail/123?equipmentType=app">运营报告详情</Link></p>
            <p><Link to="/found/invitation?equipmentType=app">邀请好友</Link></p>
            <p><Link to="/found/invitation-list?equipmentType=app">邀请好友列表</Link></p>
            <p><Link to="/found/platform?equipmentType=app">平台优势</Link></p>
          </dd>
        </dl>

        <dl>
          <dt><strong>其他</strong></dt>
          <dd>
            <p><Link to="/account/info-manage/risk-manage?platform=app&accessToken=ac94521bff504b0d84b7866a1210b601&userId=18120449166030">风险测评</Link></p>
            <p><Link to="/account/info-manage/risk-result?platform=app&accessToken=ac94521bff504b0d84b7866a1210b601&userId=18120449166030">风险测评-结果页</Link></p>
            <p><Link to="/share-shouyi?equipmentType=app&amount=1000">分享页面-晒一晒</Link></p>
            <p><Link to="/user/register?equipmentType=app">用户注册</Link></p>
            <p><Link to="/user/register-result?equipmentType=app">用户注册-结果页</Link></p>
            <p><Link to="/xieyi/49?equipmentType=app">协议查询</Link></p>
            <p><Link to="/lend/zxfwxq/xsb20181130001?equipmentType=app">智享详情</Link></p>
            <p><Link to="/lend/sbxq/bd18120100005?equipmentType=app">散标详情</Link></p>
            <p><Link to="/lend/zqxq/18111056560681?equipmentType=app">变现详情</Link></p>
            <p><Link to="/question?equipmentType=app">常见问题</Link></p>
          </dd>
        </dl>

      </div>
    )
  }

}

import React from 'react';
import { connect } from 'dva';
import { Link  } from 'dva/router';
import styles from './NoticesList.less';
@connect(state => ({
  global: state.global,
}))
export default class NoticesList extends React.Component {

  render(){
    return(
      <div>
        <div className={styles.NoticeList}>
          <ul>
            <li>
              <h2>关于建设、农业、工商银行系统升级确保用户...</h2>
              <p>尊敬的去投网用户：您好，接到恒丰银行的通知以后所有提现收取0.1%手续费。社会主义好,去投网万的…</p>
              <span>2018-08-16<Link to="">查看详情&gt;</Link></span>
            </li>
            <li>
              <h2>关于建设、农业、工商银行系统升级确保用户...</h2>
              <p>尊敬的去投网用户：您好，接到恒丰银行的通知以后所有提现收取0.1%手续费。社会主义好,去投网万的…</p>
              <span>2018-08-16<Link to="">查看详情&gt;</Link></span>
            </li>
            <li>
              <h2>关于建设、农业、工商银行系统升级确保用户...</h2>
              <p>尊敬的去投网用户：您好，接到恒丰银行的通...</p>
              <span>2018-08-16<Link to="">查看详情&gt;</Link></span>
            </li>
            <li>
              <h2>关于建设、农业、工商银行系统升级确保用户...</h2>
              <p>尊敬的去投网用户：您好，接到恒丰银行的通知以后所有提现收取0.1%手续费。社会主义好,去投网万的…</p>
              <span>2018-08-16<Link to="">查看详情&gt;</Link></span>
            </li>
            <li>
              <h2>关于建设、农业、工商银行系统升级确保用户...</h2>
              <p>尊敬的去投网用户：您好，接到恒丰银行的通知以后所有提现收取0.1%手续费。社会主义好,去投网万的…</p>
              <span>2018-08-16<Link to="">查看详情&gt;</Link></span>
            </li>
          </ul>
        </div>
      </div>
    )
  }

}

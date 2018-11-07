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
          <dt>结果页</dt>
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
          <dt><Link to="/found">发现板块</Link></dt>
          <dd>
            <p></p>
          </dd>
        </dl>

      </div>
    )
  }

}

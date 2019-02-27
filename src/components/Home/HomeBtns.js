import React from 'react';
import { Link } from 'dva/router';
import styles from './HomeBtns.less'

export default function HomeBtns () {

  return(
    <ul className={styles.btns}>
      <li>
        <p>
          <Link to="/user/login" className={styles.login}>
            <span>注册/登录</span>
          </Link>
        </p>
      </li>
      <li>
        <p>
          <Link to="/download" className={styles.download}>
            <span>下载客户端</span>
          </Link>
        </p>
      </li>
    </ul>
  )

}

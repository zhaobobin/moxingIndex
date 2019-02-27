import React from 'react';
import { Link } from 'dva/router';
import styles from './HomeBtns.less'

import login_img from '~/assets/home/m_loginbtn_icon@2x.png'
import download_img from '~/assets/home/m_downloadbtn_icon@2x.png'

export default function HomeBtns () {

  return(
    <ul className={styles.btns}>
      <li>
        <p>
          <Link to="/user/login" className={styles.login}>
            <img src={login_img} alt="login_img"/>
            <span>注册/登录</span>
          </Link>
        </p>
      </li>
      <li>
        <p>
          <Link to="/download" className={styles.download}>
            <img src={download_img} alt="download_img"/>
            <span>下载客户端</span>
          </Link>
        </p>
      </li>
    </ul>
  )

}

import React from 'react';
import { Link } from 'dva/router'
import styles from './GlobalHeader.less'

import logo from '~/assets/com/m_nav_logo@2x.png'
import account from '~/assets/com/m_myaccount@2x.png'

export default function GlobalHeader () {

  return(
    <div className={styles.head}>
      <Link to="/" className={styles.logo}>
        <img src={logo} alt="logo"/>
      </Link>
      <Link to="/account/total" className={styles.account}>
        <img src={account} alt="account"/>
      </Link>
    </div>
  )

}

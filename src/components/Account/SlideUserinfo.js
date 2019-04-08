/**
 * 账户中心 - 边栏用户信息
 */
import React from 'react';
import { Link } from 'dva/router';
import styles from './SlideUserinfo.less';

import defaultAvator from '~/assets/account/my_head@2x.png'

export default function SlideUserinfo ({userInfo}) {

  return(
    <div className={styles.userinfo}>

      <p className={styles.avator}>
        <Link to="/account/total">
          <img src={userInfo.avatar || defaultAvator} alt="用户头像"/>
        </Link>
      </p>
      <p className={styles.name}>
        <strong>{userInfo.nickname || userInfo.name}</strong>
      </p>
      {/*<p className={styles.tel}>*/}
        {/*<strong>{userInfo.tel}</strong>*/}
      {/*</p>*/}

    </div>
  )

}

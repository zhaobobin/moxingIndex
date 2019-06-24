import React from 'react';
import { Link } from 'dva/router';
import { ENV } from '~/utils/utils'
import styles from './Home.less'

import { Alert } from '~/components/Dialog/Dialog'
import GlobalFooter from '~/components/Common/GlobalFooter';

function alert(){
  Alert({
    width: '270px',
    title: '温馨提示',
    content: 'iOS安装方法:（设置-通用-管理-信任-趣族）',
    btns: '去下载',
    callback: (res) => {
      if(res === 1){
        window.open(ENV.download.ios)
      }
    }
  })
}

export default function Home() {

  return(
    <div className={styles.home}>

      <div className={styles.download}>

        <Link to="/user/login" className={styles.login}>登录</Link>

        <img className={styles.bg} src={require('~/assets/home/home_bg.jpg')} alt="bg"/>

        <div className={styles.left}>

          <Link to="/">
            <img className={styles.logo} src={require('~/assets/home/logo.png')} alt="趣族logo" />
          </Link>

          <p className={styles.btns}>
            <span>
              <a className={styles.ios} href={ENV.download.ios} target="_blank" rel="noopener noreferrer nofollow">
                <img src={require('~/assets/home/btn_ios.png')} alt="趣族ios下载" />
              </a>
            </span>
            <span>
              <a className={styles.android} href={ENV.download.android} target="_blank" rel="noopener noreferrer nofollow">
                <img src={require('~/assets/home/btn_android.png')} alt="趣族android下载" />
              </a>
            </span>
          </p>

        </div>

      </div>

      <div className={styles.footer}>
        <div className={styles.links}>
          <p>
            <span><Link to="/privacy">隐私协议</Link></span>
            <span className={styles.line}>|</span>
            <span><Link to="/guide">用户说明</Link></span>
            <span className={styles.line}>|</span>
            <span><Link to="/about">关于我们</Link></span>
          </p>
        </div>
        <GlobalFooter/>
      </div>

    </div>
  )

}

import React from 'react';
import { Link } from 'dva/router'
import styles from './Home.less'

import { Alert } from '~/components/Dialog/Dialog'
import GlobalFooter from '~/components/Common/GlobalFooter';

function alert(){
  Alert({
    width: '270px',
    title: '应用还在上架中，敬请期待哦！',
    btns: '知道了',
    callback: (res) => {

    }
  })
}

export default function Home() {

  return(
    <div className={styles.home}>

      <div className={styles.download}>
        <img className={styles.bg} src={require('~/assets/home/home_bg.jpg')} alt="bg"/>

        <div className={styles.left}>

          <Link to="/">
            <img className={styles.logo} src={require('~/assets/home/logo.png')} alt="趣族logo" />
          </Link>

          <p className={styles.btns}>
            <span>
              <a className={styles.ios} onClick={alert}>
                <img src={require('~/assets/home/btn_ios.png')} alt="趣族ios下载" />
              </a>
            </span>
            <span>
              <a className={styles.android} onClick={alert}>
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

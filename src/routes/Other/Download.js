import React from 'react'
import { Link } from 'dva/router'
import styles from './Download.less'

import { Alert } from '~/components/Dialog/Dialog'

function alert(){
  Alert({
    width: '270px',
    title: '应用还在上架中，敬请期待哦！',
    btns: '知道了',
    callback: (res) => {

    }
  })
}

export default function Download() {

  return(
    <div className={styles.download}>

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
  )

}

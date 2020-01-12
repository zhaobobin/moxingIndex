import React from 'react'
import { Link } from 'dva/router'
import styles from './ActivityDownload.less'

export default class ActivityDownload extends React.Component{

  render(){
    return(
      <div className={styles.container}>
        <img src={require('~/assets/com/logo2.png')} alt="logo"/>
        <p className={styles.title}>趣族</p>
        <p className={styles.slogan}>因聚而聚，因聚成族</p>
        <Link to="/download">下载APP</Link>
      </div>
    )
  }

}
import React from 'react';
import styles from './HomeSanbiao.less'

export default function HomeSanbiao () {

  return(
    <div className={styles.list}>

      <div className={styles.item}>
        <div className={styles.detail}>

          <h2>
            <strong>智享服务A</strong>
            <em>新手专享</em>
          </h2>

          <ul>
            <li className={styles.li1}>
              <p className={styles.p1}><span>12.50</span><em>%</em></p>
              <p className={styles.p2}>参考年回报率</p>
            </li>
            <li className={styles.li2}>
              <p className={styles.p1}><span>12</span><em>个月</em></p>
              <p className={styles.p2}>授权服务期限</p>
            </li>
          </ul>

          <span className={styles.hot}>
            <img src={require('~/assets/home/m_label_hot@2x.png')} alt="hot"/>
          </span>

        </div>
      </div>

    </div>
  )

}

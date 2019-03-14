import React from 'react';
import styles from './CouponsItem.less'

export default function CouponsNull () {
  return(
    <div className={styles.listNull}>
      <img src={require('~/assets/com/no_redenvelopes@2x.png')} alt="null"/>
      <p>优惠券福利陆续来袭，敬请留意平台动态！</p>
    </div>
  )
}

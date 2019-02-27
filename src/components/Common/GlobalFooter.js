import React from 'react';
import { connect } from 'dva';
import { ENV } from '~/utils/utils'
import styles from './GlobalFooter.less'

export default function GlobalFooter () {

  return(
    <div className={styles.footer}>
      <p>
        <span>{ENV.icp}</span>
        <span>|</span>
        <span>{ENV.beian}</span>
      </p>
      <p><span>{ENV.company}</span></p>
    </div>
  )

}

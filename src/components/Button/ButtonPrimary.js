import React from 'react'
import styles from './ButtonPrimary.less'

export default function ButtonPrimary (props) {

  return(
    <a className={styles.btn} style={{ width: props.width }} onClick={props.onClick}>
      {props.children}
    </a>
  )

}

/*
*
* 信息披露模块的共用模板
* Information_001
*
* */

import React from 'react';
import styles from './Information.less';

const Information = (props) => {
  return(
    <div className={styles.Information}>
      {props.children}
    </div>
  )
};

export default Information

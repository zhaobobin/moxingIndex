import React from 'react';
import styles from './AccountContent.less';

const AccountContent = (props) => {
  return(
    <div className={styles.content}>
      {props.children}
    </div>
  )
};

export default AccountContent

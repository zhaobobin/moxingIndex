import React from 'react'
import { Avatar } from 'antd';
import styles from './UserinfoCard.less'

export default function UserinfoCard ({ detail }) {
  return(
    <div className={styles.container}>
      <div className={styles.content}>
        {
          detail.avatar ?
            <Avatar src={detail.avatar} size={76} />
            :
            <Avatar icon="user" size={76} />
        }
        <p className={styles.name}>{detail.name}</p>
      </div>
    </div>
  )
}

/**
 * 活动 - 列表Item
 */
import React from 'react'
import {Link} from 'dva/router'
import { Button } from 'antd'
import moment from 'moment'
import styles from './ActivityListItem.less'

export default function ActivityListItem ({ item, index }) {

  return(
    <div key={index} className={styles.container}>
      <Link to={`/activity/detail/${item.id}`}>
        <div className={styles.head}>
          <div className={styles.thumb}>
            <img src={item.image} alt={item.name}/>
          </div>
          <div className={styles.info}>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.date}>{moment(item.start_time).format('YYYY年MM月DD日 HH:mm')}</p>
            <p className={styles.place}>{item.place}</p>
            {
              item.price === '0' ?
                null
                :
                <p className={styles.price}>
                  <em>¥</em>
                  <span>{item.price}起</span>
                </p>
            }
          </div>
        </div>

        <div className={styles.foot}>
          <div className={styles.btn}>
            {
              item.state === '1' ?
                <span className={styles.start}>立即报名</span>
                :
                <span className={styles.disabled}>已结束</span>
            }
          </div>
        </div>
      </Link>
    </div>
  )

}

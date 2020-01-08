/**
 * 门票 - 列表Item
 */
import React from 'react'
import {Link} from 'dva/router'
import { Button } from 'antd'
import moment from 'moment'
import styles from './TicketListItem.less'

export default function TicketListItem ({ item }) {

  return(
    <Link to={`/m/my/ticket-detail/${item.order_no}`} className={styles.item}>

      <div className={styles.head}>
        <div className={styles.thumb}>
          <img src={item.image} alt={item.name}/>
        </div>
        <div className={styles.info}>
          <p className={styles.activityName}>{item.name}</p>
          <p className={styles.ticketName}>
            {item.goods_name}
            <span>X</span>
            <span>{item.goods_num}</span>
          </p>
          {/*<p className={styles.date}>{item.order_no}</p>*/}
        </div>
      </div>

    </Link>
  )

}

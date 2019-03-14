import React from 'react';
import { Link } from 'dva/router';
import styles from './RecordItem.less'

export default function RecordItem (props) {

  return(
    <div key={props.id} className={styles.item}>

      {
        props.item.title === 'ListNull' ?
          <div className={styles.empty}>
            <img src={require('~/assets/com/no_record@2x.png')} alt="null"/>
            <p>暂无数据</p>
          </div>
          :
          <div className={styles.detail}>
            <dl>
              <dt>
                日期
              </dt>
              <dd>
                <ul>
                  <li>
                    <p className={styles.left}>left</p>
                    <p className={styles.right}>right</p>
                  </li>
                </ul>
              </dd>
            </dl>
          </div>
      }

    </div>
  )

}

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
                {props.item.label}
              </dt>
              <dd>
                <ul>
                  {
                    props.item.list.map((topic, index) => (
                      <li key={index}>
                        <p className={styles.left}>
                          <span className={styles.sp1}>{topic.cashMode}</span>
                          <span className={styles.sp2}>{topic.flowTime}</span>
                        </p>
                        <p className={styles.right}>
                          <span className={styles.sp1}>
                            <em className={parseFloat(topic.flowAmout) > 0 ? styles.orange : null}>
                              {topic.flowAmout}
                            </em>
                          </span>
                          <span className={styles.sp2}>{topic.curFreeAmt}</span>
                        </p>
                      </li>
                    ))
                  }
                </ul>
              </dd>
            </dl>
          </div>
      }

    </div>
  )

}

import React from 'react'
import { Row, Col } from 'antd'
import styles from '~/routes/Other/Feiyan.less'

export default function TotalData ({totalData}) {
  return(
    <div className={styles.section + " " + styles.section1} id="statistical">
      <div className={styles.con}>
        <Row>
          <Col span={6}>
            <div>
              <p className={styles.p1 + " " + styles.red}>{totalData.diagnosed}</p>
              <p className={styles.p2 + " " + styles.red}>确诊</p>
              <p className={styles.p3}>昨日+{totalData.diagnosed_add}</p>
              <i/>
            </div>
          </Col>
          <Col span={6}>
            <div>
              <p className={styles.p1 + " " + styles.yellow}>{totalData.suspect}</p>
              <p className={styles.p2 + " " + styles.yellow}>疑似</p>
              <p className={styles.p3}>昨日+{totalData.suspect_add}</p>
              <i/>
            </div>
          </Col>
          <Col span={6}>
            <div>
              <p className={styles.p1 + " " + styles.green}>{totalData.cured}</p>
              <p className={styles.p2 + " " + styles.green}>治愈</p>
              <p className={styles.p3}>昨日+{totalData.cured_add}</p>
              <i/>
            </div>
          </Col>
          <Col span={6}>
            <div>
              <p className={styles.p1 + " " + styles.gray}>{totalData.death}</p>
              <p className={styles.p2 + " " + styles.gray}>死亡</p>
              <p className={styles.p3}>昨日+{totalData.death_add}</p>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
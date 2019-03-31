import React from 'react';
import { Link } from 'dva/router'
import { Row, Col } from 'antd'
import styles from './GlobalHeader.less'

import logo from '~/assets/com/logo.png'

export default function GlobalHeader () {

  return(
    <div className={styles.head}>

      <Row>

        <Col xs={1} sm={2} md={4} lg={4}/>

        <Col xs={22} sm={20} md={16} lg={16}>
          <Link to="/" className={styles.logo}>
            <img src={logo} alt="logo"/>
          </Link>
        </Col>

        <Col xs={1} sm={2} md={4} lg={4}/>

      </Row>

    </div>
  )

}

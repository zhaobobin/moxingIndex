import React from 'react';
import { Link } from 'dva/router'
import { Row, Col } from 'antd'
import styles from './GlobalHeader.less'

import logo from '~/assets/com/logo.png'
import GlobalHeaderMenu from '~/components/Common/GlobalHeaderMenu'
import GlobalHeaderMenuDrop from '~/components/Common/GlobalHeaderMenuDrop'

export default function GlobalHeader ({navData}) {

  return(
    <div className={styles.head}>

      <Row>

        <Col xs={1} sm={2} md={4} lg={4}/>

        <Col xs={22} sm={20} md={16} lg={16}>

          <div className={styles.nav}>

            <div className={styles.logo}>
              <Link to="/">
                <img src={logo} alt="logo"/>
              </Link>
            </div>

            <div className={styles.menu}>
              <Col xs={0} sm={0} md={0} lg={24}>
                <GlobalHeaderMenu navData={navData}/>
              </Col>
              <Col xs={24} sm={24} md={24} lg={0}>
                <GlobalHeaderMenuDrop navData={navData}/>
              </Col>
            </div>

          </div>

        </Col>

        <Col xs={1} sm={2} md={4} lg={4}/>

      </Row>

    </div>
  )

}

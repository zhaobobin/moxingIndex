import React from 'react';
import { ENV } from '~/utils/utils'
import styles from './HomeFooter.less'

import HomePlatformData from './HomePlatformData'
import GlobalFooter from '~/components/Common/GlobalFooter';

import pc_img from '~/assets/home/m_pc_icon@2x.png'
import tel_img from '~/assets/home/m_call_icon@2x.png'

export default function HomeFooter () {

  return(
    <div className={styles.HomeFooter}>

      <HomePlatformData/>

      <div className={styles.center}>
        <span>
          <img src={pc_img} alt="pc_img"/>
          <a href="https://www.qutouwang.com/">电脑版</a>
        </span>
        <span>|</span>
        <span>
          <img src={tel_img} alt="tel_img"/>
          <a href={`tel:${ENV.hotline}`}>客服电话</a>
        </span>
      </div>

      <GlobalFooter/>
    </div>
  )

}

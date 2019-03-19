import React from 'react';
import styles from './Home.less'

import LoadLazy from '~/components/Common/LoadLazy'
import HomeBanner from '~/components/Home/HomeBanner'
import HomeBtns from '~/components/Home/HomeBtns'
import HomeSanbiao from '~/components/Home/HomeSanbiao'
import HomeHdzq from '~/components/Home/HomeHdzq'
import HomeFooter from '~/components/Home/HomeFooter'

export default function Home () {

  return(
    <div className={styles.home}>

      <LoadLazy height={200}>
        <HomeBanner/>
      </LoadLazy>

      <LoadLazy height={40}>
        <HomeBtns/>
      </LoadLazy>

      <LoadLazy height={140}>
        <HomeSanbiao/>
        <div className={styles.hr}/>
      </LoadLazy>

      <LoadLazy height={120}>
        <HomeHdzq/>
      </LoadLazy>

      <LoadLazy height={320}>
        <HomeFooter/>
      </LoadLazy>

    </div>
  )

}

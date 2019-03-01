import React from 'react';
import styles from './Home.less'
import HomeBanner from '~/components/Home/HomeBanner'
import HomeBtns from '~/components/Home/HomeBtns'
import HomeFooter from '~/components/Home/HomeFooter'

export default function Home () {

  return(
    <div className={styles.home}>

      <HomeBanner/>

      <HomeBtns/>

      <HomeFooter/>

    </div>
  )

}

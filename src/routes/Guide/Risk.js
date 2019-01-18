/*存管模式*/
import React from 'react';
import { connect } from 'dva';
//样式
import styles from './Risk.less';
import RiskOne from  '~/components/Guide/RiskOne';
import RiskTwo from  '~/components/Guide/RiskTwo';
import RiskThree from  '~/components/Guide/RiskThree';
import RiskFour from  '~/components/Guide/RiskFour';
import LazyLoad from 'react-lazyload';
@connect(state => ({
  global: state.global,
}))
export default class Risk extends React.Component {
  render(){
    return(
      <div className={styles.RiskBox}>
        <LazyLoad height={'19%'}>
          <RiskOne/>
        </LazyLoad>

        <LazyLoad height={'16%'}>
          <RiskTwo/>
        </LazyLoad>

        <LazyLoad height={'17%'}>
          <RiskThree/>
        </LazyLoad>

        <LazyLoad height={'14%'}>
          <RiskFour/>
        </LazyLoad>
      </div>
    )
  }
}

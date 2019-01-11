import React from 'react';
import { connect } from 'dva';
//样式
import styles from './Bankdepositor.less';
import BankdepositorHeader from '~/components/Hdzq/Bankdepositor/BankdepositorHeader';
import BankdepositorPattern from '~/components/Hdzq/Bankdepositor/BankdepositorPattern';
import BankdepositorCause from '~/components/Hdzq/Bankdepositor/BankdepositorCause';
import BankdepositorIssue from '~/components/Hdzq/Bankdepositor/BankdepositorIssue';
import LazyLoad from 'react-lazyload';
@connect(state => ({
  global: state.global,
}))
export default class Bankdepositor extends React.Component {    
  render(){    
    return(
      <div className={styles.BankdepositorBox}>
        <LazyLoad height={'10%'}>
          <BankdepositorHeader/>
        </LazyLoad>

        <LazyLoad height={'22%'}>
          <BankdepositorPattern/>
        </LazyLoad>

        <LazyLoad height={'38%'}>
          <BankdepositorCause/>
        </LazyLoad>

        <LazyLoad height={'31%'}>
          <BankdepositorIssue/>
        </LazyLoad>

      </div>
    )
  }

}

/*  平台优势*/
import React from 'react';
import { connect } from 'dva';
import { Carousel, WingBlank } from 'antd-mobile';
import  styles from './PlatformIndex.less';
import PlatformOne from './PlatformOne';
import PlatformTwo from './PlatformTwo';
import PlatformThree from './PlatformThree';
import PlatformFour from './PlatformFour';
import PlatformFive from './PlatformFive';
import PlatformSix from './PlatformSix';
import PlatformSeven from './PlatformSeven';
import PlatformEight from './PlatformEight';
@connect(state => ({
  global: state.global,
}))
export default class PlatformIndex extends React.Component {
  constructor(props){
    super(props);
    this.loading = true;
    this.state = {
      number:1,
    }
  }
  render(){
    return(
      <div className={styles.Box}>

            <PlatformOne />
            <PlatformTwo/>
            <PlatformThree/>
            <PlatformFour/>
            <PlatformFive/>
            <PlatformSix/>
            <PlatformSeven/>
            <PlatformEight/>
      </div>
    )
  }

}

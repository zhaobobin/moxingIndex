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

  render(){
    return(
      <div className={styles.Box}>
        <WingBlank>
          <Carousel
            autoplay={false}
            vertical
            infinite
            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            afterChange={index => console.log('slide to', index)}
          >
            <PlatformOne/>
          </Carousel>



          <Carousel
            autoplay={false}
            vertical
            infinite
            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            afterChange={index => console.log('slide to', index)}
          >
            <PlatformTwo/>

          </Carousel>


        </WingBlank>


        {/*<PlatformThree/>*/}
        {/*<PlatformFour/>*/}
        {/*<PlatformFive/>*/}
        {/*<PlatformSix/>*/}
        {/*<PlatformSeven/>*/}
        {/*<PlatformEight/>*/}
      </div>
    )
  }

}

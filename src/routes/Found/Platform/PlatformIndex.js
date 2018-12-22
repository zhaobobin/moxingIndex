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
      slide:true,
      slideIndex:0
    }
  }
  btnClick=(e)=>{
    this.setState({
      slideIndex:this.state.slideIndex+1
    })

  }
  render(){
    return(
      <div className={styles.PlatformIndex}>
        <WingBlank>
          <Carousel className={styles.carousel}
                    vertical
                    dots={false}
                    dragging={false}
                    swiping={true}
                    infinite={false}
                    autoplay={false}
                    selectedIndex={this.state.slideIndex}
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => {
                      console.log(index)
                      if(index>6){
                        this.setState({
                          slide:false,
                          slideIndex:index
                        })
                      }else{
                        this.setState({
                          slide:true,
                          slideIndex:index
                        })
                      }
                    }
                  }
          >
            <PlatformOne />
          {/*  <PlatformTwo/>*/}
            <PlatformThree/>
            <PlatformFour/>
            <PlatformFive/>
            <PlatformSix/>
            <PlatformSeven/>
            <PlatformEight/>
          </Carousel>
        </WingBlank>
        <img src={require("~/assets/platform/found_platform_next@2x.png")} alt=""  onClick={this.btnClick}  className={this.state.slide===false?styles.btn:styles.belowImg }  />
      </div>
    )
  }
}

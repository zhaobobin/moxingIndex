import React from 'react';
import { connect } from 'dva';
import styles from './Yaoqing201812.less';
import { Carousel } from 'antd';
import { Link  } from 'dva/router';
@connect(state => ({
  global: state.global,
}))
export default class Yaoqing201812 extends React.Component { 
  render(){  	
  	 const {isAuth} = this.props.global;
    return(
      <div className={styles.invent}>
        <div className={styles.inventBanner}><img src={require('../../../assets/invent/invent_app_top.png')} />
        <span>2018年12月24日-2019年1月31日</span>
        </div>
        <div className={styles.inventtop}><img src={require('../../../assets/invent/invent_app_snow.png')} /></div>       
      <div className={styles.inventmiddle}>
      <div className={styles.inventBg}>
      <div className={styles.inventwidth}>     
           <ul  className={styles.inventUl}>
              <li><em>您已领取</em><span>999999.00</span>元</li>
              <li><em>您已邀请</em><span>999</span>人</li>
           </ul>        
           {/*
           	<h1 className={styles.inventTitle}>好友多 红包多</h1>
           <div className={styles.inventimgs}><img src={require('../../../assets/invent/invent_app_icon1.png')} /><img src={require('../../../assets/invent/invent_app_icon2.png')} /><img src={require('../../../assets/invent/invent_app_icon3.png')} /></div>
           <p className={styles.inventP}>您再邀请xx位有效好友就可以领取xx元现</p>
           <div className={styles.inventTip}>
             <Carousel vertical autoplay>
                   <p>                            
                       130****1234好友出借获50元现金红包                          
                   </p> 
                   <p>                            
                       130****1234好友出借获50元现金红包                          
                   </p> 
                   <p>                            
                       130****1234好友出借获50元现金红包                          
                   </p> 
                </Carousel>
           </div>
           <h1 className={styles.inventTitle}>豪友多 返现多</h1>
           <ul className={styles.inventUlfanli}>
             <li><img src={require('../../../assets/invent/invent_app_redenvelopes50.png')} /><span>好友单笔年化出借<i>5000元(含)—20000元(不含)</i></span></li>
             <li><img src={require('../../../assets/invent/invent_app_redenvelopes200.png')} /><span>好友单笔年化出借<i>20000元(含)—50000元(不含)</i></span></li>
             <li><img src={require('../../../assets/invent/invent_app_redenvelopes500.png')} /><span>好友单笔年化出借<i>50000元(含)及以上</i></span></li>
           </ul>
           <h1 className={styles.inventTitle}>活动规则</h1>
           <div className={styles.inventWord}>
            <p>1、活动期间，邀请好友每出借一笔智享服务，您可根据好友单笔年化出借金额获得一定金额现金红包奖励； </p>
            <p>2、年化出借金额=出借金额*出借期限（月）/12；</p>
            <br /><p>举个例子：小智邀请一位好友，好友完成两笔智享服务出借，出借6个月智享服务3万元以及12个月智享服务2万元，小智可获得现金红包50元+200元=250元；</p>
            <br />            
            <p>3、有效好友指在活动期间内注册并完成首次出借的好友；</p>
            <p>4、现金红包在好友完成出借后实时发放到您的账户中；</p>
            <p> 5、现金红包可直接提现； </p>
            <p>6、本活动最终解释权归去投网所有。</p>
           </div>
            {
          isAuth ?
          <div className={styles.inventbut}><a href=""><img src={require('../../../assets/invent/invent_app_button1.png')} /></a></div>
           :
           <div className={styles.inventbut}>           
           <Link to="/user/login"><img src={require('../../../assets/invent/invent_app_button2.png')} /></Link>
           </div>
           }*/} 
        </div>  
      </div>   
      </div>    
      {/*<img src={require('../../../assets/invent/invent_app_socks1.png')}  className={styles.inventImg1}/>
      <img src={require('../../../assets/invent/invent_app_snowblock1.png')}  className={styles.inventImg2}/>
      <img src={require('../../../assets/invent/invent_app_snowblock2.png')}  className={styles.inventImg3}/>
      <img src={require('../../../assets/invent/invent_app_socks2.png')}  className={styles.inventImg4}/>*/} 
      </div>
      
    )
  }

}

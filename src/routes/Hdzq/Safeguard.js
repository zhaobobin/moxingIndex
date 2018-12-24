//banner-等级保护
import React from 'react';
import { connect } from 'dva';
//样式
import styles from './Safeguard.less';

@connect(state => ({
  global: state.global,
}))
export default class Safeguard extends React.Component {
  
  render(){   
    return(
       <div className={styles.conatinerWrap}>
        <div className={styles.contentWrap}>
            <div className={styles.container}>
                <div className={styles.start}>
                    <div className={styles.startN +' '+styles.start1}></div>
                    <div className={styles.startN +' '+styles.start2}></div>
                    <div className={styles.startN +' '+styles.start3}></div>
                    <div className={styles.startN +' '+styles.start4}></div>
                    <div className={styles.startN +' '+styles.start5}></div>
                    <div className={styles.startN +' '+styles.start6}></div>
                    <div className={styles.startN +' '+styles.start7}></div>
                </div>              	
                <div className={styles.bannerWrap}>
                    <div className={styles.bannerContent}><img src={require('../../assets/safeguard/banner-content.png')} /></div>
                </div>
            </div>
        </div>
        <div className={styles.page}>
            <div className={styles.line}></div>
            <div className={styles.container}>
                <div className={styles.page1}>
                    <div className={styles.IntroLeft}>
                        <div className={styles.intro}>
                            <h5>非银行业信息安全最高标准</h5>
                            <p className={styles.first}>去投网获得了由国家公安部门颁发认证的</p>
                            <p className={styles.first}>“信息系统安全等级保护”三级备案证明。</p>
                            <p>成为业内首批完成网络信息安全第三级认证的互联网金融平台之一。</p>
                        </div>
                    </div>
                    <div className={styles.protection}>
                        <img src={require('../../assets/safeguard/protection.png')} />
                        <p>“信息系统安全等级保护”备案证明</p>
                    </div>
                    <div className={styles.btnInt}>
                        <p>去投网在网络与信息安全工作方面获得认可，将为出借人提供更加安全优质的服务。</p>
                    </div>
                    <div className={styles.buttonLiner}>
                    </div>
                </div>
                <div className={styles.page2}>
                    <div className={styles.IntroRight}>
                        <div className={styles.intro}>
                            <h5>高度重视系统安全</h5>
                            <p>《网络信息中介机构业务活动管理办法》明确要求：
                            </p>
                            <p>P2P平台应当按照国家网络安全相关规定和国家信息安全等级保护制度的要求进行备案</p>
                        </div>
                    </div>
                    <ul>
                        <li className={styles.item1}>
                            <img src={require('../../assets/safeguard/list-1.png')} />
                            <p>信息系统定级备案</p>
                        </li>
                        <li className={styles.item2}>
                            <img src={require('../../assets/safeguard/list-2.png')} />
                            <p>等级测试</p>
                        </li>
                        <li className={styles.item3}>
                            <img src={require('../../assets/safeguard/list-3.png')} />
                            <p>完善的网络安全设施</p>
                        </li>
                        <li className={styles.item4}>
                            <img src={require('../../assets/safeguard/list-4.png')} />
                            <p>管理制度</p>
                        </li>
                    </ul>
                    <div className={styles.btnInt}>
                        <p>去投网开展信息系统定级备案和等级测试，具有完善的防火墙、入侵检测、数据加密以及灾难恢复等网络安全设施和管理制度。</p>
                    </div>
                    <div className={styles.buttonLiner}>
                    </div>
                </div>
                <div className={styles.page3}>
                	
                    <div className={styles.IntroLeft}>
                        <div className={styles.intro}>
                            <h5>助力行业和谐发展</h5>
                            <p>安全是互联网金融平台健康发展的基石</p>
                        </div>
                    </div>                
                    
                </div>
                <div className={styles.page4}>                    
                    <div className={styles.development}>
                        <div className={styles.api}></div>
                        <div className={styles.item +' '+styles.item1}>
                            <div className={styles.imgbox}>
                                <img src={require('../../assets/safeguard/api-1.png')} />
                            </div>
                            <p>合法</p>
                        </div>
                        <div className={styles.item +' '+ styles.item2}>
                            <div className={styles.imgbox}>
                                <img src={require('../../assets/safeguard/api-2.png')} />
                            </div>
                            <p>合规</p>
                        </div>
                        <div className={styles.item  +' '+ styles.item3}>
                            <div className={styles.imgbox}>
                                <img src={require('../../assets/safeguard/api-3.png')} />
                            </div>
                            <p>积极自律</p>
                        </div>
                        <div className={styles.item +' '+ styles.item4}>
                            <div className={styles.imgbox}>
                                <img src={require('../../assets/safeguard/api-4.png')} />
                            </div>
                            <p>安全金融科技生态圈
                            </p>
                        </div>
                    </div>
                    <div className={styles.btnInt}>
                        <p>去投网一直来秉持合法合规经营的原则，积极自律，致力于为用户和行业营造一个更安全的金融科技生态圈。</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
  }

}

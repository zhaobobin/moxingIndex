import React from 'react';
import { connect } from 'dva';
import styles from './Share.less';
import ResultJson from '~/routes/Result/ResultJson'
@connect(state => ({
  global: state.global,
}))
export default class Share extends React.Component {
constructor(props) {
    super(props);
    this.loading = true;
    this.state = {
      data:{}
    };

  }
componentDidMount(){
    this.getshareData();
 }

  getshareData=()=>{
 	let {userId, accessToken} = this.props.global.currentUser.userInfo;  
  	console.log(this.props.global.currentUser.userInfo)
    this.props.dispatch({
      type: 'global/post',
      url: '/api/accountNotice/sharingNotification?productType=1',
      payload:{      	
        userId,       
        accessToken
      },
      
      callback: (res) => {
        this.loading = false;
        if(res.code === 0){  
        	console.log(res.data)
          this.setState({          	
          	data:res.data          	
          })          
        }
      }
    })
  };
  redirect = (action) => {
    window.location.href = window.location.href + '&action=' + action;
    setTimeout(() => {
      window.location.reload();
    }, 500)
  };

  render(){
  	const {data} = this.state;
    return(
      <div className={styles.share}>
      <img src={require('../../assets/share/bask_bg_01.jpg')}  className={styles.shareimg}/>
      <div className={styles.sharemiddle}>
        <div className={styles.shareicon}><img src={data.headImg || require("~/assets/share/my_shai_interal@2x.png")} alt="" /><span>{data.userName}</span></div>
        <div className={styles.sharetip}>{data.annualIncome}</div>
        <div className={styles.sharemoney}><img src={require('../../assets/share/bask_goldcoin.png')} />{data.annualReturn}元</div>
        <p className={styles.shareword}>超越了{data.percentage}%的全国投友</p>
        </div>
        <div className={styles.sharebottom}>
        <img src={require('../../assets/share/bask_bg_03.jpg')}  className={styles.shareimg} />
        <div className={styles.sharecon} align="center">
	        <div className={styles.shareBut} onClick={() => this.redirect(ResultJson.share_shouyi.action)}><span>分享</span></div>
	        <p>京ICP证 京B2-20160180 | 京ICP备14014223</p>
	        <p>北京恒远鑫达投资管理有限公司</p>
	        </div>
        </div>
      </div>
    )
  }

}

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
  	const { bidShare } = this.props;
  	const bidSharedata = (bidShare  === '1');  //1是分享晒一晒,2是资产详情晒一晒
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
        {
               bidSharedata ?               
           <div className={styles.sharecon} align="center"  state={bidShare=='2'} >
	        <div className={styles.shareBut} onClick={() => this.redirect(ResultJson.share_shouyi.action)}><span>下载去投网App</span></div>
	        <p>京ICP证 京B2-20160180 | 京ICP备14014223</p>
	        <p>北京恒远鑫达投资管理有限公司</p>
	        </div>
                :                
	        <div className={styles.sharecon} align="center" state={bidShare=='1'} >
	        <div className={styles.shareBut_1}>
	           <div className={styles.shareButimg}><img src={require('../../assets/share/bask_share.png')}  /><span>分享到</span><img src={require('../../assets/share/bask_share.png')}  /></div>
	          <ul className={styles.shareiconimg}>
	             <li onClick={() => this.redirect(ResultJson.share_wechat.action)}><img src={require('../../assets/share/bask_wechat.png')}  /><span>微信好友</span></li>
	             <li onClick={() => this.redirect(ResultJson.share_qq.action)}><img src={require('../../assets/share/bask_qq.png')}  /><span>QQ</span></li>
	             <li onClick={() => this.redirect(ResultJson.share_friends.action)}><img src={require('../../assets/share/bask_circleoffriends.png')}  /><span>朋友圈</span></li>
	          </ul>
	       </div>
	       </div>
            }
        
        </div>
      </div>
    )
  }

}

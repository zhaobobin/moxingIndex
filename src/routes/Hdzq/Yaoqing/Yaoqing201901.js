import React from 'react';
import { connect } from 'dva';
import YaoqingPackage from '~/components/Hdzq/YaoqingPackage';
import YaoqingRegulation from '~/components/Hdzq/YaoqingRegulation';
import YaoqingReturnMoney from '~/components/Hdzq/YaoqingReturnMoney';
import styles from './Yaoqing201901.less';
import ResultJson from '../../Result/ResultJson';
import moment from 'moment';
import LazyLoad from 'react-lazyload';
@connect(state => ({
  global: state.global,
}))
export default class Yaoqing201812 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        data:{}
    }
  }
  componentDidMount(){
     let { userId } = this.props.global.currentUser.userInfo;
     if(userId===undefined){
       userId=null
     }else {
       userId;
     }
    this.props.dispatch({
      type: 'global/post',
      url: '/api/coupon/invitationAward',
      payload: {
         userId,
      },
      callback: (res) => {
        if(res.code===0){
          this.setState({
            data:res.data,
          })
        }
      }
    })
  }
  /*点击按钮*/
  redirect=(action)=>{

  }
  render(){
    const {data}=this.state;
  	const {isAuth} = this.props.global;
  	   console.log(isAuth);
    return(
     <div className={styles.YaoqingBox}>
            {/*第一部分*/}
       <LazyLoad height={'19%'}>
         {
           isAuth
             ?
             null
             :
             <img src={require("~/assets/Invitation/invent_app_stars@2x.png")} className={styles.YaoqingStarImg}/>
         }
       <img src={require("~/assets/Invitation/invent_app_top@2x.png")} className={styles.YaoqingBoxHeadImg}/>
       <div className={styles.YaoqingTimeBox}>
         <p>活动时间</p>
         <p>{moment(data.startDate).format("YYYY-MM-DD")}至{moment(data.endDate).format("YYYY-MM-DD")}</p>
       </div>
       </LazyLoad>
          {/*第二部分*/}
       <div className={styles.YaoqingBoxTwo}>
         <LazyLoad height={'32%'}>
            <YaoqingPackage data={data} isAuth={isAuth}/>
         </LazyLoad>
          {/*第三部分*/}
         <LazyLoad height={'18%'}>
            <YaoqingRegulation />
          </LazyLoad>
          {/*第四部分*/}
         <LazyLoad height={'26%'}>
            <YaoqingReturnMoney />
         </LazyLoad>
         <div className={styles.YaoqingFooter}> </div>
       </div>

        <p className={styles.YaoqingFooterBox}>
          <img src={require("~/assets/Invitation/invent_app_bt1@2x.png")}  onClick={() => this.redirect(ResultJson.invite_share.action)}/>
          <img src={require(isAuth===false?"~/assets/Invitation/invent_app_bt3@2x.png":'~/assets/Invitation/invent_app_bt2@2x.png')} onClick={() => this.redirect(isAuth===false?ResultJson.invite_login.action:ResultJson.invite.action)}/>
        </p>
     </div>
    )
  }

}



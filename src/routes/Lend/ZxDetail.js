import React from 'react';
import { connect } from 'dva';
import styles from './Detail.less';
import ToastLoading from '~/components/Common/ToastLoading';
import logo from '~/assets/com/logo.png';
import { Progress } from 'antd';
import { Link } from 'dva/router';
@connect(state => ({
  global: state.global,
}))
export default class ZxDetail extends React.Component {

  constructor(props){
    super(props);
    this.loading = true;
    this.state = {
      detail: {},
      detail1: {},
    }
  }

  componentDidMount(){
    let id = this.props.match.params.id;
   let cid = this.props.match.params.id;
    this.queryDetail(id);
    this.queryDetailHead(id);
  }

  componentWillReceiveProps(nextProps){
  	console.log(nextProps.match.params)  	
    if(nextProps.match.params.id !== this.props.match.params.id){
      let id = nextProps.match.params.id;
      this.queryDetail(id);
    }
       if(nextProps.match.params.id !== this.props.match.params.id){
      let id = nextProps.match.params.id;
      this.queryDetailHead(id);
    }
  }

  queryDetail(productNo){
  	 const {  match: { params } } = this.props;
    this.props.dispatch({
      type: 'global/post',      
      url: '/api/wisdomProduct/findProductDetail',
      payload: {      	
        productNo: params.id
      },
      callback: (res) => {
      	 console.log(res)
        this.loading = false;
        if(res.code === 0){
        	console.log(res.data)
          this.setState({
            detail: res.data
          })
        }
      }
    })
  }
 queryDetailHead(productNo){
  	 const {  match: { params } } = this.props;
    this.props.dispatch({
      type: 'global/post',      
      url: '/api/wisdomProduct/findProjectDetail',
      payload: {      	
        productNo: params.id
      },
      callback: (res) => {
      	 console.log(res)
        this.loading = false;
        if(res.code === 0){
        	console.log(res.data)
          this.setState({
            detail1: res.data
          })
        }
      }
    })
  }
  render(){

    const {detail,detail1} = this.state;

    return(
      <div className={styles.detail}>

        {
          this.loading ?
            <ToastLoading/>
            :
            <div className={styles.content}>
              {/*<div className={styles.head}>
                <img src={logo} alt="logo"/>
                <h1>{detail.applyTitle}</h1>
              </div>*/}
              <div className={styles.body}>
                   <div className={styles.sb_top}>
                   <div className={styles.sb_border}><span></span></div>
                   
                   <div align="center"><Progress type="dashboard" percent={detail.progress} gapDegree="160" width="250px" strokeWidth="1" strokeColor="#E6EEFF"/><span className={styles.sb_cirel}></span></div>
                   <span className={styles.sb_top1}>已有{detail.investNum}人出借</span><strong className={styles.sb_top2}><i>{detail.incomeRate}%</i>年化利率</strong></div>
                   <div className={styles.sb_middle}><div className={styles.sb_middlewid}><span className={styles.border}><i>{detail.investPeriod}个月</i>授权服务期限</span><span><i>{detail.availableAmt}元</i>剩余金额</span></div></div>
                   <div className={styles.sb_contect}>
                   <h1>服务特色</h1>
                   <ul className={styles.sb_contectUl+' '+ styles.sb_contectUl1}>
                     <li><span>当前开放金额</span>{detail1.expectTol}</li>                     
                     <li><span>授权出借条件</span>{detail1.authLendCondition}</li>
                     <li><span>授权服务金额上限</span>{detail1.maxAmt}</li>
                     <li><span>利息处理方式</span>{detail1.repayType}</li>
                     <li><span>服务期限结束日</span>{detail1.endperiod}</li>
                     <li><span>到期退出方式</span>{detail1.expirationExitMode}</li>
                     <li><span>提前退出方式</span>{detail1.earlyExitMode}</li>
                     <li><span>风险提示</span>{detail1.riskHints}</li>
                     <li><span>退出风险</span>{detail1.exitRisk}</li>
                   </ul>
                   </div>
              </div>
              <div className={styles.sharebottom}>京ICP证 京B2-20160180 | 京ICP备14014223号-2<span>北京恒远鑫达投资管理有限公司</span></div>
              
            </div>
        }
<div className={styles.sbDownBut}><Link to="/download"><span>下载去投网</span></Link></div>
      </div>
    )
  }

}

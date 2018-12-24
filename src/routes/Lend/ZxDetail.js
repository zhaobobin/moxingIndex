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
    }
  }

  componentDidMount(){
    let id = this.props.match.params.id;
    this.queryDetail(id);
  }

  componentWillReceiveProps(nextProps){
  	console.log(nextProps.match.params)  	
    if(nextProps.match.params.id !== this.props.match.params.id){
      let id = nextProps.match.params.id;
      this.queryDetail(id);
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

  render(){

    const {detail} = this.state;

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
                   <h1>项目简介</h1>
                   <ul className={styles.sb_contectUl}>
                     <li><span>标的名称</span>{detail.bidName}</li>
                     <li><span>借款金额</span>{detail.expectTolFormat}</li>
                     <li><span>发标时间</span>{detail.pubTime}</li>
                     <li><span>封闭期</span>{detail.investPeriod}天</li>
                     <li><span>起投金额</span>{detail.minAmt}元</li>
                     <li><span>还款方式</span>{detail.returnMethod}</li>
                     <li><span>起息日</span>{detail.startInterestRate}</li>
                     <li className={styles.iconA}><span>信用等级</span><i>A</i><em>&nbsp;</em></li>
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

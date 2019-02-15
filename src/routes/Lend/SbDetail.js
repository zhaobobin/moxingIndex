import React from 'react';
import { connect } from 'dva';
import styles from './Detail.less';
import ToastLoading from '~/components/Common/ToastLoading';
import logo from '~/assets/com/logo.png';
import { Link } from 'dva/router';
import { Progress } from 'antd';
@connect(state => ({
  global: state.global,
}))
export default class SbDetail extends React.Component {

  constructor(props){
    super(props);
    //this.loading = true;
    this.state = {
      detail: {},
    }
  }

  componentDidMount(){
    let id = this.props.match.params.id;
    this.queryDetail(id);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.id !== this.props.match.params.id){
      let id = nextProps.match.params.id;
      this.queryDetail(id);
    }
  }

  queryDetail(pactissueNo){
  	const {  match: { params } } = this.props;
    this.props.dispatch({
      type: 'global/post',
      url: '/api/scatteredProduct/findP2pPactIssueDetail',
      payload: {
        pactissueNo: params.id
      },
      callback: (res) => {
        this.loading = false;
        if(res.code === 0){
          this.setState({
            detail: res.data.p2pPactIssueVo
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
                <h1>{detail.applyTitle===''?'0':detail.applyTitle}</h1>
              </div>*/}
              <div className={styles.body}>
                   <div className={styles.sb_top}>
                   <div className={styles.sb_border}><span></span></div>                   
                   <div align="center"><Progress type="dashboard" percent={detail.bidProgress==='' ? '0': detail.bidProgress} gapDegree="160" width="250px" strokeWidth="1" strokeColor="rgb(230,238,255)" format={percent => percent + '%'}/><span className={styles.sb_cirel}></span></div>
                   <span className={styles.sb_top1}>已有{detail.bidPeopleNum===''?'0':detail.bidPeopleNum}人出借</span><strong className={styles.sb_top2}><i>{detail.businessRate===''?'0':detail.businessRate}%</i>年化利率</strong></div>
                   <div className={styles.sb_middle}><div className={styles.sb_middlewid}><span className={styles.border}><i>{detail.termMonth===''?'0':detail.termMonth}个月</i>借款期限</span><span><i>{detail.surplusMoney===''?'0':detail.surplusMoney}元</i>剩余金额</span></div></div>
                   <div className={styles.sb_contect}>
                   <h1>项目简介</h1>
                   <ul className={styles.sb_contectUl}>
                     <li><span>项目名称</span>{detail.applyTitle===''?'0':detail.applyTitle}</li>
                     <li><span>借款金额</span>{detail.applyAmt===''?'0':detail.applyAmt}</li>
                     <li><span>发标时间</span>{detail.issueTime===''?'0':detail.issueTime}</li>
                     <li><span>封闭期</span>{detail.closedDay===''?'0':detail.closedDay}天</li>
                     <li><span>起投金额</span>{detail.bidCash===''?'0':detail.bidCash}元</li>
                     <li><span>还款方式</span>{detail.returnMethod===''?'0':detail.returnMethod}</li>
                     <li><span>起息日</span>{detail.beginDate===''?'0':detail.beginDate}</li>
                     <li className={styles.iconA}><span>信用等级</span><i>{detail.xyLevel}</i><em>&nbsp;</em></li>
                   </ul>
                   </div>
              </div>
              <div className={styles.sharebottom}>京ICP证 京B2-20160180 | 京ICP备14014223号-2<span>北京恒远鑫达投资管理有限公司</span></div>
              
            </div>
        }
<Link to="/download"><div className={styles.sbDownBut}><span>下载去投网</span></div></Link>
      </div>
    )
  }

}

import React from 'react';
import { connect } from 'dva';
import styles from './Detail.less';

import ToastLoading from '~/components/Common/ToastLoading';
import logo from '~/assets/com/logo.png';

@connect(state => ({
  global: state.global,
}))
export default class SbDetail extends React.Component {

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
    if(nextProps.match.params.id !== this.props.match.params.id){
      let id = nextProps.match.params.id;
      this.queryDetail(id);
    }
  }

  queryDetail(pactissueNo){
    this.props.dispatch({
      type: 'global/post',
      url: '/api/scatteredProduct/findP2pPactIssueDetail',
      payload: {
        pactissueNo
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
              <div className={styles.head}>
                <img src={logo} alt="logo"/>
                <h1>{detail.applyTitle}</h1>
              </div>
              <div className={styles.body}>
                   <div className={styles.sb_top}><span>已有5人出借</span><strong><i>11.08%</i>年化利率</strong><span>已加入100%</span></div>
                   <div className={styles.sb_middle}><span><i>12个月</i>借款期限</span><span><i>20,000.00元</i>剩余金额</span></div>
                   <div className={styles.sb_contect}>
                   <h1>项目简介</h1>
                   <ul>
                     <li><span>项目名称</span>资金周转(B807110925204834)</li>
                     <li><span>借款金额</span>55,000.00</li>
                     <li><span>发标时间</span>2018-07-12 19:51:21</li>
                     <li><span>封闭期</span>360天</li>
                     <li><span>起投金额</span>100.00元</li>
                     <li><span>还款方式</span>等额本息</li>
                     <li><span>起息日</span>预计满标次日起息</li>
                     <li><span>信用等级</span><i  className={styles.iconA}>A</i></li>
                   </ul>
                   </div>
              </div>
              <div className={styles.sharebottom}>京ICP证 京B2-20160180 | 京ICP备14014223号-2<span>北京恒远鑫达投资管理有限公司</span></div>
            </div>
        }

      </div>
    )
  }

}

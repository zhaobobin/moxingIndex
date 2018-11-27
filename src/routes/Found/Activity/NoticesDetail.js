import React from 'react';
import { connect } from 'dva';
import styles from './NoticesDetail.less';
@connect(state => ({
  global: state.global,
}))
export default class NoticesDetail extends React.Component {

  componentDidMount(){
    let id = this.props.match.params.id;
    console.log(id)
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.id !== this.props.match.params.id){
      let id = nextProps.match.params.id;
      console.log(id)
    }
  }

  render(){
    return(
      <div className={styles.noticeDetail}>
        <h1>关于建设、农业、工商银行系统升级<span>2018.08.16</span></h1>
        <div className={styles.word}>
          <p>为有效提高投资者对互联网金融的认识，树立正确的投资理念，增强投资者风险防范意识和理性投资意识。2018年2月6日，去投网于集团总部四层会议厅开展了“信息披露与风险教育”知识培训活动。 </p>
          <p>活动中，主讲老师由浅入深全方位地讲解了互联网金融平台法律风险，就如何识别与防范法律风险作出提示和建议，并对投资者提出的问题进行了解答。</p>
          <p>主讲老师指出，互联网金融鼓励创新，而创新在拓宽金融服务的业务范围、提高服务水平，带来新的利润增长点之外，也在一定程度上隐含着逾越监管的法律风险，很多时候，“创新”本身就意味着冒险。因此，针对具体业务事宜开展相应的法律分析，就潜在的法律风险及业务自身的合规性、合法性进行适当的论证，不但有助于防范法律风险，更有利于互联网金融的业务创新。</p>
          <img src={require('../../../assets/down/rwm.png')} />
          <p>主讲老师指出，互联网金融鼓励创新，而创新在拓宽金融服务的业务范围、提高服务水平，带来新的利润增长点之外，也在一定程度上隐含着逾越监管的法律风险，很多时候，“创新”本身就意味着冒险。因此，针对具体业务事宜开展相应的法律分析，就潜在的法律风险及业务自身的合规性、合法性进行适当的论证，不但有助于防范法律风险，更有利于互联网金融的业务创新。</p>
        </div>
      </div>
    )
  }

}

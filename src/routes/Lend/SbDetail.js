import React from 'react';
import { connect } from 'dva';
import styles from './Detail.less'

import ToastLoading from '~/components/Common/ToastLoading'
import logo from '~/assets/com/logo.png'

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

              </div>
            </div>
        }

      </div>
    )
  }

}

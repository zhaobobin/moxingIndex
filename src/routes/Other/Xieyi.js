/**
 * 查询协议
 * oid [Number]
 * 33、安心签平台服务协议
 * 34、CFCA数字证书服务协议
 * 35、隐私声明
 * 49、用户注册协议
 * 50、出借人服务协议
 * 51、风险提示函
 * 52、个人电子签章授权委托协议
 * 53、借款人合同
 * 54、借款人服务协议
 * 55、借款人特别提示
 * 56、债权转让及受让协议
 */
import React from 'react';
import { connect } from 'dva';

import ToastLoading from '~/components/Common/ToastLoading'
import ArticleDetail from '~/components/Article/ArticleDetail'

@connect(state => ({
  global: state.global,
}))
export default class Xieyi extends React.Component {

  constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.loading = true;
    this.state = {
      detail: ''
    }
  }

  componentDidMount(){
    let oid = this.props.match.params.oid;
    this.queryXieyi(oid);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.oid !== this.props.match.params.oid){
      let oid = nextProps.match.params.oid;
      this.queryXieyi(oid);
    }
  }

  queryXieyi(oid){

    if(!this.ajaxFlag) return;
    this.ajaxFlag = false;

    this.props.dispatch({
      type: 'global/post',
      url: '/api/protocol/view',
      payload: {
        oid
      },
      callback: (res) => {
        this.loading = false;
        setTimeout(() => { this.ajaxFlag = true }, 500);
        if(res.code === 0){
          this.setState({
            detail: res.data
          })
        }
      }
    })

  };

  render(){

    const {detail} = this.state;

    return(
      <div>
        {
          this.loading ?
            <ToastLoading/>
            :
            <ArticleDetail detail={detail}/>
        }
      </div>
    )
  }

}

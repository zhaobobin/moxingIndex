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
    let oid = this.props.oid;
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
            <ArticleDetail detail={detail} hideHead={true}/>
        }
      </div>
    )
  }

}

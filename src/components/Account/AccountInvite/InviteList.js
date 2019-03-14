import React from 'react';
import { connect } from 'dva';
import { Toast, ListView } from 'antd-mobile';
import styles from './InviteList.less'

import CusListView from '~/components/List/CusListView'

@connect(state => ({
  global: state.global,
}))
export default class InviteList extends React.Component {

  constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.state = {
      loading: true,
      api: '/api/home/app/findAppInvitationRecord',
      list: [],
      total: 0,
      pageNum: 1,
      pageSize: 7,
    }
  }

  componentDidMount(){
    this.queryList();
  }

  //查询列表
  queryList = (params) => {

    if(!this.ajaxFlag) return;
    this.ajaxFlag = false;

    this.setState({ loading: true });
    const {userId} = this.props.global.currentUser.userInfo;
    const {api, pageNum, pageSize} = this.state;

    this.props.dispatch({
      type: 'global/post',
      url: api,
      payload:{
        userId,
        pageNum,
        pageSize,
      },
      callback: (res)=>{
        setTimeout(() => { this.ajaxFlag = true }, 500);
        if(this.props.callback) this.props.callback(res.data);
        this.setState({
          loading: false,
          list: res.data.list,
          total: res.data.total,
        })
      }
    })
  };

  queryMoreList = () => {

  };

  render(){
    return(
      <div>

      </div>
    )
  }
}

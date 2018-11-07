import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class InvitationIndex extends React.Component {

  render(){
    return(
      <div>
        邀请好友首页
      </div>
    )
  }

}

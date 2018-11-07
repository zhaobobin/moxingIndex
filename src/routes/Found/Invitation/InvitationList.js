import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class InvitationList extends React.Component {

  render(){
    return(
      <div>
        邀请列表
      </div>
    )
  }

}

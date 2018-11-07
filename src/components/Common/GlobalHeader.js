import React from 'react';
import { connect } from 'dva';
import { NavBar, Icon } from 'antd-mobile';
import { getTitle } from '~/utils/utils'

@connect(state => ({
  global: state.global,
}))
export default class GlobalHeader extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      title: 'NavBar'
    }
  }

  goBack = () => {
    window.history.go(-1)
  };

  render(){

    return(
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={this.goBack}
      >
        {this.state.title}
      </NavBar>
    )
  }

}

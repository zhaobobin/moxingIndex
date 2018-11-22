import React from 'react';
import { connect } from 'dva';
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
      <div>
        {this.state.title}
      </div>
    )
  }

}

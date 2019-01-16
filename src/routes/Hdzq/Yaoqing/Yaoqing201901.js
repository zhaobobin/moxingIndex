import React from 'react';
import { connect } from 'dva';
@connect(state => ({
  global: state.global,
}))
export default class Yaoqing201901 extends React.Component {
  constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.state = {

    }
  }
  componentDidMount(){

  }

  render(){
    return(
    <div>
      Yaoqing201901
    </div>
    )
  }

}



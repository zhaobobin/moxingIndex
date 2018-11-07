import React from 'react';
import { connect } from 'dva';

@connect(state => ({
  global: state.global,
}))
export default class HelpDetail extends React.Component {

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
      <div>
        帮助详情
      </div>
    )
  }

}

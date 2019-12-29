import React from 'react'
import { Icon, Input } from 'antd'
import { InputItem, Toast } from 'antd-mobile';
import styles from './InputNumberPlus.less'

export default class InputNumberPlus extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      value: 1
    }
  }

  componentDidMount(){
    const { defaultValue } = this.props;
    if(defaultValue){
      this.setState({
        value: defaultValue
      })
    }
  }

  onChange = (value) => {
    this.setState({
      value
    })
    this.props.callback(value)
  }

  reduce = () => {
    let { value } = this.state;
    value--;
    if(value <= 0) value = 1;
    this.setState({
      value
    })
    this.props.callback(value)
  }

  increase = () => {
    let { value } = this.state;
    value++;
    this.setState({
      value
    })
    this.props.callback(value)
  }

  render(){

    return(
      <div className={styles.container}>
        <div className={styles.left} onClick={this.reduce}>
          <Icon type="minus" />
        </div>
        <div className={styles.center}>
          <InputItem
            type="number"
            maxLength={5}
            value={this.state.value}
            onChange={this.onChange}
          />
        </div>
        <div className={styles.right} onClick={this.increase}>
          <Icon type="plus" />
        </div>
      </div>
    )
  }

}

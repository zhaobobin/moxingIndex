/**
 * 活动 - 添加报名
 */
import React from 'react'
import {connect} from 'dva';
import { List, InputItem, Toast, Modal } from 'antd-mobile';
import { createForm } from 'rc-form';
import styles from './ActivitySignModal.less'

import ButtonPrimary from '~/components/Button/ButtonPrimary'

@connect(state => ({
  global: state.global,
}))
@createForm()
export default class ActivitySignModal extends React.Component {

  constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.state = {
      visible: false,
      explain: props.explain,
      values: props.explain
    }
  }

  componentDidMount(){
    this.props.onRef(this);
  }

  componentWillUnmount(){
    this.close();
  }

  show = () => {
    this.setState({
      visible: true
    })
  }

  close = () => {
    const { values } = this.state;
    for(let i in values) {
      values[i].val = '';
    }
    this.setState({
      visible: false,
      values
    })
  }

  onChange = (value, name) => {
    const { values } = this.state;
    for(let i in values) {
      if(values[i].name === name) {
        values[i].val = value;
      }
    }
    this.setState({
      values
    })
  }

  save = () => {
    let flag = true
    let { values } = this.state;
    for(let i in values) {
      if(!values[i].val){
        flag = false
        Toast.info(`请填写${values[i].name}`, 2);
        return false;
      }
      if(values[i].type === '2' && values[i].val.replace(/\s/g, '').length !== 11) {
        flag = false
        Toast.info('请填写正确的手机号', 2);
        return false;
      }
    }
    if(flag) {
      this.props.callback(values);
      this.close();
    }
  }

  renderFormItem = (item, index, getFieldProps) => {
    const { values } = this.state;
    switch(item.type){
      case '1':
        item['key'] = 'name';
        item['inputType'] = 'text'
        break;
      case '2':
        item['key'] = 'mobile';
        item['inputType'] = 'number'
        break;
      default: break;
    }
    return(
      <InputItem
        {...getFieldProps(item.name, {
          rules: [{required: true}]
        })}
        type={item.inputType}
        placeholder={item.explain}
        maxLength={item.type === '2' ? 11 : parseInt(item.max)}
        value={values ? values[index].val : ''}
        onChange={(value) => this.onChange(value, item.name)}
        clear
      >
        {item.name}
      </InputItem>
    )
  }

  render(){

    const { getFieldProps } = this.props.form;
    const { visible, explain } = this.state;

    return(
      <Modal
        visible={visible}
        maskClosable={false}
        destroyOnClose={true}
        onClose={this.close}
        className={styles.signModal}
      >
        <div className={styles.container}>

          <div className={styles.body}>
            <List>
              {
                explain.map((item, index) => (
                  <div key={index}>
                    {this.renderFormItem(item, index, getFieldProps)}
                  </div>
                ))
              }
            </List>
          </div>

          <div className={styles.foot}>
            <ButtonPrimary width="100%" onClick={this.save}>确认</ButtonPrimary>
          </div>
        </div>
      </Modal>
    )
  }

}

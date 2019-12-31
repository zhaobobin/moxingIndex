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
      values: {

      }
    }
  }

  componentDidMount(){
    this.props.onRef(this);
  }

  componentWillUnmount(){
    this.close()
  }

  show = () => {
    this.setState({
      visible: true
    })
  }

  close = () => {
    this.setState({
      visible: false
    })
  }

  onChange = (value, key) => {
    const {values} = this.state;
    values[key] = value;
    console.log(values)
    this.setState({
      values
    })
  }

  save = () => {
    this.props.form.validateFields('', (err, values) => {
      if (!err) {
        // console.log(values)
        this.props.callback(values)
        this.close()
      } else {
        // console.log(err)
        Toast.info('请完善报名信息', 2)
      }
    });
  }

  render(){

    const { visible } = this.state;
    const { getFieldProps } = this.props.form;

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
              <InputItem
                {...getFieldProps('name', {
                  rules: [{required: true}]
                })}
                clear
                placeholder="请输入"
                // onChange={value => this.onChange(value, 'name')}
              >名称</InputItem>

              <InputItem
                {...getFieldProps('mobile', {
                  rules: [{required: true}]
                })}
                clear
                placeholder="请输入"
                // onChange={value => this.onChange(value, 'mobile')}
              >手机号</InputItem>
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

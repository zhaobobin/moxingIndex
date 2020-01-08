/**
 * 活动 - 微信环境下的支付提示
 */
import React from 'react'
import {connect} from 'dva';
import { List, InputItem, Toast, Modal } from 'antd-mobile';
import styles from './ActivityPayWechatModal.less'

import ButtonPrimary from '~/components/Button/ButtonPrimary'

@connect(state => ({
  global: state.global,
}))
export default class ActivityPayWechatModal extends React.Component {

  constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.state = {
      visible: false,
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

  render(){

    const { visible } = this.state;

    return(
      <Modal
        visible={visible}
        animationType="fade"
        maskClosable={false}
        destroyOnClose={true}
        onClose={this.close}
        className={styles.wechatModal}
      >
        <div className={styles.container}>

          <div className={styles.body}>
            <p>请在菜单中选择在浏览器中打开，<br/>以完成支付</p>
            <img src={require('~/assets/download/arrow.png')} alt="arrow"/>
          </div>

          <div className={styles.foot}>
            <ButtonPrimary width="100%" onClick={this.close}>关闭</ButtonPrimary>
          </div>
        </div>
      </Modal>
    )
  }

}

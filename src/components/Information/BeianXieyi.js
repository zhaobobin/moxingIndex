/*备案协议*/
import React from 'react';
import { connect } from 'dva';
import styles from './BeianXieyi.less';
import { Modal } from 'antd';
import XieYiImg1 from '../../assets/account/DepositoryAgreement_01.jpg';
import XieYiImg2 from '../../assets/account/DepositoryAgreement_02.jpg';
@connect(state => ({
  global: state.global,
}))

export default class BeianXieyi extends React.Component {
  constructor(props) {
    super(props);
    this.ajaxFlag = true;
    this.state = {
      visible: false
    }
  }
  componentDidMount() {
    this.props.onRef(this)
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  hideModal = () => {
    this.setState({
      visible: false,
    });
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    return (
      <div>
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.hideModal}
          footer={null}
          style={{ top: 0 }}
          width='45%'
        >
          <div className={styles.ImgBox}>
            <img src={XieYiImg1} alt=""/>
            <img src={XieYiImg2} alt=""/>
          </div>
        </Modal>
      </div>
    )
  }

}

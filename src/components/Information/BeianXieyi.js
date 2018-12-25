/*备案协议*/
import React from 'react';
import { connect } from 'dva';
import styles from './BeianXieyi.less';
import { Modal,Icon,Carousel } from 'antd';
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
    this.chooseIndex=null
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

    this.setState({
      visible: false,
    });
  }
  IconRight=()=>{
    this.chooseIndex.next()
  }
  IconLeft=()=>{
    this.chooseIndex.prev()
  }
  onChange=(a,b,c)=>{

  }

  render() {
    return (
      <div className={styles.BeianXieyiBox}>
        <Modal
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.hideModal}
          footer={null}
          style={{ top: 100 ,padding:0}}
          wrapClassName='BeianXieyi'
        >
          <div className={styles.ImgBox}>
            <Carousel
              afterChange={this.onChange}
              dots={false}
              ref={el=>{this.chooseIndex=el}}
            >
              <img src={XieYiImg1} alt="" className={styles.XieYiImg1} />
              <img src={XieYiImg2} alt="" className={styles.XieYiImg2} />
            </Carousel>
            <Icon type="right" className={styles.IconRight} onClick={this.IconRight}/>
            <Icon type="left"  className={styles.IconLeft} onClick={this.IconLeft}/>
          </div>

        </Modal>

      </div>
    )
  }

}

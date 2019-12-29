/**
 * 活动 - 订单
 */
import React from 'react'
import {connect} from 'dva';
import { Link } from 'dva/router'
import { Button } from 'antd'
import { Toast, Modal } from 'antd-mobile';
import styles from './ActivityOrder.less'

import InputNumberPlus from '~/components/Form/InputNumberPlus'
import ActivitySignModal from '~/components/Activity/ActivitySignModal'

@connect(state => ({
  global: state.global,
}))
export default class ActivityOrder extends React.Component{

  constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.state = {
      loading: true,
      id: '',
      detail: '',

      signModalVisible: false
    }
  }

  componentDidMount(){
    window.scrollTo(0, 0);
    let id = this.props.match.params.id;
    this.queryDetail(id);
  }

  //处理用户登录、退出时，重新渲染文章数据
  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.match.params.id !== this.props.match.params.id){
      let id = nextProps.match.params.id;
      this.queryDetail(id);
    }
  }

  // 活动票务详情报名详情
  queryDetail = (id) => {
    this.props.dispatch({
      type: 'global/post',
      url: '/api/activities/sign',
      payload: {
        id
      },
      callback: (res) => {
        setTimeout(() => { this.ajaxFlag = true }, 500)
        if (res.code === '0') {
          this.setState({
            id,
            loading: false,
            detail: res.data
          })
        } else {
          Toast.info(res.msg, 2);
        }
      }
    })
  }

  InputNumberPlusCb = (value) => {
    this.setState({
      value
    })
  }

  // sign
  showSignModal = () => {
    this.activitySignModal.show()
  }

  addSignCb = (values) => {

  }

  render(){

    const {
      id, loading, detail
    } = this.state;

    return(
      <>
      {
        loading ?
          null
          :
          <div className={styles.container}>

            <div className={styles.content}>

              <div className={styles.section}>
                <h2>选择场次</h2>
                <div className={styles.con}>

                </div>
              </div>

              <div className={styles.section}>
                <h2>门票种类</h2>
                <div className={styles.con}>

                </div>
              </div>

              <div className={styles.section}>
                <h2>门票单价</h2>
                <div className={styles.con}>
                  <label className={styles.label}>常规票</label>
                  <span className={styles.p}>¥ 100</span>
                </div>
              </div>

              <div className={styles.section}>
                <h2>选择数量</h2>
                <div className={styles.con}>
                  <label>常规票</label>
                  <span className={styles.p}>
                    <InputNumberPlus callback={this.InputNumberPlusCb}/>
                  </span>
                </div>
              </div>

              <div className={styles.section}>
                <h2>参会成员</h2>
                <div className={styles.con}>
                  <Button
                    type="primary"
                    size="large"
                    icon="plus-circle"
                    ghost
                    onClick={this.showSignModal}>
                    添加参会成员
                  </Button>
                </div>
              </div>

            </div>

            <div className={styles.foot}>

              <div className={styles.right}>
                <Link to={`/activity/pay/${id}`} className={styles.start}>
                  立即购买
                </Link>
              </div>

              <div className={styles.left}>
                总价：
                <span>¥100</span>
              </div>

            </div>

            <ActivitySignModal
              onRef={e => this.activitySignModal = e}
              callback={this.addSignCb}
            />

          </div>
      }
      </>
    )
  }

}

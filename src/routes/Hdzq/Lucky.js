/**
 * 抽奖活动详情
 * http://www.moxinga.com/hdzq/lucky?platform=app&id=8
 */
import React from 'react'
import {connect} from 'dva';
import {Link} from 'dva/router'
import {Form, Button} from 'antd'
import {Modal, Toast} from 'antd-mobile';
import {ENV, Storage, hasErrors, getUrlParams, setupWebViewJavascriptBridge} from "~/utils/utils";
import styles from './Lucky.less'

import InputMobile from '~/components/Form/InputMobile'
import InputSmscode from '~/components/Form/InputSmscode'

const FormItem = Form.Item;
const paramsObj = getUrlParams() || '';

@connect(state => ({
  global: state.global,
}))
@Form.create()
export default class Lucky extends React.Component {

  constructor(props) {
    super(props);
    this.ajaxFlag = true;
    this.state = {
      luckyCount: Storage.get(ENV.storageLucky) || 0,     //抽奖次数
      modalVisible: false,
      luckyResult: '',
      detail: ''
    }
  }

  componentDidMount() {
    this.queryDetail();
    document.body.style.overflow = 'hidden'
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto'
  }

  // 查询抽奖活动详情
  queryDetail = () => {
    this.props.dispatch({
      type: 'global/post',
      url: '/api/details/prize',
      payload: {
        id: paramsObj.id
      },
      callback: (res) => {
        if (res.code === '0') {
          this.setState({
            detail: res.data
          })
        } else {
          Toast.info(res.msg, 2);
        }
      }
    })
  }

  //手机号
  mobileCallback = (value) => {
    this.props.form.setFieldsValue({'tel': value});
    this.props.form.validateFields(['tel'], (err, values) => {
    });
  };

  //短信验证码回调
  smscodeCallback = (value) => {
    //清空错误提示
    if (value === 'clearError') {
      this.props.form.setFields({
        'smscode': {
          value: '',
          errors: ''
        }
      });
      this.setState({smscodeSended: true});
    }
    else if (value === 'telError') {
      this.props.form.setFields({
        'tel': {
          value: '',
          errors: [new Error('请输入手机号')]
        }
      });
      this.setState({smscodeSended: true});
    }
    else {
      this.props.form.setFieldsValue({'smscode': value});
      this.props.form.validateFields(['smscode'], (err, values) => {
      });
    }
  };

  //表单确认
  handleFormSubmit = (e) => {
    e.preventDefault();

    if (!this.ajaxFlag) return;
    this.ajaxFlag = false;

    let keys = '';
    if (!paramsObj.platform || paramsObj.platform === 'h5') keys = ['tel', 'smscode'];

    this.props.form.validateFields(keys, (err, values) => {
      if (!err) {
        this.submit(values);
      }
    });
    setTimeout(() => {
      this.ajaxFlag = true
    }, 500);
  };

  // 确定抽奖
  submit = (values) => {

    let data = {
      id: paramsObj.id,
      accessToken: paramsObj.accessToken || '',
      inviteCode: paramsObj.inviteCode || '',
      platform: paramsObj.platform || '',
    };
    if (values) {
      data.tel = values.tel;
      data.verity = values.smscode;
    }

    this.props.dispatch({
      type: 'global/post',
      url: '/api/details/draw',
      payload: data,
      callback: (res) => {
        if (res.code === '0') {
          this.setState({
            luckyResult: res.data
          });
          this.modalShow();
        } else {
          Toast.info(res.msg, 2);
        }
      }
    })
  };

  modalShow = () => {
    this.setState({
      modalVisible: true
    });
  };

  modalCancel = () => {
    this.setState({
      modalVisible: false
    });
  };

  // 分享交互
  share = () => {
    let action = 'share_lucky';
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //判断是否是 android终端
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //判断是否是 ios终端

    if (isiOS) {
      setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler('h5Action', action, (response) => {
        });
      });
    }
    else if (isAndroid) {
      window.app.h5Action(action);      //与原生交互
    } else {
      return ''
    }
  };

  render() {

    const {luckyCount, modalVisible, luckyResult, detail} = this.state;
    const {getFieldDecorator, getFieldValue, getFieldsError} = this.props.form;

    const modalWidth = document.body.clientWidth < 750 ? '95%' : '360px';

    const h5LuckyForm = (
      <div className={styles.form}>

        <Form onSubmit={this.handleFormSubmit}>

          {
            paramsObj.platform === 'app' ?
              null
              :
              <FormItem>
                {getFieldDecorator('tel', {
                  validateTrigger: 'onBlur',
                  rules: [
                    {required: true, message: '请输入手机号'},
                    {pattern: /^1[0-9]{10}$/, message: '手机号输入有误'}
                  ],
                })(
                  <InputMobile callback={this.mobileCallback}/>
                )}
              </FormItem>
          }

          {
            paramsObj.platform === 'app' ?
              null
              :
              <FormItem>
                {getFieldDecorator('smscode', {
                  validateTrigger: 'onBlur',
                  rules: [
                    {required: true, message: '请输入验证码'},
                    {pattern: /^[0-9]{4}$/, message: '短信验证码错误'},
                  ]
                })(
                  <InputSmscode
                    api={'/api/user/get_code'}
                    isrepeat={'5'}
                    tel={hasErrors(getFieldsError(['tel'])) ? '' : getFieldValue('tel')}
                    callback={this.smscodeCallback}
                    buttonStyle={{height: '40px', lineHeight: '40px', background: '#fff', color: '#333'}}
                  />
                )}
              </FormItem>
          }

          {
            paramsObj.platform === 'app' ?
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className={styles.btn}
              >
                立即抽奖
              </Button>
              :
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                className={styles.btn}
                disabled={
                  hasErrors(getFieldsError()) ||
                  !getFieldValue('tel') ||
                  !getFieldValue('smscode')
                }
              >
                立即抽奖
              </Button>
          }

        </Form>

      </div>
    );

    return (
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link to="/">
            <img src={require('~/assets/hdzq/lucky/logo.png')} alt="logo"/>
          </Link>
        </div>

        {
          detail ?
            <div className={styles.content}>

              {/*<img className={styles.bg} src={require('~/assets/hdzq/lucky/lucky_bg.jpg')} alt="bg"/>*/}
              <img className={styles.bg} src={require('~/assets/hdzq/lucky/theme.png')} width="100%" height="auto" alt="bg"/>

              <div>
                {
                  luckyCount ?
                    <div className={styles.download}>
                      <dl>
                        <dt>恭喜您已获得</dt>
                        <dd>
                          <p className={styles.p1}>特等奖</p>
                          <p className={styles.p2}>已放入{detail.tel} 趣族账户</p>
                        </dd>
                      </dl>
                      <p>
                        <Link to="/download">下载APP立即使用</Link>
                      </p>
                      {/*<p>*/}
                      {/*<a onClick={this.modalShow}>显示modal</a>*/}
                      {/*</p>*/}
                    </div>
                    :
                    h5LuckyForm
                }
              </div>

              {/*<p style={{textAlign: 'center'}}>*/}
              {/*<Button onClick={this.share}>分享给朋友</Button>*/}
              {/*</p>*/}

              <div className={styles.desc}>
                <dl>
                  <dt><i/><strong>活动细则</strong></dt>
                  <dd>
                    <p dangerouslySetInnerHTML={{__html: detail.content}} />
                  </dd>
                </dl>
              </div>

            </div>
            :
            null
        }

        <Modal
          style={{width: modalWidth}}
          title={luckyResult.name === "未中奖" ? "感谢抽奖" : "恭喜您已获得"}
          footer={false}
          closable={true}
          maskClosable={false}
          transparent={true}
          visible={modalVisible}
          onClose={this.modalCancel}
          className={styles.luckyModal}
        >
          <div className={styles.con}>

            <img className={styles.bg} src={require('~/assets/hdzq/lucky/modal_bg.png')} width="200" height="auto"
                 alt="bg"/>
            <p className={styles.p1}>{luckyResult.name}</p>
            <p className={styles.p2}>
              {
                luckyResult.name === "未中奖" ?
                  paramsObj.platform === 'app' ?
                    "手气还差一点点"
                    :
                    "手气还差一点点，下载app可再来一次！"
                  :
                  `已存入 ${luckyResult.tel}趣族账户`
              }
            </p>
            <p className={styles.hr}/>

            {
              paramsObj.platform === 'app' ?
                null
                :
                <p className={styles.download}>
                  <Link to="/download">
                    <span>下载APP立即使用</span>
                    <img className={styles.plus} src={require('~/assets/hdzq/lucky/plus.png')} alt="plus"/>
                  </Link>
                </p>
            }

            <p>
              <Button type="primary" onClick={this.share}>分享优惠给朋友</Button>
            </p>

          </div>
        </Modal>

      </div>
    )
  }

}

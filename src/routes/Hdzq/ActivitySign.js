/**
 * 活动报名
 * http://www.moxinga.com/hdzq/activity-sign?id=28&platform=h5
 */
import React from 'react'
import {connect} from 'dva';
import {Link, routerRedux} from 'dva/router'
import {Form, Button} from 'antd'
import {Modal, Toast} from 'antd-mobile';
import {ENV, Storage, hasErrors, getUrlParams, setupWebViewJavascriptBridge} from "~/utils/utils";
import styles from './ActivitySign.less'

import InputMobile from '~/components/Form/InputMobile'
import InputSmscode from '~/components/Form/InputSmscode'

const FormItem = Form.Item;
const paramsObj = getUrlParams() || '';

@connect(state => ({
  global: state.global,
}))
@Form.create()
export default class ActivitySign extends React.Component {

  constructor(props) {
    super(props);
    this.ajaxFlag = true;
    this.state = {
      luckyCount: Storage.get(ENV.storageLucky) || 0,     //抽奖次数
      modalVisible: false,
      signResult: '', // 登录结果
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
      url: '/api/activities/activities',
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
        this.submitLogin(values);
      }
    });
    setTimeout(() => {
      this.ajaxFlag = true
    }, 500);
  };

  // 报名登录
  submitLogin = (values) => {

    this.props.dispatch({
      type: 'global/post',
      url: '/api/user/code_login',
      payload: {
        id: paramsObj.id,
        tel: values.tel,
        verity: values.smscode
      },
      callback: (res) => {
        if (res.code === '0') {
          this.props.dispatch(routerRedux.push(`/hdzq/activity-sign-form?activity_id=${paramsObj.id}&uid=${res.data.uid}`))
          // if(res.data.is_sign === '0') {
          //   this.props.dispatch(routerRedux.push(`/hdzq/activity-sign-form?activity_id=${paramsObj.id}&uid=${res.data.uid}`))
          // } else {
          //   Toast.info('不能重复报名', 2);
          // }
        } else {
          Toast.info(res.msg, 2);
        }
      }
    })
  };

  render() {

    const {signResult, detail} = this.state;
    const {getFieldDecorator, getFieldValue, getFieldsError} = this.props.form;

    const SignForm = (
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
                    isrepeat={'4'}
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
                立即报名
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
                立即报名
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

              <div className={styles.bg}>
                {/*<img src={require('~/assets/hdzq/lucky/theme.png')} width="100%" height="auto" alt="bg"/>*/}
                <img src={detail.image} width="100%" height="auto" alt="bg"/>
                {/*<h1>{detail.name}</h1>*/}
              </div>


              <div>
                {
                  signResult ?
                    <div className={styles.download}>
                      <a>报名成功</a>
                    </div>
                    :
                    SignForm
                }
              </div>

              <div className={styles.desc}>

                <h1>{detail.title}</h1>

                <dl>
                  <dt><i/><strong>活动时间</strong></dt>
                  <dd>{detail.start_time} ~ {detail.end_time}</dd>
                </dl>

                <dl>
                  <dt><i/><strong>活动地点</strong></dt>
                  <dd>{detail.place}</dd>
                </dl>

                {
                  detail.content ?
                    <dl>
                      <dt><i/><strong>活动介绍</strong></dt>
                      <dd>
                        <p dangerouslySetInnerHTML={{__html: detail.content}} />
                      </dd>
                    </dl>
                    :
                    null
                }

              </div>

            </div>
            :
            null
        }

      </div>
    )
  }

}

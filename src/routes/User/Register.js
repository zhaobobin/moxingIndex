import React from 'react';
import { connect } from 'dva';
import { NavLink, Link, routerRedux } from 'dva/router';
import { Form, Input, Button, Icon, Checkbox, Radio } from 'antd'
import {ENV, Storage, goBack, hasErrors, checkPhone, isPhone, checkPsdLevel, Encrypt} from "~/utils/utils";
import styles from './Register.less';

import logo from '~/assets/com/logo.png'
import SmsValidate from '~/components/Form/SmsValidate'
import { ResultAlert, ArticleAlert } from '~/components/Dialog/Dialog'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

const keys = ['mobile', 'password', 'smscode', 'invitationCode', 'xieyi'];

@connect(state => ({
  global: state.global,
}))
@Form.create()
export default class Register extends React.Component {

  constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.state = {
      loginType: 'psd',
      captcha: '',
      userType: 1,
      mobile: '',
      isRegister: false,    //手机号已注册
      psdType: 'password',
      psdLevelVisible: false,
      psdLevel: '',
      psdLevelStyle: '',
      xieyiChecked: true,
      showYaoqing: false
    }
  }

  changeUserType = (e) => {
    this.setState({
      userType: e.target.value
    })
  };

  //监控手机号输入
  onChangeMobile = (rule, value, callback) => {
    if(checkPhone(value)){
      if(!isPhone(value)) return;
      this.checkPhone(value, (res) => {
        if(res){
          callback(res);
        }else{
          callback()
        }
      })
    }else{
      callback('请输入正确的手机号！')
    }
  };

  //检查手机号是否注册
  checkPhone(mobile, cb){
    let {isRegister} = this.state;
    this.props.dispatch({
      type: 'global/post',
      url: '/api/userRegister/checkPhone',
      payload:{
        mobile: mobile
      },
      callback: (res) => {
        // 21073代表出借人登录，21074代表借款人登录
        if(res.code === 21073 || res.code === 21074){
          isRegister = true;
          Storage.set(ENV.storageLastTel, mobile);      //已注册过的手机号，保存到本地存储
          cb('此手机号已注册，请直接登录')
        }else{
          isRegister = false;
          cb()
        }
        this.setState({
          isRegister
        })
      }
    })
  }

  //已注册自动跳转到登录
  mobileInoutOnBlur = () => {
    let {isRegister} = this.state;
    if(isRegister) this.props.dispatch(routerRedux.push('/user/login'));
  };

  //检查密码强度
  checkPsd = (e) => {
    let psdLevel, psdLevelStyle, value = e.target.value;

    if(value) {
      let psdModes = checkPsdLevel(value);
      switch(psdModes){
        case 1 :
          psdLevel = '';
          psdLevelStyle = '';
          break;
        case 2 :
          psdLevel = '弱';
          psdLevelStyle = styles.psdLevelError;
          break;
        case 3 :
          psdLevel = '中';
          psdLevelStyle = styles.psdLevelMiddle;
          break;
        case 4 :
          psdLevel = '强';
          psdLevelStyle = styles.psdLevelStrong;
          break;
        default:
          psdLevel = '';
          psdLevelStyle = '';
          break;
      }
    }
    this.setState({
      psdLevel,
      psdLevelStyle
    });
  };

  //切换密码框显示
  changePsdType = (value) => {
    let psdLevelVisible = !this.state.psdLevelVisible;
    this.setState({
      psdType: value,
      psdLevelVisible
    })
  };

  //获得短信验证码
  getSmscode = (value) => {
    this.props.form.setFieldsValue({'smscode': value});
    this.props.form.validateFields(['smscode'], (err, values) => {

    });
  };

  //邀请切换
  toggleYaoqing = () => {
    let showYaoqing = !this.state.showYaoqing;
    this.setState({
      showYaoqing
    })
  };

  checkYaoqing = (rule, value, callback) => {
    if(value) {
      if(checkPhone(value)){
        callback()
      }else{
        callback('邀请码无效！')
      }
    }else{
      callback()
    }
  };

  //协议勾选
  xieyiChecked = () => {
    let xieyiChecked = !this.state.xieyiChecked;
    this.setState({
      xieyiChecked
    })
  };

  //查询协议
  queryXieyi = () => {

    if(!this.ajaxFlag) return;
    this.ajaxFlag = false;

    this.props.dispatch({
      type: 'global/post',
      url: '/api/protocol/view',
      payload: {},
      callback: (res) => {
        setTimeout(() => { this.ajaxFlag = true }, 500);
        if(res.code === 0){
          ArticleAlert({
            title: res.data.title,
            msg: res.data.content,
            btns: ['确认', '关闭'],
            callback: (res) => {
              console.log(res)
            }
          })
        }
      }
    })

  };

  //清空输入框
  emitEmpty(key){
    this.props.form.resetFields([key]);
  };

  //表单确认
  handleFormSubmit = (e) => {
    e.preventDefault();

    if(!this.ajaxFlag) return;
    this.ajaxFlag = false;

    this.props.form.validateFields(keys, (err, values) => {
      if (!err) {
        this.register(values);
      }
    });
    setTimeout(() => { this.ajaxFlag = true }, 500);
  };

  //注册提交
  register = (values) => {
    this.props.dispatch({
      type: 'global/register',
      payload:{
        mobile: values.mobile,
        password: Encrypt(values.mobile, values.password),
        smsCheckCode: values.smscode,
        userType: 1,
        invitationCode: values.invitationCode || '',
        channel: '',                                      //注册渠道
      },
      callback: (res) => {
        if(res.code === 0){
          ResultAlert({
            title: `恭喜，${res.data.mobile} 已注册成功！`,
            img: require('~/assets/com/my_login_right@2x.png'),
            msg: 's后自动登录至首页',
            time: 5,
            btns: ['立即开通银行存管'],
            callback: (r) => {
              if(r === 1){
                this.props.dispatch(routerRedux.push('/user/register-result'))
              }else{
                this.direct(res.data.cusType);
              }
            }
          })
        }else{
          ResultAlert({
            title: '抱歉，注册失败！',
            img: require('~/assets/com/my_login_wrong@2x.png'),
            msg: res.message,
            btns: ['继续注册'],
            callback: (r) => {}
          })
        }
      }
    })
  };

  //注册成功后跳转，借款端注册后跳转至账户总览
  direct = (cusType) => {
    //借款端登录后跳转至账户总览
    if(cusType === '2'){
      this.props.dispatch(routerRedux.push('/account/total'))
    }else{
      this.back();
    }
  };

  back = () => {
    let routerHistory = Storage.get(ENV.storageHistory);
    if(routerHistory){
      this.props.dispatch(routerRedux.push(routerHistory[routerHistory.length - 1]));
    }else{
      this.props.dispatch(routerRedux.push('/'));
    }
  };

  render(){

    const {
      userType, psdType, psdLevelVisible, psdLevel, psdLevelStyle,
      xieyiChecked, showYaoqing
    } = this.state;
    const { loading } = this.props;
    const { getFieldDecorator, getFieldValue, getFieldsError } = this.props.form;

    const winWidth = window.innerWidth - 30;

    return(
      <div className={styles.container}>

        <div className={styles.header}>
          <img src={logo} alt="logo"/>
          <h1>注册去投网</h1>
        </div>

        <div className={styles.formBox + " " + styles.register}>

          <Form
            onSubmit={this.handleFormSubmit}
          >
            {/*<FormItem style={{margin: 0}}>*/}
              {/*{getFieldDecorator('userType', {*/}
                {/*initialValue: userType,*/}
              {/*})(*/}
                {/*<RadioGroup className={styles.radioGroup} onChange={this.changeUserType}>*/}
                  {/*<Radio className={styles.radio} value={1}>我要出借</Radio>*/}
                  {/*<Radio className={styles.radio} value={2}>我要借款</Radio>*/}
                {/*</RadioGroup>*/}
              {/*)}*/}
            {/*</FormItem>*/}

            <FormItem>
              {getFieldDecorator('mobile', {
                validateFirst: true,
                rules: [
                  { required: true, message: '请输入手机号！' },
                  // { pattern: /^1[0-9]{10}$/, message: '请输入正确的手机号！' },
                  { validator: this.onChangeMobile },
                ],
              })(
                <Input
                  autoFocus
                  size="large"
                  type="number"
                  placeholder="请输入手机号"
                  onBlur={this.mobileInoutOnBlur}
                  suffix={
                    getFieldValue('mobile') ?
                      <Icon
                        type="close-circle"
                        className={styles.clearInput}
                        onClick={() => this.emitEmpty('mobile')}
                      />
                      :
                      null
                  }
                />
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('password', {
                validateFirst: true,
                rules: [
                  { required: true, message: '请输入密码！' },
                  { pattern: /^[A-Za-z0-9_]+$/, message: '不能输入敏感字符，只能输入下划线！' },
                  { min: 8, message: '密码长度只能在8-16位字符之间！' },
                  { max: 16, message: '密码长度只能在8-16位字符之间！' },
                  { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[A-Za-z0-9_]{8,16}$/, message: '密码不能全都是数字、字母（包括大写）、符号！' },
                ],
              })(
                <Input
                  type={psdType}
                  onFocus={() => this.changePsdType('text')}
                  onBlur={() => this.changePsdType('password')}
                  onChange={this.checkPsd}
                  placeholder="设置密码（长度8-16字符和数字）"
                  suffix={
                    <span className={styles.suffix}>
                        {
                          getFieldValue('password') ?
                            <Icon
                              type="close-circle"
                              className={styles.clearInput}
                              onClick={() => this.emitEmpty('password')}
                            />
                            :
                            null
                        }
                      {
                        psdLevelVisible && getFieldValue('password') ?
                          <div className={styles.psdStatus + " " + psdLevelStyle} style={{width: winWidth}}>
                            <p className={styles.box}>
                              <span className={styles.line}><em className={styles.block}/></span>
                              <span className={styles.line}><em className={styles.block}/></span>
                              <span className={styles.line}><em className={styles.block}/></span>
                              <span className={styles.text}>{psdLevel}</span>
                            </p>
                          </div>
                          :
                          null
                      }
                        </span>
                  }
                />
              )}
            </FormItem>

            {
              userType === 1 ?
                <div className={showYaoqing ? styles.showYaoqing : styles.hideYaoqing}>
                  <p className={styles.toggleBtn} onClick={this.toggleYaoqing}>
                    <i className={showYaoqing ? styles.rotate : null}/>
                    <span>填写邀请码（选填）</span>
                  </p>
                  <FormItem>
                    {getFieldDecorator('invitationCode', {
                      rules: [
                        { validator: this.checkYaoqing },
                      ],
                    })(
                      <Input
                        type="number"
                        placeholder="请输入邀请码"
                      />
                    )}
                  </FormItem>
                </div>
                :
                null
            }

            <FormItem>
              {getFieldDecorator('smscode', {
                validateFirst: true,
                rules: [
                  { required: true, message: '验证码不能为空！' },
                  { pattern: /^[0-9]{6}$/, message: '只能输入6位数值！' },
                ],
              })(
                <SmsValidate
                  boxStyle={{height: '50px'}}
                  inputStyle={{width: '100%'}}
                  bottonStyle={{width: '120px', minWidth: 'auto', height: '48px', lingHeight: '48px', background: 'none', borderColor: '#fff'}}
                  action="register"
                  mobile={hasErrors(getFieldsError(['mobile'])) ? '' : getFieldValue('mobile')}
                  api='/api/userRegister/sendMobileCode'
                  pintu={true}
                  callback={this.getSmscode}
                />
              )}
            </FormItem>

            <FormItem style={{border: 'none'}}>
              {getFieldDecorator('xieyi', {
                valuePropName: 'checked',
                initialValue: xieyiChecked,
              })(
                <span>
                    <Checkbox
                      checked={xieyiChecked}
                      onChange={this.xieyiChecked}
                      className={styles.checked}
                    >
                      已阅读并同意
                    </Checkbox>
                    <a onClick={this.queryXieyi}>《去投网平台注册及服务协议》</a>
                  </span>
              )}
              <Button
                loading={loading}
                type="primary"
                htmlType="submit"
                className={styles.btn}
                style={{width: '100%', height: '50px', lineHeight: '48px'}}
                disabled={
                  hasErrors(getFieldsError()) ||
                  !getFieldValue('mobile') ||
                  !getFieldValue('password') ||
                  !getFieldValue('smscode') ||
                  !getFieldValue('xieyi')
                }
              >
                注册
              </Button>
            </FormItem>

          </Form>
        </div>

        <div className={styles.download}>
          <a className={styles.link}>下载去投网APP</a>
          <p>
            <span>{ENV.icp}</span>
            <span>|</span>
            <span>{ENV.beian}</span>
          </p>
          <p><span>{ENV.address}</span></p>
        </div>

      </div>
    )
  }

}

import React from 'react';
import { connect } from 'dva';
import { NavLink, Link, routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import { Form, Input, Button, Icon, Checkbox, Radio } from 'antd'
import {
  ENV, Storage, goBack, hasErrors,
  checkPhone, isPhone, checkPsdLevel,
  Encrypt, getUrlParams, yaoqingDecrypt, filterTel
} from "~/utils/utils";
import styles from './Register.less';

//import logo from '~/assets/com/logo.png'
import sign_banner1 from '~/assets/sign/fast_login_banner1@2x.png'
import sign_banner2 from '~/assets/sign/fast_login_banner2@2x.png'
import SmsValidate from '~/components/Form/SmsValidate'

const FormItem = Form.Item;

const keys = ['mobile', 'password', 'smscode', 'invitationCode'];

const urlInviCode = getUrlParams().invitationCode || '';

@connect(state => ({
  global: state.global,
}))
@Form.create()
export default class Register extends React.Component {

  constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.phoneFlag = true;
    this.state = {
      loading: false,
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
      urlInviCode: urlInviCode ? yaoqingDecrypt(urlInviCode) : '',     //链接邀请码
      showYaoqing: !!urlInviCode,
      smscodeSended: false,       //短信验证码是否已发送
    }
  }

  //监控手机号输入
  onChangeMobile = (rule, value, callback) => {
    value = value.replace(/\D/g,'');
    this.props.form.setFieldsValue({'mobile': value});
    if(checkPhone(value)){
      callback()
    }else{
      callback('请输入正确的手机号码')
    }
  };

  //手机失焦检测
  mobileOnBlur = (e) => {
    let value = e.target.value;
    if(isPhone(value)){
      this.checkPhone(value, (res) => {
        if(!res) return;
        this.props.form.setFields({
          'mobile': {
            value: value,
            errors: [new Error(res)]
          }
        })
      })
    }else{
      this.props.form.setFields({
        'mobile': {
          value: value,
          errors: [new Error('请输入正确的手机号')]
        }
      })
    }
  };

  //检查手机号是否注册
  checkPhone(mobile, cb){

    if(!this.phoneFlag) return;
    this.phoneFlag = false;

    let {isRegister} = this.state;

    this.props.dispatch({
      type: 'global/post',
      url: '/api/userRegister/checkPhone',
      payload:{
        mobile: mobile,
        platformType: 1,
      },
      callback: (res) => {

        if(!res) return;
        if(res.code === 21010){           // 21010手机号未注册，21073代表借款人，21074代表出借人
          isRegister = false;
          cb()
        }
        else if(res.code === 21073){
          isRegister = true;
          Storage.set(ENV.storageLastTel, mobile);      //已注册过的手机号，保存到本地存储
          cb('您当前的身份为借款人');
        }
        else if(res.code === 21074){
          isRegister = true;
          Storage.set(ENV.storageLastTel, mobile);      //已注册过的手机号，保存到本地存储
          cb('您当前的身份为出借人');
        }
        else{
          isRegister = true;
          Storage.set(ENV.storageLastTel, mobile);      //已注册过的手机号，保存到本地存储
          cb('此手机号已注册，请直接登录');
        }
        this.setState({
          isRegister
        });

      }
    });

    setTimeout(() => { this.phoneFlag = true }, 500);

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

  //切换密码强度显示
  changePsdLevel = () => {
    let psdLevelVisible = !this.state.psdLevelVisible;
    this.setState({
      psdLevelVisible
    })
  };

  //切换密码框显示
  changePsdType = () => {
    let {psdType} = this.state;
    this.setState({
      psdType: psdType === 'password' ? 'text' : 'password',
    })
  };

  //获得短信验证码
  getSmscode = (value) => {
    //清空错误提示
    if(value === 'clearError'){
      this.props.form.setFields({
        'smscode': {
          value: '',
          errors: ''
        }
      });
      this.setState({smscodeSended: true});
    }else{
      this.props.form.setFieldsValue({'smscode': value});
      this.props.form.validateFields(['smscode'], (err, values) => {});
    }
  };

  //邀请切换
  toggleYaoqing = () => {
    let showYaoqing = !this.state.showYaoqing;
    this.setState({
      showYaoqing
    })
  };

  checkYaoqing = (rule, value, callback) => {
    if(value && !this.state.urlInviCode) {
      value = value.replace(/\D/g,'');
      this.props.form.setFieldsValue({'invitationCode': value});
      if(checkPhone(value)){
        callback()
      }else{
        callback('请输入正确的邀请人手机号码')
      }
    }else{
      callback()
    }
  };

  //邀请码失焦检测
  yaoqingOnBlur = (e) => {
    let value = e.target.value;
    if(!value) return;
    if(!isPhone(value)){
      this.props.form.setFields({
        'invitationCode': {
          value: value,
          errors: [new Error('请输入正确的邀请人手机号码')]
        }
      })
    }
  };

  //协议勾选
  xieyiChecked = () => {
    let xieyiChecked = !this.state.xieyiChecked;
    this.setState({
      xieyiChecked
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
    let {urlInviCode} = this.state;
    this.props.dispatch({
      type: 'global/register',
      payload:{
        mobile: values.mobile,
        password: Encrypt(values.mobile, values.password),
        smsCheckCode: values.smscode,
        userType: 1,
        invitationCode: urlInviCode || values.invitationCode,
        channel: '',                                      //注册渠道
      },
      callback: (res) => {
        if(res.code === 0){
          this.props.dispatch(routerRedux.push('/user/register-result'))
        }else{
          Toast.info(res.message, 2);
        }
      }
    })
  };

  render(){

    const {
      userType, psdType, psdLevelVisible, psdLevel, psdLevelStyle,
      xieyiChecked, showYaoqing, loading, smscodeSended, urlInviCode
    } = this.state;
    const { getFieldDecorator, getFieldValue, getFieldsError } = this.props.form;

    const winWidth = window.innerWidth - 30;

    return(
      <div className={styles.container}>

        {/*<div className={styles.header}>*/}
          {/*<img src={logo} alt="logo"/>*/}
          {/*<h1>注册去投网</h1>*/}
        {/*</div>*/}

        <div className={styles.banner}>
          <img src={sign_banner2} alt=""/>
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
                  { required: true, message: '请输入手机号码' },
                  { validator: this.onChangeMobile },
                  //{ pattern: /^1[0-9]{10}$/, message: '请输入正确的手机号' },
                ],
              })(
                <Input
                  autoFocus
                  size="large"
                  maxLength="11"
                  autoComplete="off"
                  placeholder="请输入手机号码"
                  onBlur={this.mobileOnBlur}
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
                  { required: true, message: '请输入登录密码' },
                  { min: 8, message: '请输入8-16位字母、数字或符号的组合' },
                  { max: 16, message: '请输入8-16位字母、数字或符号的组合' },
                  // { pattern: /^[A-Za-z0-9_]+$/, message: '不能输入敏感字符，只能输入下划线' },
                  // { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[A-Za-z0-9_]{8,16}$/, message: '请输入8-16位字母、数字或符号的组合' },
                ],
              })(
                <Input
                  type={psdType}
                  autoComplete="off"
                  maxLength="16"
                  onFocus={this.changePsdLevel}
                  onBlur={this.changePsdLevel}
                  onChange={this.checkPsd}
                  placeholder="8-16位字母、数字或字符的组合"
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
                      <em className={styles.inputEye}>
                        <i
                          className={psdType === 'password' ? styles.close : styles.open}
                          onClick={this.changePsdType}
                        />
                      </em>
                      {/*<Icon*/}
                        {/*type={psdType === 'password' ? 'eye-invisible' : 'eye'}*/}
                        {/*className={styles.inputEye}*/}
                        {/*onClick={this.changePsdType}*/}
                      {/*/>*/}
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

            <FormItem>
              {getFieldDecorator('smscode', {
                validateFirst: true,
                rules: [
                  { required: true, message: '请输入短信验证码' },
                  { pattern: /^[0-9]{6}$/, message: '短信验证码错误' },
                ],
              })(
                <SmsValidate
                  boxStyle={{height: '50px'}}
                  inputStyle={{width: '100%'}}
                  bottonStyle={{width: '120px', minWidth: 'auto', height: '48px', lingHeight: '48px', background: 'none', borderColor: '#fff'}}
                  action="register"
                  mobile={hasErrors(getFieldsError(['mobile'])) ? '' : getFieldValue('mobile')}
                  api='/api/userRegister/sendMobileCode'
                  callback={this.getSmscode}
                />
              )}
            </FormItem>

            <div className={showYaoqing ? styles.showYaoqing : styles.hideYaoqing}>
              <p className={styles.toggleBtn} onClick={this.toggleYaoqing}>
                <i className={showYaoqing ? styles.rotate : null}/>
                <span>填写邀请码（选填）</span>
              </p>
              <FormItem>
                {getFieldDecorator('invitationCode', {
                  initialValue: urlInviCode ? filterTel(urlInviCode) : '',
                  rules: [
                    { validator: this.checkYaoqing },
                    //{ pattern: /^1[0-9]{10}$/, message: '请输入正确的邀请人手机号' },
                  ],
                })(
                  <Input
                    maxLength="11"
                    autoComplete="off"
                    placeholder="请输入邀请人手机号码"
                    onBlur={this.yaoqingOnBlur}
                    disabled={!!urlInviCode}
                    suffix={
                      getFieldValue('invitationCode') && !urlInviCode ?
                        <Icon
                          type="close-circle"
                          className={styles.clearInput}
                          onClick={() => this.emitEmpty('invitationCode')}
                        />
                        :
                        null
                    }
                  />
                )}
              </FormItem>
            </div>

            <FormItem style={{border: 'none'}}>
              {/*{getFieldDecorator('xieyi', {*/}
                {/*valuePropName: 'checked',*/}
                {/*initialValue: xieyiChecked,*/}
              {/*})(*/}
                {/**/}
              {/*)}*/}
              <div>
                <p className={styles.xieyi}>
                  <span>注册即表示已阅读并同意</span>
                  <Link to="/xieyi/49">《去投网用户注册协议》</Link>
                </p>
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
                    smscodeSended === false
                  }
                >
                  注册
                </Button>
              </div>
            </FormItem>

          </Form>
        </div>

        <dl className={styles.signDesc}>
          <dt>为什么选择去投网</dt>
          <dd>
            <ul>
              <li>
                <p>
                  <img src={require('~/assets/sign/home_icon1@2x.png')} alt=""/>
                  <span>廊坊银行资金存管</span>
                </p>
              </li>
              <li>
                <p>
                  <img src={require('~/assets/sign/home_icon2@2x.png')} alt=""/>
                  <span>合规运营 真实透明</span>
                </p>
              </li>
              <li>
                <p>
                  <img src={require('~/assets/sign/home_icon3@2x.png')} alt=""/>
                  <span>多重审核 风控闭环</span>
                </p>
              </li>
              <li>
                <p>
                  <img src={require('~/assets/sign/home_icon4@2x.png')} alt=""/>
                  <span>三级备案 数据加密</span>
                </p>
              </li>
            </ul>
          </dd>
        </dl>

        <div className={styles.download}>
          {/*<Link to="/download" className={styles.link}>下载去投网APP</Link>*/}
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

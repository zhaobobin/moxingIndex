import React from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { Toast } from 'antd-mobile';
import { Form, Input, Button, Icon, Checkbox, Radio } from 'antd'
import {
  ENV, Storage, goBack, hasErrors,
  checkPhone, isPhone, checkPsdLevel,
  Encrypt, getUrlParams, yaoqingDecrypt, filterTel
} from "~/utils/utils";
import styles from './Login.less'

import PintuValidate from '~/components/Form/PintuValidate'

const FormItem = Form.Item;
const keys1 = ['account', 'password', 'pintu'];
const keys2 = ['account', 'password'];

@connect(state => ({
  global: state.global,
}))
@Form.create()
export default class Login extends React.Component {

  constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.state = {
      loading: false,
      lastTel: Storage.get(ENV.storageRemenber) && Storage.get(ENV.storageLastTel, 432000) ? Storage.get(ENV.storageLastTel, 432000) : '',          //保存的手机号5天过期
      remember: Storage.get(ENV.storageRemenber) !== null ? Storage.get(ENV.storageRemenber) : true,
      psdType: 'password',
      captcha: '',
      pintuNo: new Date().getTime(),
      errorNum: 0,         //登录错误次数
    }
  }

  //监控手机号输入
  onChangeMobile = (rule, value, callback) => {
    value = value.replace(/\D/g,'');
    this.props.form.setFieldsValue({'account': value});
    if(checkPhone(value)){
      callback()
    }else{
      callback('请输入正确的手机号码')
    }
  };

  //手机失焦检测
  mobileOnBlur = (e) => {
    let value = e.target.value;
    if(value){
      if(isPhone(value)){
        this.checkPhone(value, (res) => {
          if(!res) return;
          this.props.form.setFields({
            'account': {
              value: value,
              errors: [new Error(res)]
            }
          })
        })
      }else{
        this.props.form.setFields({
          'account': {
            value: value,
            errors: [new Error('请输入正确的手机号码')]
          }
        })
      }
    }else{
      this.props.form.setFields({
        'account': {
          value: value,
          errors: [new Error('请输入手机号码')]
        }
      })
    }

  };

  //检查手机号是否注册
  checkPhone(mobile, cb){

    if(!this.phoneFlag) return;
    this.phoneFlag = false;

    this.props.dispatch({
      type: 'global/post',
      url: '/api/userRegister/checkPhone',
      payload:{
        mobile: mobile
      },
      callback: (res) => {

        if(!res) return;
        if(res.code === 21010){       //未注册
          cb('此手机号未注册')
        }else{
          //Storage.set(ENV.storageLastTel, mobile);      //已注册过的手机号，保存到本地存储
          cb();
        }

      }
    });

    setTimeout(() => { this.phoneFlag = true }, 500);
  }

  //切换密码框显示
  changePsdType = () => {
    let {psdType} = this.state;
    this.setState({
      psdType: psdType === 'password' ? 'text' : 'password',
    })
  };

  //记住登录账号
  rememberChange = (e) => {
    let checked = e.target.checked,
      mobile = this.props.form.getFieldValue('account');
    Storage.set(ENV.storageRemenber, checked);
    if(checked){
      Storage.set(ENV.storageLastTel, mobile);
    }else{
      Storage.remove(ENV.storageLastTel);
    }
  };

  //清空输入框
  emitEmpty(key){
    this.props.form.resetFields([key]);
  };

  //表单确定
  handleFormSubmit = (e) => {
    e.preventDefault();

    if(!this.ajaxFlag) return;
    this.ajaxFlag = false;

    const {errorNum} = this.state;
    const keys = errorNum > 5 ? keys1 : keys2;
    this.props.form.validateFields(keys, (err, values) => {
      if (!err) {
        this.login(values);
      }
    });
    setTimeout(() => { this.ajaxFlag = true }, 500);
  };

  //登录提交
  login = (values) => {

    this.setState({loading: true});

    this.props.dispatch({
      type: 'global/login',
      payload:{
        account: values.account,
        password: Encrypt(values.account, values.password),
        platform: 'pc',
      },
      callback: (res) => {
        this.setState({loading: false});
        if(res.code === 0){
          Storage.set(ENV.storageLastTel, values.account);      //手机号保存到本地存储
          this.direct(res.data.cusType);
        }else{
          //登录失败，重置表单和拼图
          Storage.remove(ENV.storageLastTel);
          this.props.form.resetFields(['password', 'pintu']);
          this.setState({pintuNo: new Date().getTime(), errorNum: this.state.errorNum + 1});
          Toast.info(res.message);
        }
      }
    })
  };

  //拼图回调
  pintuResult = (value) => {
    this.props.form.setFieldsValue({'pintu': value});
  };

  //登录成功后跳转，借款端登录后跳转至账户总览
  direct = (cusType) => {
    //出借端登录后跳转至首页，其他到账户总览
    if(cusType === '1'){
      this.props.dispatch(routerRedux.push('/'))
    }else{
      this.props.dispatch(routerRedux.push('/account'));
    }
  };

  render(){

    const { lastTel, psdType, pintuNo, loading, errorNum } = this.state;
    const { getFieldDecorator, getFieldValue, getFieldsError } = this.props.form;
    const keys = errorNum > 5 ? keys1 : keys2;

    return(
      <div className={styles.login}>

        <Form
          onSubmit={this.handleFormSubmit}
        >
          <FormItem>
            {getFieldDecorator('account',
              {
                initialValue: lastTel,
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
                  getFieldValue('account') ?
                    <Icon
                      type="close-circle"
                      className={styles.clearInput}
                      onClick={ () => {
                        lastTel ?
                          this.setState({lastTel: ''})
                          :
                          this.emitEmpty('account')
                      } }
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
                //{ pattern: /^[A-Za-z0-9_]+$/, message: '不能输入敏感字符，只能输入下划线' },
                { min: 6, message: '密码长度只能在6-16位字符之间' },
                { max: 16, message: '密码长度只能在6-16位字符之间' },
              ],
            })(
              <Input
                type={psdType}
                autoComplete="off"
                maxLength="30"
                // onFocus={() => this.changePsdType('text')}
                // onBlur={() => this.changePsdType('password')}
                placeholder="请输入登录密码"
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
                  </span>
                }
              />
            )}
          </FormItem>

          {
            errorNum > 5 ?
              <FormItem style={{marginBottom: '10px'}}>
                {getFieldDecorator('pintu', {
                  rules: [
                    { required: true, message: '请完成拼图' },
                  ],
                })(
                  <PintuValidate no={pintuNo} callback={this.pintuResult}/>
                )}
              </FormItem>
              :
              null
          }


          <div>
            <p className={styles.desc}>！完成登录后，将为您开启免登录功能</p>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              className={styles.submit}
              style={{width: '100%', height: '50px', lineHeight: '48px'}}
              disabled={
                hasErrors(getFieldsError(keys)) ||
                !getFieldValue('account') ||
                !getFieldValue('password') ||
                errorNum > 5 ? !getFieldValue('pintu') : null
              }
            >
              授权登录
            </Button>
            <p className={styles.btns}>
              <Link className={styles.forgotPsd} to="/user/reset/index">忘记密码？</Link>
              <Link className={styles.register} to="/user/register">注册</Link>
            </p>
          </div>

        </Form>

      </div>
    )
  }

}

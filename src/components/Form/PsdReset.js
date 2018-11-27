/**
 * 重置密码 - 登录密码 或 交易密码
 * psdType [String] 密码类型
 * step [String]   Steps组件初始化
 */
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Form, Input, Button, Icon, Steps } from 'antd'
import { hasErrors, checkPhone, isPhone, checkPsdLevel, Encrypt, filterTel } from '~/utils/utils'
import styles from './PsdReset.less';

import PintuValidate from '~/components/Form/PintuValidate'
import SmsValidate from '~/components/Form/SmsValidate'
import { ResultAlert } from '~/components/Dialog/Dialog'

const FormItem = Form.Item;
const Step = Steps.Step;
//const keys = ['mobile', 'pintu', 'smscode', 'password', 'rpassword'];
const btnStyle = {display: 'block', width: '360px', height: '50px', lineHeight: '48px', margin: '0 auto'};

const steps = [
  {
    title: '填写用户信息',
    key: 'index',
    content: 'First-content',
  },
  {
    title: '验证用户信息',
    key: 'smscode',
    content: 'Second-content',
  },
  {
    title: '重置密码',
    key: 'password',
    content: 'Thrid-content',
  },
  {
    title: '完成',
    key: 'finish',
    content: 'Last-content',
  }
];

@connect(state => ({
  global: state.global,
}))
@Form.create()
export default class Reset extends React.Component {

  constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.state = {
      current: 0,
      disabled: true,
      mobile: '',
      pintu: '',
      pintuNo: new Date().getTime(),          //拼图序列号
      smsCheckCode: '',
      password: '',
      rpassword: '',
      psdType1: 'text',
      psdType2: 'password',
      psdLevelVisible: true,
      psdLevel: '',
      psdLevelStyle: '',
      autoSubmitTimer: 5,
    }
  }

  componentDidMount(){
    let step = this.props.step;
    this.initStep(step);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.step !== this.props.step) {
      let step = nextProps.step;
      this.initStep(step);
    }
  }

  //清空输入框
  emitEmpty(key){
    this.props.form.resetFields([key]);
    if(key === 'mobile') this.setState({mobile: ''});
  };

  //初始化步骤条
  initStep = (step) => {
    for(let i in steps){
      if(steps[i].key === step) this.setState({current: parseInt(i)})
    }
  };

  //监控手机号输入
  onChangeMobile = (rule, value, callback) => {
    if(checkPhone(value)){
      if(!isPhone(value)) return;
      this.checkPhone(value, (res) => {
        if(res){
          callback(res);
          this.setState({mobile: ''});
        }else{
          callback();
          this.setState({mobile: value});
        }
      })
    }else{
      callback('请输入正确的手机号！')
    }
  };

  //检查手机号是否注册
  checkPhone(mobile, cb){
    this.props.dispatch({
      type: 'global/post',
      url: '/api/userRegister/checkPhone',
      payload:{
        mobile: mobile
      },
      callback: (res) => {
        if(res.code === 21010){
          cb('此手机号未注册！')
        }else{
          cb()
        }
      }
    })
  }

  //拼图
  pintuResult = (value) => {
    this.props.form.setFieldsValue({'pintu': value});
  };

  //获得短信验证码
  getSmscode = (value) => {
    this.props.form.setFieldsValue({'smscode': value});
    this.props.form.validateFields(['smscode'], (err, values) => {
      if(!err){
        this.setState({
          smsCheckCode: values.smscode
        })
      }
    });
  };

  //step 2 - 输入验证码
  next = () => {
    const current = this.state.current + 1;
    let step = steps[current].key;
    this.props.dispatch(routerRedux.push(`/user/reset/${step}`))
  };

  //step 3 - 修改密码
  changePsdSubmit = (e) => {
    e.preventDefault();

    if(!this.ajaxFlag) return;
    this.ajaxFlag = false;

    let { mobile, smsCheckCode } = this.state;

    this.props.form.validateFields(['password', 'rpassword'], (err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'global/post',
          url: '/api/userAuth/forgetPwd',
          payload:{
            account: mobile,
            smsCheckCode: smsCheckCode,
            newPassword: Encrypt(mobile, values.password),
            affirmPassword: Encrypt(mobile, values.rpassword),
          },
          callback: (res) => {
            setTimeout(() => { this.ajaxFlag = true }, 500);
            if(res.code === 0){
              this.props.dispatch(routerRedux.push('/user/reset/finish'))
            }else{
              //修改失败，重置表单和拼图
              //this.props.form.resetFields();
              //this.setState({pintuNo: new Date().getTime()});
              ResultAlert({
                title: '修改失败',
                img: require('~/assets/com/login_right@2x.png'),
                msg: res.message,
                btns: ['确定'],
                callback: (r) => {
                  //验证码错误、过期
                  this.props.dispatch(routerRedux.push('/user/reset/index'))
                }
              })
            }
          }
        })
      }
    });

  };

  //比对密码
  checkConfirm = (rule, value, callback) => {
    if(value && value !== this.props.form.getFieldValue('password')){
      callback('您输入的密码不一致')
    }else{
      callback()
    }
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
  changePsdType1 = (value) => {
    let psdLevelVisible = !this.state.psdLevelVisible;
    this.setState({
      psdType1: value,
      psdLevelVisible
    })
  };

  changePsdType2 = (value) => {
    this.setState({
      psdType2: value,
    })
  };

  //step 4 - 自动执行
  autoSubmit = () => {
    let {autoSubmitTimer} = this.state;
    let timer = setInterval(() => {
      if(autoSubmitTimer === 1){
        clearInterval(timer);
        this.toLogin();
      }else{
        autoSubmitTimer--;
        this.setState({autoSubmitTimer})
      }
    }, 1000)
  };

  //去登录
  toLogin = () => {
    this.props.dispatch(routerRedux.push('/user/login'))
  };

  render(){

    const {
      mobile, current, autoSubmitTimer, pintuNo,
      psdType1, psdType2, psdLevelVisible, psdLevel, psdLevelStyle
    } = this.state;
    const { loading } = this.props;
    const { getFieldDecorator, getFieldValue, getFieldsError } = this.props.form;

    steps[0].content = (
      <div className={styles.step1}>
        <div className={styles.formItemBox}>
          <FormItem>
            {getFieldDecorator('mobile', {
              initialValue: mobile,
              validateFirst: true,
              rules: [
                { required: true, message: '请输入手机号！' },
                { validator: this.onChangeMobile },
              ],
            })(
              <Input
                autoFocus
                type="number"
                placeholder="手机号"
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
            {getFieldDecorator('pintu', {
              rules: [
                { required: true, message: '请完成拼图！' },
              ],
            })(
              <PintuValidate no={pintuNo} callback={this.pintuResult}/>
            )}
          </FormItem>
        </div>
      </div>
    );

    steps[1].content = (
      <div className={styles.step2}>
        <div className={styles.desc}>
          <p>已将短信验证码发送到您{filterTel(mobile)}的手机当中，请注意查收！</p>
        </div>
        <div className={styles.formItemBox}>
          <FormItem>
            {getFieldDecorator('smscode', {
              validateFirst: true,
              rules: [
                { required: true, message: '验证码不能为空！' },
                { pattern: /^[0-9]{6}$/, message: '只能输入6位数值！' },
              ],
            })(
              <SmsValidate
                auto={true}
                boxStyle={{height: '50px'}}
                inputStyle={{width: '215px'}}
                bottonStyle={{width: '135px', height: '50px', lingHeight: '50px'}}
                action="reset"
                mobile={mobile}
                api='/api/userAuth/sendMobileCode'
                callback={this.getSmscode}
              />
            )}
          </FormItem>
        </div>
      </div>
    );

    steps[2].content = (
      <div className={styles.step3}>
        <div className={styles.formItemBox}>
          <FormItem>
            {getFieldDecorator('password', {
              validateFirst: true,
              rules: [
                { required: true, message: '请输入新密码！' },
                { min: 8, message: '密码长度只能在8-16位字符之间！' },
                { max: 16, message: '密码长度只能在8-16位字符之间！' },
                { pattern: /^[A-Za-z0-9~!@#$%^&*()_-]+$/, message: '不能输入敏感字符，如尖括号、百分号等！' },
                { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[A-Za-z0-9~!@#$%^&*()_-]{8,16}$/, message: '密码不能全都是数字、字母（包括大写）、符号！' },
              ],
            })(
              <Input
                type={psdType1}
                onFocus={() => this.changePsdType1('text')}
                onBlur={() => this.changePsdType1('password')}
                onChange={this.checkPsd}
                placeholder="请输入新密码"
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
                        <div className={styles.psdStatus + " " + psdLevelStyle} style={{width: '360px'}}>
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
            {getFieldDecorator('rpassword', {
              rules: [
                { required: true, message: '请输入确认密码！' },
                { validator: this.checkConfirm }
              ],
            })(
              <Input
                type={psdType2}
                onFocus={() => this.changePsdType2('text')}
                onBlur={() => this.changePsdType2('password')}
                placeholder="请输入确认密码"
                suffix={
                  <span className={styles.suffix}>
                    {
                      getFieldValue('rpassword') ?
                        <Icon
                          type="close-circle"
                          className={styles.clearInput}
                          onClick={() => this.emitEmpty('rpassword')}
                        />
                        :
                        null
                    }
                  </span>
                }
              />
            )}
          </FormItem>
        </div>
      </div>
    );

    steps[3].content = (
      <div className={styles.step4}>
        <div className={styles.desc}>
          <p className={styles.p1}>恭喜您成功找回密码！您需要重新登录系统。</p>
          <p className={styles.p2}><span>{autoSubmitTimer}</span>s后将自动跳转到登录页面</p>
        </div>
      </div>
    );

    return(

      <div className={styles.psdReset}>
        <h1>找回密码</h1>

        <Form className={styles.form}>
          <Steps current={current} labelPlacement="vertical">
            {steps.map(item => <Step key={item.key} title={item.title} />)}
          </Steps>

          <div className={styles.formContent}>
            <div className={styles.stepsContent}>
              {steps[current].content}
            </div>

            <FormItem>
              {
                current === 0 ?
                  <Button
                    type="primary"
                    className={styles.btn}
                    style={btnStyle}
                    onClick={this.next}
                    disabled={hasErrors(getFieldsError(['mobile'])) || !getFieldValue('mobile') || !getFieldValue('pintu')}
                  >
                    下一步
                  </Button>
                  :
                  null
              }

              {
                current === 1 ?
                  <Button
                    type="primary"
                    className={styles.btn}
                    style={btnStyle}
                    onClick={this.next}
                    disabled={hasErrors(getFieldsError(['smscode'])) || !getFieldValue('smscode')}
                  >
                    下一步
                  </Button>
                  :
                  null
              }

              {
                current === 2 ?
                  <Button
                    loading={loading}
                    type="primary"
                    className={styles.btn}
                    style={btnStyle}
                    onClick={this.changePsdSubmit}
                    disabled={
                      hasErrors(getFieldsError(['password', 'rpassword'])) ||
                      !getFieldValue('password') ||
                      !getFieldValue('rpassword')
                    }
                  >
                    下一步
                  </Button>
                  :
                  null
              }

              {
                current === 3 ?
                  <Button
                    type="primary"
                    className={styles.btn}
                    style={btnStyle}
                    onClick={this.toLogin}
                  >
                    立即登录
                    {this.autoSubmit()}
                  </Button>
                  :
                  null
              }
            </FormItem>
          </div>
        </Form>
      </div>

    )
  }

}

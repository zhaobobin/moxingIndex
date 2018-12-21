/**
 * 短信验证码
 * auto [String]    自动发送
 * mobile [Number] 手机号
 * action [String]  动作
 * api [String]     接口
 * callback [Function] 返回输入值
 */
import React from 'react';
import { connect } from 'dva';
import { Input, Button, Icon, notification } from 'antd'
import { Encrypt, filterTel } from '~/utils/utils'
import styles from './SmsValidate.less'

let timer;
const buttonStyle = {width: '160px', height: '40px', lineHeight: '40px'};

@connect(state => ({
  global: state.global,
}))
export default class SmsValidate extends React.Component {

  constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.state = {
      mobile: '',
      value: '',                    //输入框文本
      btnStyle: styles.null,
      btnText: '获取验证码',
      sendNum: 0,                  //已发送次数
    }
  }

  componentDidMount(){
    this.initBtnStyle(this.props.mobile);
    if(this.props.auto) this.querySmscode();      //自动发送验证码
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //按钮在激活状态，才重置倒计时
    if (nextProps.mobile !== this.props.mobile && this.state.btnStyle !== styles.disabled) {
      this.initBtnStyle(nextProps.mobile);
    }
  }

  componentWillUnmount(){
    clearInterval(timer);
  }

  //初始化按钮样式
  initBtnStyle(mobile){
    let btnStyle = mobile ? styles.actived : styles.null;
    this.setState({
      mobile,
      btnStyle,
    })
  }

  //改变输入值
  changeValue = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g,'');
    this.setState({ value });
    this.props.callback(value);
  };

  //清空输入框
  emitEmpty(){
    this.setState({ value: '' });
    this.props.callback('clearError');
  };

  //查询拼图
  queryPintu = (type) => {

    if(!this.ajaxFlag) return;
    this.ajaxFlag = false;

    if(this.state.btnStyle !== styles.actived) return;

    let {mobile} = this.props;
    this.props.dispatch({
      type: 'global/post',
      url: '/api/userRegister/getCheckImg',
      payload:{
        mobile,
      },
      callback: (res) => {
        if(res.code === 0){

          if(type === 'sms'){
            this.querySmscode(res.data.num)
          }else{
            this.queryYuyinSmscode(res.data.num)
          }

        }
      }
    });

    setTimeout(() => { this.ajaxFlag = true }, 1000);

  };

  //发送短信验证码
  querySmscode = (sendNum) => {

    let params = {},
      {action, mobile, api} = this.props;

    if(action === 'register'){
      params = {
        mobile,
        smsCheckCode: Encrypt(mobile, mobile)
      }
    }else{
      params = {
        mobile,
        checkCode: Encrypt(mobile, mobile)
      }
    }

    this.props.dispatch({
      type: 'global/post',
      url: api,
      payload: params,
      callback: (res) => {

        if(res.code === 0){
          this.setState({
            value: '',
            sendNum,
          });
          this.interval();                                //发送成功后，执行倒计时
          this.props.callback('clearError');              //通知父组件清空错误提示
          notification.success({
            message: '验证码发送成功',
            description: `已将短信验证码发送到您${filterTel(mobile)}的手机当中，请注意查收！`
          });
        }else{
          notification.error({
            message: res.message
          });
        }
      }
    });

  };

  //发送语音短信验证码
  queryYuyinSmscode = (sendNum) => {

    let {mobile} = this.props;

    if(!mobile) return;

    this.props.dispatch({
      type: 'global/post',
      url: '/api/userRegister/sendVoiceCode',
      payload: {
        mobile,
        smsCheckCode: Encrypt(mobile, mobile)
      },
      callback: (res) => {

        if(res.code === 0){
          this.setState({
            value: '',
            sendNum,
          });
          this.interval();                    //发送成功后，执行倒计时
          notification.success({
            message: '验证码发送成功',
            description: `已将短信验证码发送到您${filterTel(mobile)}的手机当中，请注意查收！`
          });
        }else{
          notification.error({
            message: res.message
          });
        }
      }
    });
  };

  //倒计时
  interval(){
    let num = 60;
    this.setState({btnText: '重新发送(' + num + 's)', btnStyle: styles.disabled});
    timer = setInterval(() => {
      if(num === 1){
        this.setState({btnText: '再次发送', btnStyle: styles.actived});
        clearInterval(timer)
      }else{
        num--;
        this.setState({btnText: '重新发送(' + num + 's)'});
      }
    }, 1000)
  }

  render(){

    const { value, btnStyle, btnText, sendNum } = this.state;

    return(
      <div className={styles.smscode} style={this.props.boxStyle || null}>
        <Input
          size="large"
          maxLength="6"
          autoComplete="off"
          style={this.props.inputStyle || null}
          value={value}
          placeholder="请输入短信验证码"
          onChange={this.changeValue}
          suffix={
            value ?
              <Icon
                type="close-circle"
                className={styles.clearInput}
                onClick={() => this.emitEmpty()}
              />
              :
              null
          }
        />
        <div className={styles.btns}>
          <a
            className={styles.btn + " " + btnStyle}
            // disabled={btnStyle !== styles.actived}
            onClick={() => this.queryPintu('sms')}
          >
            <span className={sendNum > 0 ? styles.showYuyin : null}>{btnText}</span>
          </a>
          {
            sendNum > 0 ?
              <span className={styles.yuyin} onClick={() => this.queryPintu('yuyin')}>
                <i/>
              </span>
              :
              null
          }
        </div>
      </div>
    )
  }

}

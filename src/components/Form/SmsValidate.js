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
const bottonStyle = {width: '160px', height: '40px', lineHeight: '38px'};

@connect(state => ({
  global: state.global,
}))
export default class SmsValidate extends React.Component {

  constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.state = {
      mobile: '',
      value: '',
      btnStyle: styles.null,
      btnText: '获取验证码'
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
    this.setState({ value });
    this.props.callback(value);
  };

  //清空输入框
  emitEmpty(){
    this.setState({ value: '' });
  };

  //查询拼图
  queryPintu = () => {
    let {mobile} = this.props;
    this.props.dispatch({
      type: 'global/post',
      url: '/api/userRegister/getCheckImg',
      payload:{
        mobile: mobile
      },
      callback: (res) => {
        if(res.code === 0){
          this.querySmscode()
        }
      }
    })
  };

  //查询短信验证码
  querySmscode = () => {

    if(!this.ajaxFlag) return;
    this.ajaxFlag = false;

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
        setTimeout(() => { this.ajaxFlag = true }, 500);
        if(res.code === 0){
          //发送成功后，执行倒计时
          this.interval();
          this.setState({ value: '' });
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
    this.setState({btnText: '重新发送(' + num + '秒)', btnStyle: styles.disabled});
    timer = setInterval(() => {
      if(num === 1){
        this.setState({btnText: '再次发送', btnStyle: styles.actived});
        clearInterval(timer)
      }else{
        num--;
        this.setState({btnText: '重新发送(' + num + '秒)'});
      }
    }, 1000)
  }

  render(){

    const { value, btnStyle, btnText } = this.state;

    return(
      <div className={styles.smscode} style={this.props.boxStyle || null}>
        <Input
          size="large"
          type="number"
          style={this.props.inputStyle || null}
          value={value}
          placeholder="手机验证码"
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
        <Button
          style={this.props.bottonStyle || bottonStyle}
          className={styles.btn + " " + btnStyle}
          disabled={btnStyle !== styles.actived}
          onClick={this.props.pintu ? this.queryPintu : this.querySmscode}
        >
          {btnText}
        </Button>
      </div>
    )
  }

}

/**
 * 填写报名信息
 * http://www.moxinga.com/hdzq/activity-sign-form?id=22&uid=5688&platform=h5
 */
import React from 'react'
import {connect} from 'dva';
import {Link, routerRedux} from 'dva/router'
import {Form, Icon, Button, Input, Select} from 'antd'
import {InputItem, List,  DatePicker, Picker, Modal, Toast} from 'antd-mobile';
import {ENV, Storage, hasErrors, getUrlParams, setupWebViewJavascriptBridge} from "~/utils/utils";
import moment from 'moment';
import styles from './ActivitySignForm.less'

import zhCN from 'antd-mobile/lib/date-picker/locale/zh_CN';
import cityOptions from '~/components/Form/CityOptions';

const FormItem = Form.Item;
const paramsObj = getUrlParams() || '';

@connect(state => ({
  global: state.global,
}))
@Form.create()
export default class ActivitySignForm extends React.Component {

  constructor(props) {
    super(props);
    this.ajaxFlag = true;
    this.state = {
      signDetail: ''
    }
  }

  componentDidMount(){
    this.queryFormFields();
  }

  queryFormFields(){
    this.props.dispatch({
      type: 'global/post',
      url: '/api/activities/sign',
      payload: {
        id: paramsObj.id,
      },
      callback: (res) => {
        if (res.code === '0') {
          this.setState({
            signDetail: res.data
          })
        } else {
          Toast.info(res.msg, 2);
        }
      }
    })
  }

  //表单确认
  handleFormSubmit = (e) => {
    e.preventDefault();

    if (!this.ajaxFlag) return;
    this.ajaxFlag = false;

    this.props.form.validateFields('', (err, values) => {
      console.log(values)
      if (!err) {
        values.birthday = moment(values.birthday).format('YYYY-MM-DD');   //生日
        values.gender = values.gender[0];
        values.tel = values.tel.replace(' ', '');
        values.group = values.group[0];
        values.area = values.area.join('-');
        values.leader_tel = values.leader_tel.replace(' ', '');
        this.submit(values);
      }
    });

    setTimeout(() => {
      this.ajaxFlag = true
    }, 500);
  };

  submit = (values) => {
    this.props.dispatch({
      type: 'global/post',
      url: '/api/activities/create',
      payload: {
        activity_id: paramsObj.id,
        uid: paramsObj.uid,
        type: '1',
        ...values
      },
      callback: (res) => {
        if (res.code === '0') {

        } else {
          Toast.info(res.msg, 2);
        }
      }
    })
  }

  render(){

    const {signDetail} = this.state;
    const {getFieldDecorator, getFieldValue, getFieldsError} = this.props.form;

    return(
      <div className={styles.container}>

        <div className={styles.head}>
          <Link to={`/hdzq/activity-sign?id=${paramsObj.id}&platform=h5`} className={styles.back}><Icon type="left" /></Link>
          <h1 className={styles.title}>赛事报名</h1>
          <a className={styles.submit} onClick={this.handleFormSubmit}>提交</a>
        </div>

        <div className={styles.body}>
          {
            signDetail ?
              <Form>

                <FormItem className={styles.item}>
                  {getFieldDecorator('name', {
                    validateFirst: true,
                    rules: [
                      { required: true, message: '请输入姓名' },
                    ],
                  })(
                    <InputItem
                      clear
                      placeholder="请输入"
                    >
                      姓名
                    </InputItem>
                  )}
                </FormItem>

                <FormItem className={styles.item}>
                  {getFieldDecorator('birthday', {
                    validateFirst: true,
                    rules: [
                      { required: true, message: '请选择生日' },
                    ],
                  })(
                    <DatePicker
                      mode="date"
                      title="选择生日"
                      extra="请选择"
                      locale={zhCN}
                    >
                      <List.Item arrow="horizontal">生日</List.Item>
                    </DatePicker>
                  )}
                </FormItem>

                <FormItem className={styles.item}>
                  {getFieldDecorator('age', {
                    validateFirst: true,
                    rules: [
                      { required: true, message: '请输入年龄' },
                    ],
                  })(
                    <InputItem
                      clear
                      placeholder="请输入"
                    >
                      年龄
                    </InputItem>
                  )}
                </FormItem>

                <FormItem className={styles.item}>
                  {getFieldDecorator('gender', {
                    validateFirst: true,
                    rules: [
                      { required: true, message: '请选择性别' },
                    ],
                  })(
                    <Picker
                      cols={1}
                      data={[
                        {
                          label: '男',
                          value: '1',
                        },
                        {
                          label: '女',
                          value: '2',
                        },
                      ]}
                    >
                      <List.Item arrow="horizontal">性别</List.Item>
                    </Picker>
                  )}
                </FormItem>

                <FormItem className={styles.item}>
                  {getFieldDecorator('tel', {
                    validateFirst: true,
                    rules: [
                      { required: true, message: '请输入手机号' },
                    ],
                  })(
                    <InputItem
                      clear
                      type="phone"
                      placeholder="请输入"
                    >
                      电话
                    </InputItem>
                  )}
                </FormItem>

                <FormItem className={styles.item}>
                  {getFieldDecorator('school', {
                    validateFirst: true,
                    rules: [
                      { required: true, message: '请输入学校' },
                    ],
                  })(
                    <InputItem
                      clear
                      placeholder="请输入"
                    >
                      学校
                    </InputItem>
                  )}
                </FormItem>

                <FormItem className={styles.item}>
                  {getFieldDecorator('level', {
                    validateFirst: true,
                    rules: [
                      { required: true, message: '请输入年级' },
                    ],
                  })(
                    <InputItem
                      clear
                      placeholder="请输入"
                    >
                      年级
                    </InputItem>
                  )}
                </FormItem>

                <FormItem className={styles.item}>
                  {getFieldDecorator('project', {
                    validateFirst: true,
                    rules: [
                      { required: true, message: '请选择参赛项目' },
                    ],
                  })(
                    <InputItem
                      clear
                      placeholder="请选择"
                    >
                      参赛项目
                    </InputItem>
                  )}
                </FormItem>

                <FormItem className={styles.item}>
                  {getFieldDecorator('group', {
                    validateFirst: true,
                    rules: [
                      { required: true, message: '请选择参赛级别' },
                    ],
                  })(
                    <Picker
                      cols={1}
                      data={[
                        {
                          label: '初级',
                          value: '1',
                        },
                        {
                          label: '中级',
                          value: '2',
                        },
                        {
                          label: '高级',
                          value: '3',
                        },
                      ]}
                    >
                      <List.Item arrow="horizontal">组别</List.Item>
                    </Picker>
                  )}
                </FormItem>

                <FormItem className={styles.item}>
                  {getFieldDecorator('area', {
                    validateFirst: true,
                    rules: [
                      { required: true, message: '请选择参赛区域' },
                    ],
                  })(
                    <Picker
                      data={cityOptions}
                    >
                      <List.Item arrow="horizontal">区域组织/俱乐部</List.Item>
                    </Picker>
                  )}
                </FormItem>

                <FormItem className={styles.item}>
                  {getFieldDecorator('leader', {
                    validateFirst: true,
                    rules: [
                      { required: true, message: '请输入领队姓名' },
                    ],
                  })(
                    <InputItem
                      clear
                      placeholder="请输入"
                    >
                      领队
                    </InputItem>
                  )}
                </FormItem>

                <FormItem className={styles.item}>
                  {getFieldDecorator('leader_tel', {
                    validateFirst: true,
                    rules: [
                      { required: true, message: '请输入领队手机号' },
                    ],
                  })(
                    <InputItem
                      clear
                      type="phone"
                      placeholder="请输入"
                    >
                      领队电话
                    </InputItem>
                  )}
                </FormItem>

              </Form>
              :
              null
          }

        </div>

      </div>
    )
  }

}

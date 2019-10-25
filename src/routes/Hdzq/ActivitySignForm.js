/**
 * 填写报名信息
 * http://www.moxinga.com/hdzq/activity-sign-form?id=28&uid=5688&platform=h5
 */
import React from 'react'
import {connect} from 'dva'
import {Link, routerRedux} from 'dva/router'
import {Form, Icon, Button, Input, Select} from 'antd'
import {InputItem, List, DatePicker, Picker, Modal, Toast} from 'antd-mobile'
import {ENV, Storage, hasErrors, getUrlParams, setupWebViewJavascriptBridge} from "~/utils/utils"
import moment from 'moment'
import styles from './ActivitySignForm.less'

import zhCN from 'antd-mobile/lib/date-picker/locale/zh_CN'
import cityOptions from '~/components/Form/CityOptions'

const FormItem = Form.Item
const paramsObj = getUrlParams() || ''

@connect(state => ({
  global: state.global,
}))
@Form.create()
export default class ActivitySignForm extends React.Component {

  constructor(props) {
    super(props)
    this.ajaxFlag = true
    this.state = {
      signDetail: '',
      member_detail: [
        {type: "1", key: "text", name: "姓名", val: ""},
        {type: "2", key: "tel", name: "手机", val: ""},
        {type: "7", key: "datepicker", name: "生日", val: ""},
        {type: "4", key: "gender", name: "性别", val: ""},
        {type: "1", key: "text", name: "学校", val: ""},
        {type: "5", key: "city", name: "地区", val: ""},
      ]
    }
  }

  componentDidMount() {
    // this.queryFormFields()
  }

  queryFormFields() {
    this.props.dispatch({
      type: 'global/post',
      url: '/api/activities/enroll',
      payload: {
        id: paramsObj.id,
      },
      callback: (res) => {
        if (res.code === '0') {
          this.setState({
            signDetail: res.data
          })
        } else {
          Toast.info(res.msg, 2)
        }
      }
    })
  }

  //表单确认
  handleFormSubmit = (e) => {
    e.preventDefault()

    if (!this.ajaxFlag) return
    this.ajaxFlag = false

    this.props.form.validateFields('', (err, values) => {
      if (!err) {
        // console.log(values)
        let arr = []
        for(let i in values){
          let key = i.split('-')[0];
          if(key === 'datepicker') values[i] = moment(values[i]).format('YYYY-MM-DD HH:mm:ss');
          if(key === 'gender') values[i] = values[i][0];
          if(key === 'tel') values[i] = values[i].replace(/\s*/g,"");
          if(key === 'city') values[i] = values[i].join('-');
          let item = { key, val: values[i] }
          arr.push(item)
        }
        this.submit(arr)
      }
    })

    setTimeout(() => {
      this.ajaxFlag = true
    }, 500)
  }

  submit = (values) => {

    let {member_detail} = this.state

    for (let i in member_detail) {
      for(let j in values) {
        if(member_detail[i].key === values[j].key) {
          member_detail[i].val = values[j].val
        }
      }
    }

    member_detail = JSON.stringify(member_detail)
    this.props.dispatch({
      type: 'global/post',
      url: '/api/activities/member_add',
      payload: {
        activity_id: paramsObj.id,
        uid: paramsObj.uid,
        member_detail
      },
      callback: (res) => {
        if (res.code === '0') {
          Toast.info('报名成功', 3);
          setTimeout(() => {
            this.props.dispatch(routerRedux.push(`/hdzq/activity-sign?id=${paramsObj.id}`))
          }, 500)
        } else {
          Toast.info(res.msg, 2)
        }
      }
    })
  }

  renderFormItem = (item, index, getFieldDecorator) => {
    switch(item.type){
      case '1' :
        return(
          <FormItem key={index} className={styles.item}>
            {getFieldDecorator(`${item.key}-${index}`, {
              validateFirst: true,
              rules: [
                {required: true, message: `请输入${item.name}`},
              ],
            })(
              <InputItem clear placeholder="请输入">
                {item.name}
              </InputItem>
            )}
          </FormItem>
        )
      case '2' :
        return(
          <FormItem key={index} className={styles.item}>
            {getFieldDecorator(`${item.key}-${index}`, {
              validateFirst: true,
              rules: [
                {required: true, message: `请输入${item.name}`},
              ],
            })(
              <InputItem clear type="phone" placeholder="请输入">
                {item.name}
              </InputItem>
            )}
          </FormItem>
        )
      case '3' :
        return(
          <FormItem key={index} className={styles.item}>
            {getFieldDecorator(`${item.key}-${index}`, {
              validateFirst: true,
              rules: [
                {required: true, message: `请输入${item.name}`},
              ],
            })(
              <InputItem clear placeholder="请输入">
                {item.name}
              </InputItem>
            )}
          </FormItem>
        )
      case '4' :
        return(
          <FormItem key={index} className={styles.item}>
            {getFieldDecorator(`${item.key}-${index}`, {
              validateFirst: true,
              rules: [
                {required: true, message: `请输入${item.name}`},
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
                <List.Item arrow="horizontal">{item.name}</List.Item>
              </Picker>
            )}
          </FormItem>
        )
      case '5' :
        return(
          <FormItem key={index} className={styles.item}>
            {getFieldDecorator(`${item.key}-${index}`, {
              validateFirst: true,
              rules: [
                { required: true, message: `请选择${item.name}` },
              ],
            })(
              <Picker
                data={cityOptions}
              >
                <List.Item arrow="horizontal">{item.name}</List.Item>
              </Picker>
            )}
          </FormItem>
        )
      case '7' :
        return(
          <FormItem key={index} className={styles.item}>
            {getFieldDecorator(`${item.key}-${index}`, {
              validateFirst: true,
              rules: [
                {required: true, message: `请选择${item.name}`},
              ],
            })(
              <DatePicker
                mode="date"
                title={`请选择${item.name}`}
                extra="请选择"
                minDate={new Date(1900, 1, 1, 0, 0, 0)}
                locale={zhCN}
              >
                <List.Item arrow="horizontal">{item.name}</List.Item>
              </DatePicker>
            )}
          </FormItem>
        )
      default: break;
    }
  }

  render() {

    const { member_detail } = this.state
    const {getFieldDecorator, getFieldValue, getFieldsError} = this.props.form

    return (
      <div className={styles.container}>

        <div className={styles.head}>
          <Link to={`/hdzq/activity-sign?id=${paramsObj.id}&platform=h5`} className={styles.back}><Icon
            type="left"/></Link>
          <h1 className={styles.title}>赛事报名</h1>
          <a className={styles.submit} onClick={this.handleFormSubmit}>提交</a>
        </div>

        <div className={styles.body}>

          <Form>

            {
              member_detail.map((item, index) => (
                this.renderFormItem(item, index, getFieldDecorator)
              ))
            }

          </Form>

        </div>

      </div>
    )
  }

}

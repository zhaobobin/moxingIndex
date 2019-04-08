import React from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {
  Row, Col, Form, Input, InputNumber, Avatar, Button, Icon, Table,
  Select, Switch, Checkbox, DatePicker, Radio, Modal, Message
} from 'antd'
import styles from './ArticleForm.less'

//import UploadImage from '~/components/Form/UploadImage'
import Ueditor from '~/components/Form/Ueditor'

const FormItem = Form.Item;
const {TextArea} = Input;
const {Option} = Select;
const {RangePicker} = DatePicker;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 2},
    md: {span: 2},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 22},
    md: {span: 22},
  },
};

const btnItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      offset: 0,
      span: 24,
    },
    md: {
      offset: 2,
      span: 22,
    },
  },
};

@connect(({global}) => ({
  global,
}))
@Form.create()
export default class ArticleForm extends React.Component {

  constructor(props) {
    super(props);
    this.ajaxFlag = true;
    this.state = {
      loading: false,
      detail: '',
      modalVisible: false,

      currentCategoryNames: '',
      currentCategoryIds: '',
      currentCategoryIdsBeifen: '',
      category: [],
      selectedRowKeys: [],
    }
  }

  componentDidMount() {
    let {detail, action} = this.props;
    if (action === 'add') return;
    let currentCategoryNames = [], currentCategoryIds, currentCategoryIdsBeifen;
    for(let i in detail.category){
      currentCategoryNames.push(detail.category[i].name);
      currentCategoryIds.push(detail.category[i].category_id);
      currentCategoryIdsBeifen.push(detail.category[i].category_id);
    }
    this.setState({
      detail,
      currentCategoryNames,
      currentCategoryIds,
      currentCategoryIdsBeifen,
    })
  }

  queryCategory = () => {
    this.props.dispatch({
      type: 'global/post',
      url: '/api/portal/category',
      payload: {},
      callback: (res) => {
        if (res.code === '0') {
          this.setState({
            modalVisible: true,
            category: res.data
          })
        }
      }
    });
  };

  //选择分类
  onShowCategory = () => {
    const {category} = this.state;
    if(category.length > 0){
      this.setState({
        modalVisible: true
      })
    }else{
      this.queryCategory();
    }
  };

  onCloseCategory = () => {
    const {currentCategoryIds} = this.state;
    this.setState({
      currentCategoryIdsBeifen: currentCategoryIds,
      modalVisible: false,
    })
  };

  onSelectChange = (keys) => {
    const currentCategoryIdsBeifen = keys.length > 3 ? keys.slice(-3) : keys;
    //console.log(currentCategoryIdsBeifen)
    this.setState({ currentCategoryIdsBeifen });
  };

  onSubmitCategory = () => {
    const {currentCategoryIdsBeifen, category} = this.state;
    let currentCategoryNames = [];
    for(let i in category){
      for(let j in currentCategoryIdsBeifen){
        if(category[i].id === currentCategoryIdsBeifen[j]){
          currentCategoryNames.push(category[i].name)
        }
      }
    }
    currentCategoryNames = currentCategoryNames.join(',');
    //console.log(currentCategoryNames)
    this.setState({
      currentCategoryNames,
      currentCategoryIds: currentCategoryIdsBeifen,
      modalVisible: false,
    });
  };

  //富文本
  editorCallback = (content) => {
    this.props.form.setFieldsValue({'content': content});
  };

  //重置表单
  handleFormReset = (e) => {
    e.preventDefault();
    this.props.form.resetFields();
  };

  //表单确定
  handleFormSubmit = (e) => {
    e.preventDefault();

    if (!this.ajaxFlag) return;
    this.ajaxFlag = false;

    this.props.form.validateFields('', (err, values) => {
      if (!err) {
        this.save(values);
      }
    });
    setTimeout(() => {
      this.ajaxFlag = true
    }, 500);
  };

  //保存
  save = (values) => {
    const {action, detail} = this.props;
    const api = action === 'add' ? '/api/portal/add_portal' : '/api/portal/edit_portal';
    let data = values;
    if (action === 'edit') {
      data.id = detail.id;
    }
    this.props.dispatch({
      type: 'global/post',
      url: api,
      payload: data,
      callback: (res) => {
        setTimeout(() => {
          this.ajaxFlag = true
        }, 500);
        if (res.code === '0') {
          this.props.dispatch(routerRedux.push('/account/content'))
        }
      }
    });
  };

  render() {

    const {detail, modalVisible, currentCategoryNames, currentCategoryIds, currentCategoryIdsBeifen, category} = this.state;
    const {action, getFieldDecorator, getFieldValue, getFieldsError} = this.props.form;

    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    const columns = [
      {
        title: '分类id',
        dataIndex: 'id',
        key: 'id',
        align: 'center',
      },
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (status) => (
          <span>{status === 1 ? '正常' : ''}</span>
        )
      },
    ];

    return (
      <div className={styles.container}>

        {
          action === 'edit' && detail === '' ?
            null
            :
            <Form
              hideRequiredMark={true}
              onSubmit={this.handleFormSubmit}
              onReset={this.handleFormReset}
            >

              <FormItem {...formItemLayout} label="标题">
                {getFieldDecorator('title',
                  {
                    initialValue: detail.title || undefined,
                    validateFirst: true,
                    rules: [
                      {required: true, message: '请输入文章标题'},
                    ],
                  })(
                  <Input autoComplete="off" placeholder="文章资讯标题"/>
                )}
              </FormItem>

              {
                detail.type === '3' ?
                  <FormItem {...formItemLayout} label="来源">
                    {getFieldDecorator('source_url',
                      {
                        initialValue: detail.source_url || undefined,
                        validateFirst: true,
                        rules: [
                          {required: true, message: '请输入原文来源'},
                        ],
                      })(
                      <Input autoComplete="off" placeholder="原文抓取地址" disabled={detail.source_url !== ''}/>
                    )}
                  </FormItem>
                  :
                  null
              }

              <FormItem {...formItemLayout} label="分类">
                {getFieldDecorator('category',
                  {
                    initialValue: currentCategoryNames || undefined,
                    validateFirst: true,
                    rules: [
                      // {required: true, message: '请选择文章所属分类'},
                    ],
                  })(
                  <Input autoComplete="off" onClick={this.onShowCategory} placeholder="文章所属分类"/>
                )}
              </FormItem>

              <FormItem {...formItemLayout} label="内容" className={styles.ueditor}>
                {getFieldDecorator('content',
                  {
                    initialValue: detail.content || undefined,
                    validateFirst: true,
                    rules: [
                      {required: true, message: '请输入内容'},
                    ],
                  })(
                  <Ueditor
                    height={400}
                    content={detail.content}
                    callback={this.editorCallback}
                  />
                )}
              </FormItem>

              <FormItem {...btnItemLayout}>
                <div className={styles.btns}>
                  <Button
                    type="primary"
                    htmlType="submit"
                  >
                    提交
                  </Button>
                  <Button htmlType="reset">取消</Button>
                </div>
              </FormItem>

            </Form>
        }

        <Modal
          title="文章分类"
          width={800}
          visible={modalVisible}
          onOk={this.onSubmitCategory}
          onCancel={this.onCloseCategory}
          className={styles.articleCategory}
        >
          <Table
            rowKey="id"
            columns={columns}
            dataSource={category}
            pagination={{
              pageSize: 5
            }}
            rowSelection={{
              selectedRowKeys: currentCategoryIdsBeifen,
              onChange: this.onSelectChange,
            }}
          />
        </Modal>

      </div>
    )
  }
}

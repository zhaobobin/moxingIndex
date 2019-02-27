import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import styles from './Record.less'
import { Link } from 'dva/router';
import Loading from '~/components/Common/Loading';
import ResultJson from "../../Result/ResultJson";
const TabPane = Tabs.TabPane;
@connect(state => ({
  global: state.global,
}))
export default class Record extends React.Component {
  constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.loading = true;
    this.state = {
      data:''
    }
  }
  componentDidMount(){
    this.TransactionRecord()
  }

  TransactionRecord =()=>{
    if(!this.ajaxFlag) return;
    this.ajaxFlag = false;

    let { userId } = this.props.global.currentUser.userInfo;
    this.props.dispatch({
      type: 'global/post',
      url: '/api/userAccountInfo/findUserTradeRecords',
      payload: {
        userId
      },
      callback: (res) => {
        this.loading = false;
        if(res.code===0){
          this.setState({
            data:res.data
          })
        }
      }
    })
  };
  render(){

    return(
      <div className={styles.RecordBox}>
        <Tabs defaultActiveKey="1"  tabBarGutter={0}>
          <TabPane tab="全部" key="1">Content of Tab Pane 1</TabPane>
          <TabPane tab="充值" key="2">Content of Tab Pane 2</TabPane>
          <TabPane tab="出借" key="3">Content of Tab Pane 3</TabPane>
          <TabPane tab="回款" key="4">Content of Tab Pane 4</TabPane>
          <TabPane tab="提现" key="5">Content of Tab Pane 5</TabPane>
          <TabPane tab="奖励" key="6">Content of Tab Pane 6</TabPane>
          <TabPane tab="服务费" key="7">Content of Tab Pane 7</TabPane>
          <TabPane tab="债权转让" key="8">Content of Tab Pane 8</TabPane>
          <TabPane tab="其他" key="9">Content of Tab Pane 9</TabPane>
        </Tabs>
       {/* <div className={styles.EmptyBox}>
          <img src={require("~/assets/com/no_record@2x.png")}/>
          <p>暂无数据</p>
        </div>*/}
      </div>
    )
  }
}

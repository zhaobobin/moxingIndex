import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd';
import styles from './Record.less'
import { Link } from 'dva/router';
import Loading from '~/components/Common/Loading';
import ResultJson from "../../Result/ResultJson";
import AllAsset from '~/components/Account/AssetManage/AllAsset';
import Recharge from '~/components/Account/AssetManage/Recharge';

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
      data:[]
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
      const {data}=this.state;

    return(
      <div className={styles.RecordBox}>
        {
          this.loading
            ?
            <Loading/>
            :
            <div>
              <Tabs defaultActiveKey="全部" tabBarGutter={0}>
                <TabPane tab="全部" key="全部"><AllAsset data={data}/></TabPane>
                <TabPane tab="充值" key="充值"><Recharge data={data}/></TabPane>
                <TabPane tab="出借" key="出借">Content of Tab Pane 3</TabPane>
                <TabPane tab="回款" key="回款">Content of Tab Pane 4</TabPane>
                <TabPane tab="提现" key="提现">Content of Tab Pane 5</TabPane>
                <TabPane tab="奖励" key="奖励">Content of Tab Pane 6</TabPane>
                <TabPane tab="服务费" key="服务费">Content of Tab Pane 7</TabPane>
                <TabPane tab="债权转让" key="债权转让">Content of Tab Pane 8</TabPane>
                <TabPane tab="其他" key="其他">Content of Tab Pane 9</TabPane>
              </Tabs>
            </div>
        }
       {/* <div className={styles.EmptyBox}>
          <img src={require("~/assets/com/no_record@2x.png")}/>
          <p>暂无数据</p>
        </div>*/}
      </div>
    )
  }
}

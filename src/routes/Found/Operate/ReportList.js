/*去投网运营报告*/
import React from 'react';
import { connect } from 'dva';
import styles  from './ReportList.less';
import { Tabs } from 'antd';
import moment from 'moment';
import { Link } from 'dva/router';
import ReportListTwo from "~/components/Information/ReportListTwo";
import Signature from "~/components/Information/signature";
import Pagination  from '~/components/Common/Page/Pagination';
import Information from "~/components/Information/Information";
@connect(state => ({
  global: state.global,
}))
export default class ReportList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      pageNum:1,
      pageSize:10,
      list:[]
    }
  }
  componentDidMount(){
    this.props.dispatch({
      type: 'global/post',
      url:'/api/platform/findRunReportList',
      payload:{
      },
      callback:(res)=>{
      this.setState({
        list:res.data.list
      })
      }
    })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.keywords !== this.props.match.params.keywords) {
      let keywords = nextProps.match.params.keywords;
      console.log(keywords);
    }
  }

  activeKey = (key) =>{
    console.log(key);
  }

  render(){
    const TabPane = Tabs.TabPane;
    const {pageNum} = this.state;
    return(
      <div >
        <Information>
        <div className={styles.PlatformReport}>
          <Tabs defaultActiveKey="1"
                onChange={this.activeKey}
                tabBarStyle={{marginBottom:40}}
                animated={false}
          >
            <TabPane tab="去投网运营报告" key="1">
              {/*背景图片*/}
              <div className={styles.imgBackground}>
                <div><span className={styles.montNum}>6</span>月</div>
                <div className={styles.title}>去投网运营报告</div>
                <div>2018-06-20</div>
              </div>
              <ul className={styles.ReportUl}>
                {
                  this.state.list.map((item,index)=>{
                   return(
                     <li key={index}>
                       <Link to={`platform-report/detail/${item.oid}`} className={styles.link}>
                       <span>{item.reportName}</span>
                       <span>{moment(item.showDataTime).format("YYYY-MM-DD ")}</span>
                       </Link>
                     </li>
                   )
                  })
                }
              </ul>
              {/*分页查询*/}
              {/*<Pagination current={pageNum} total={500} showTotalText="true" onChange={(pageNum)=>this.changePageNum(pageNum)}></Pagination>*/}
            </TabPane>
            <TabPane tab="等级保护测评报告" key="2">
              {/*背景图片*/}
              <ReportListTwo colorBlu='true'></ReportListTwo>
            </TabPane>
            <TabPane tab="系统安全评估报告" key="3">
              <ReportListTwo ></ReportListTwo>
            </TabPane>
          </Tabs>
        </div>

      <Signature/>
          </Information>
      </div>
    )
  }

}

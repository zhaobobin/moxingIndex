/*去投网运营报告*/
import React from 'react';
import { connect } from 'dva';
import styles  from './ReportList.less';
import { Tabs } from 'antd';
import ReportListTwo from "~/components/Information/ReportListTwo";
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
      list:[
        {'cont':'去投网2018年4月运营报告','time':'2018-04-20'},
        {'cont':'去投网2018年3月运营报告','time':'2018-04-20'},
        {'cont':'去投网2018年2月运营报告','time':'2018-04-20'},
        {'cont':'去投网2018年1月运营报告','time':'2018-04-20'},
      ]
    }
  }
  componentDidMount(){
    this.props.dispatch({
      type: 'global/post',
      url:'/api/platform/findRunReportList',
      payload:{
      },
      callback:(res)=>{
       console.log(res)

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
                       <span>{item.cont}</span>
                       <span>{item.time}</span>
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

        <div className={styles.bottomBox}>
          <span>法定代表人签名：</span>
          <img src={require("~/assets/account/find_autograph@2x.png")} alt="" className={styles.img}/>
        </div>
          </Information>
      </div>
    )
  }

}

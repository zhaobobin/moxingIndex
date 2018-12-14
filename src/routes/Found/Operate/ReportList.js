/*去投网运营报告*/
import React from 'react';
import { connect } from 'dva';
import styles  from './ReportList.less';
import { Tabs, WhiteSpace } from 'antd-mobile';
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
     	const tabs = [
{ title: '去投网运营报告' },
{ title: '等级保护测评报告' },
{ title: '系统安全评估报告' },
];
    const {pageNum} = this.state;
    return(
      <div >
    
        <div className={styles.PlatformReport}>
          <Tabs tabs={tabs} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={2.4} />}>            
  <Information>
  {/*去投网运营报告*/}
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
</Information>
 {/*去投网运营报告 end*/}
  {/*等级保护测评报告*/}
<Information>
<ReportListTwo colorBlu='true'></ReportListTwo>
</Information>
 {/*等级保护测评报告 end*/}
  {/*系统安全评估报告*/}
<Information>
<ReportListTwo ></ReportListTwo>
</Information>
{/*系统安全评估报告 end*/}
  
  </Tabs>   
        </div>
      <Signature/>
        
      </div>
    )
  }

}

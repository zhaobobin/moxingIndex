import React from 'react';
import { connect } from 'dva';
import styles from "./Event.less";
import Information from "~/components/Information/Information";
import Signature from "~/components/Information/signature";
@connect(state => ({
  global: state.global,
}))
export default class Event extends React.Component {
  constructor(props){
    super(props);
    this.state = {
          arr:[
            {'title':'公司依法进入破产程序：','cont':'无'},
            {'title':'公司被责令停业、整顿、关闭：','cont':'无'},
            {'title':'公司涉及重大诉讼、仲裁，或涉嫌违法违规被有权机关调查，或受到刑事处罚、重大行政处罚：','cont':'无'},
            {'title':'公司法定代表人、实际控制人、主要负责人、董事、监事、高级管理人员涉及重大诉讼、仲裁，或涉嫌违法违纪被有权机关调查，或受到刑事处罚、重大行政处罚，或被采取强制措施: ：','cont':'无'},
            {'title':'公司主要或者全部业务陷入停顿：','cont':'无'},
            {'title':'存在欺诈、损害出借人利益等其他影响网络借贷信息中介机构经营活动的重大事项：','cont':'无'},
          ]
    }
  }
  render(){
    return(
      <div >
        <Information>
            <div className={styles.headContent}>
              根据《网络借贷信息中介机构业务活动管理暂行办法》关于建立网络借贷信息中介机构信息披露制度的工作部署和要求，《网络借贷信息中介机构业务活动信息披露指引》第十条 网络借贷信息中介机构或其分支机构发生下列情况之一的，网络借贷信息中介机构应当于发生之日起48小时内将事件的起因、目前的状态、可能产生的影响和采取的措施向公众进行披露。
            </div>
        <h4 className={styles.EventTitle}> <span className={styles.content}>重大事项披露 <span></span></span></h4>
        <table  className={styles.EventTable} >
          {
            this.state.arr.map((item,index)=>{
              return(
                <tbody key={index}>
                <tr>
                  <td>{item.title}</td>
                  <td>{item.cont}</td>
                </tr>
                </tbody>
              )
            })
          }
        </table>
       <Signature/>
          </Information>
      </div>
    )
  }

}

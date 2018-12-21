import React from 'react';
import { connect } from 'dva';
import styles from './InfoIndex.less';
import { Link } from 'dva/router';
import Information from "~/components/Information/Information";
import Signature from "~/components/Information/signature";
import { Icon } from 'antd';
@connect(state => ({
  global: state.global,
}))
export default class InfoIndex extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        arr:[
          '备案信息',
          '组织信息',
          '审核信息',
          '经营信息',
          '重大信息',
          '其他信息',
          '出借人教育',
          '平台报告',
        ]
    }
  }

  render(){
    const arr=this.state.arr

    return(
      <div className={styles.InfoIndex}>
        <Information>
        <div className={styles.contentBox}>
          《网络借贷信息中介机构业务活动管理暂行办法》第四条、第九条、第三十条、第三十一条均对于网络借贷信息中介机构的信息披露义务进行了规定。
          根据《网络借贷信息中介机构业务活动信息披露指引》、《中国互联网金融协会信息披露自律管理规范》及
          《中国互联网金融协会标准：互联网金融信息披露——个体网络借贷》（T/NIFA 1-2016）的规定，
          去投网平台从从业机构备案信息、组织信息、审核信息、经营信息、重大事项、平台运营信息（请见首页平台数据页面）、
          项目信息（请见具体借款标的页面）、出借人教育等方面进行信息披露，供用户查看监督。
        </div>
          <p className={styles.system}>
            <a target="_blank" href="http://investtest.qutouwang.com/hyxd_qtw/customer_invest_info/pdf/information_disclosure.pdf">
              北京恒远鑫达投资管理有限公司-信息披露制度>>
            </a>
           </p>
                <ul className={styles.listUl}>
                  <Link to='/found/beian?equipmentType=app'>
                    <li>备案信息 <span></span> </li>
                  </Link>
                  <Link to='/found/organization?equipmentType=app'>
                    <li>组织信息 <span></span> </li>
                  </Link>
                  <Link to='/found/examine?equipmentType=app'>
                    <li>审核信息 <span></span> </li>
                  </Link>
                  <Link to='/found/disclosure?equipmentType=app'>
                    <li>经营信息 <span></span> </li>
                  </Link>
                  <Link to='/found/event?equipmentType=app'>
                    <li>重大事项 <span></span> </li>
                  </Link>
                  <Link to='/found/other?equipmentType=app'>
                    <li>其他信息 <span></span> </li>
                  </Link>
                  <Link to='/found/education?equipmentType=app'>
                    <li>出借人教育 <span></span> </li>
                  </Link>
                  <Link to='/found/operate?equipmentType=app'>
                    <li>平台报告 <span></span> </li>
                  </Link>
                </ul>

        <Signature/>
        </Information>
      </div>
    )
  }

}

import React from 'react';
import { connect } from 'dva';
import styles from "./Organization.less";
import Information from "~/components/Information/Information";
import Signature from "~/components/Information/signature";
@connect(state => ({
  global: state.global,
}))
export default class Organization extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
    return(
      <div >
        <Information>
          <div className={styles.OrganizationBox}>
        <h4 className={styles.Organization}> <span className={styles.content}>工商信息 <span></span></span></h4>
      <div className={styles.OrganizationBoxCont}>
        <p ><span className={styles.title}>全称：</span><span className={styles.cont}>北京恒远鑫达投资管理有限公司</span></p>
        <p ><span className={styles.title}>简称：</span><span className={styles.cont}>去投网</span></p>
        <p ><span className={styles.title}>统一社会信用代码：</span><span className={styles.cont}>91110105061258400T</span></p>
        <p ><span className={styles.title}>注册资本：</span><span className={styles.cont}>15000万人民币</span></p>
        <p ><span className={styles.title}>实缴注册资本：</span><span className={styles.cont}>15000万人民币</span></p>
        <p ><span className={styles.title}>注册地址：</span><span className={styles.cont}>北京市朝阳区亮马桥甲40号1幢4层401内B02A室 邮编：100125</span></p>
        <p ><span className={styles.title}>经营地址：</span><span className={styles.cont}>北京市朝阳区亮马桥甲40号1幢4层401内B02A室 邮编：100125</span></p>
        <p ><span className={styles.title}>成立时间：</span><span className={styles.cont}>2014-03-07</span></p>
        <p ><span className={styles.title}>经营期限：</span><span className={styles.cont}>20年（2014-03-07到2034-03-06）</span></p>
        <p ><span className={styles.title}>经营状态：</span><span className={styles.cont}>开业</span></p>
        <p ><span className={styles.titleF}>经营范围：</span><span className={styles.contF}>投资管理；资产管理；项目投资；投资咨询；经济贸易咨询；房地产信息咨询； 销售家具、首饰、工艺品、建筑材料、金属材料、五金交电、机械设备、化工产品（不含危险化学品）、电子产品、通讯设备；工程咨询；专业承包；城市园林绿化施工；互联网信息服务。（“1、未经有关部门批准，不得以公开方式募集资金；2、不得公开开展证券类产品和金融衍生品交易互动；3、不得发放贷款；4、不得对所投资企业以外的其他企业提供担保；5、不得向投资者承诺投资本金不受损失或者承诺最低收益”；企业依法自主选择经营项目，开展经营活动；互联网信息服务以及依法须经批准的项目，经相关部门批准后依批准的内容开展经营活动；不得从事本市产业政策禁止和限制类项目的经营互动。）</span></p>
      </div>
        <h4 className={styles.Organization}> <span className={styles.content}>主要人员信息<span></span></span></h4>
            <div className={styles.personnel }>
        <p ><span className={styles.title}>法定代表人：</span><span className={styles.cont}>吴芷萱</span></p>
        <p ><span className={styles.title}>总裁：</span><span className={styles.cont}>许义来</span></p>
        <p ><span className={styles.title}>财务负责人：</span><span className={styles.cont}>张建</span></p>
        <p ><span className={styles.title}>副总经理/风控负责人：</span><span className={styles.cont}>卢平</span></p>
            </div>
        <h4 className={styles.Organization}> <span className={styles.content}>股东信息 <span></span></span></h4>
        <table className={styles. shareholder}>
          <tbody>
          <tr>
            <td>姓名/机构名称</td>
            <td>占股比例</td>
          </tr>
          <tr>
            <td>吴芷萱</td>
            <td>10%</td>
          </tr>
          <tr>
            <td>
              <span>
                 恒远鑫达科技集团有限公司
              </span>
            </td>
            <td>90%</td>
          </tr>
          </tbody>
        </table>
        <h4 className={styles.Organization}> <span className={styles.content}>组织架构及从业人员概况 <span></span></span></h4>
        <p className={styles.zuzhi}>组织架构</p>
        <img src={require("~/assets/account/find_organizational_img1@2x.png")} alt="" className={styles.organizationImg}/>
        <p className={styles.CongYeGk}>从业人员概况（截至2018年8月31日）</p>
        {/*表格*/}
        <table className={styles.congye}>
          <tbody>
          <tr>
            <td className={styles.congyeTd} rowSpan="5">年龄构成</td>
            <td className={styles.congyeTd2}></td>
            <td className={styles.renshu}>人数</td>
          </tr>
          <tr>
            <td className={styles.congyeTd2}>25岁及以下</td>
            <td className={styles.renshu}> 5</td>
          </tr>
          <tr>
            <td className={styles.congyeTd2}>26-30岁</td>
            <td className={styles.renshu}>15</td>
          </tr>
          <tr>
            <td className={styles.congyeTd2}>31-35岁</td>
            <td className={styles.renshu}>8</td>
          </tr>
          <tr>
            <td className={styles.congyeTd2}>35岁以上</td>
            <td className={styles.renshu}>7</td>
          </tr>
          <tr>
            <td className={styles.congyeTd} rowSpan="3">学历构成</td>
            <td className={styles.congyeTd2}>专科及以下</td>
            <td className={styles.renshu}>12</td>
          </tr>
          <tr>
            <td className={styles.congyeTd2}>本科</td>
            <td className={styles.renshu}>20</td>
          </tr>
          <tr>
            <td className={styles.congyeTd2}>研究生及以上</td>
            <td className={styles.renshu}>3</td>
          </tr>
          <tr>
            <td>员工总数</td>
            <td  colSpan='2' className={styles.zongshu}>
            <span>
              35
            </span>
            </td>
          </tr>
          </tbody>
        </table>
        <h4 className={styles.Organization}> <span className={styles.content}>信息安全测评认证信息 <span></span></span></h4>
          {/*<img src={require("~/assets/account/find_record_img2@2x.png")} alt="" className={styles.organizationImg}/>*/}
          <p className={styles.fenzhi}>暂无分支机构</p>
        <h4 className={styles.Organization}> <span className={styles.content}>官方网站、官方手机应用及其他官方互联网渠道信息 <span></span></span></h4>
       <div  className={styles.official}>
        <p ><span className={styles.title}>官方网址：</span><span className={styles.cont}>www.qutouwang.com</span></p>
        <p ><span className={styles.title}>平台APP名称：</span><span className={styles.cont}>去投网</span></p>
        <p ><span className={styles.title}>微信公众号：</span><span className={styles.cont}>去投网（QTW-DYH）</span></p>
        <p className={styles.weibo}><span className={styles.weibotitle}>微博：</span><span className={styles.weibocont}>新浪去投网微博 https://weibo.com/qutouwang</span></p>
       </div>
        <h4 className={styles.Organization}> <span className={styles.content}>平台上线运营时间 <span></span></span></h4>
        <p>2016年6月18日</p>
        <Signature/>
          </div>
    </Information>

      </div>
    )
  }

}

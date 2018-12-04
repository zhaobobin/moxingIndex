import React from 'react';
import { connect } from 'dva';
import styles from './Disclosure.less';
import Information from "~/components/Information/Information";
import Signature from "~/components/Information/signature";
@connect(state => ({
  global: state.global,
}))
export default class Disclosure extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        disclosureArray:[]
      }
  }

componentDidMount(){
  this.props.dispatch({
    type: 'global/post',
    url:'/api/platform/findBusiInfo',
    payload:{

    },
    callback:(res)=>{
      // console.log(res)
      if(res.code=== 0){
            this.setState({
              disclosureArray:res.data[0],
            })
      }
    }
  })
}


  render(){
    const {disclosureArray}=this.state
    console.log(disclosureArray)
    return(
      <div >
        <Information>
        <h4 className={styles.Manage}> <span className={styles.content}>工商信息 <span></span></span></h4>
          {/*信息列表*/}
        <table  className={styles.ManageTable} >
          <tbody>
          <tr>
            <td>自成立以来的累计 借贷金额：</td>
            <td>{disclosureArray===''?'暂无':disclosureArray.loanTotalAmt}</td>
          </tr>
          <tr>
            <td>自成立以来的累计 借贷笔数：</td>
            <td>{disclosureArray===''?'暂无':disclosureArray.loanTotalCount}</td>
          </tr>
          <tr>
            <td>借贷余额笔数：</td>
            <td>{disclosureArray===''?'暂无':disclosureArray.loanBalanceCount}</td>
          </tr>
          <tr>
            <td>借贷余额：</td>
            <td>{disclosureArray===''?'暂无':disclosureArray.loanBalanceAmt}</td>
          </tr>
          <tr>
            <td>利息余额：</td>
            <td>{disclosureArray===''?'暂无':disclosureArray.incomeBalanceAmt}</td>
          </tr>
          <tr>
            <td>累计出借人数量：</td>
            <td>{disclosureArray===''?'暂无':disclosureArray.lenderTotalCount}</td>
          </tr>
          <tr>
            <td>累计借款人数量：</td>
            <td>{disclosureArray===''?'暂无':disclosureArray.borrowerTotalCount}</td>
          </tr>
          <tr>
            <td>当前出借人数量：</td>
            <td>{disclosureArray===''?'暂无':disclosureArray.lenderCurrentCount}</td>
          </tr>
          <tr>
            <td>当前借款人数量：</td>
            <td>{disclosureArray===''?'暂无':disclosureArray.borrowerCurrentCount}</td>
          </tr>
          <tr>
            <td>前十大借款人 待还金额占比：</td>
            <td>{disclosureArray===''?'暂无':disclosureArray.topTenLoanPercent}</td>
          </tr>
          <tr>
            <td>最大单一借款人 待还金额占比：</td>
            <td>{disclosureArray===''?'暂无':disclosureArray.topOneLoanPercent}</td>
          </tr>
          <tr>
            <td>关联关系借款余额 及笔数：</td>
            <td>{disclosureArray===''?'暂无':disclosureArray.loanTotalAmt}</td>
          </tr>
          <tr>
          <td>逾期金额：</td>
          <td>{disclosureArray===''?'暂无':disclosureArray.overdueAmt}</td>
        </tr>
          <tr>
            <td>逾期笔数：</td>
            <td>{disclosureArray===''?'暂无':disclosureArray.overdueCount}</td>
          </tr>
          <tr>
            <td>逾期90天（不含） 以上金额：</td>
            <td>{disclosureArray===''?'暂无':disclosureArray.overdueMoreThreemouthAmt}</td>
          </tr>
          <tr>
            <td>逾期90天（不含） 以上笔数：</td>
            <td>{disclosureArray===''?'暂无':disclosureArray.overdueMoreThreemouthCount}</td>
          </tr>
          <tr>
            <td>累计代偿金额：</td>
            <td>{disclosureArray===''?'暂无':disclosureArray.insteadTotalAmt}</td>
          </tr>
          <tr>
            <td>累计代偿笔数：</td>
            <td>{disclosureArray===''?'暂无':disclosureArray.insteadTotalCount}</td>
          </tr>
          <tr>
            <td>项目逾期率：</td>
            <td>{disclosureArray===''?'暂无':disclosureArray.gradePrjOverdueRate}</td>
          </tr><tr>
          <td>金额逾期率：</td>
          <td>{disclosureArray===''?'暂无':disclosureArray.overdueRate}</td>
        </tr>
          </tbody>
        </table>

        <div className={styles.chargeBox}>
          <h4 className={styles.Manage}> <span className={styles.content}>收费标准 <span></span></span></h4>
          <p ><span className={styles.title}>充值手续费：</span><span className={styles.cont}>{disclosureArray.rechargeDesc}</span></p>
          <p ><span className={styles.title}>提现手续费：</span><span className={styles.cont}>{disclosureArray.withdrawDesc}</span></p>
          <p className={styles.title}>借款收费标准:</p>
          <p>账户管理费比例：6.78% — 19.18% （一年期）</p>
          <p>年化利率：{disclosureArray.rateDesc}</p>
          <p>逾期利息=尚未清偿的本月还款本金*0.002*逾期天数（前两日逾期利息免收）按照尚未清偿 的本月还款本金自逾期之日按每日0.002的利率按日计收逾期利息，直至清偿完毕之日。逾期利息不计复利。</p>
          <p>提前还款费用 = 还清当前还款+部分服务费</p>
          <p className={styles.norm}>1.一次性偿还当月本金和利息，还款当月利息计息日不足 1 个月的，按 1 个月计算。 （=当月本金+当月利息+当月服务费）</p>
          <p className={styles.norm}>2. 若提前偿还全部剩余借款，只需在偿还当期借款时一次性偿还剩余全部本金及当期利息，而无需支付剩余借款期限的利息。 （=剩余全部本金+当月利息+部分服务费）</p>
        </div>
        <Signature/>
</Information>
      </div>
    )
  }

}

import React from 'react';
import { connect } from 'dva';
import styles from './Disclosure.less';
import Information from "~/components/Information/Information";
import Signature from "~/components/Information/signature";
import { numberFormat, isEmptyObject, getTargetReturn } from '~/utils/utils';
import Loading from '~/components/Common/Loading';
@connect(state => ({
  global: state.global,
}))
export default class Disclosure extends React.Component {
  constructor(props){
      super(props);
    this.loading = true;
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
      this.loading = false;
      console.log(res)
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
        {
          this.loading
            ?
            <Loading/>
            :
            <Information>
              <div className={styles.Disclosure}>
              <h4 className={styles.Manage}> <span className={styles.content}>工商信息 <span></span></span></h4>
              {/*信息列表*/}
              <table  className={styles.ManageTable} >
                <tbody>
                <tr>
                  <td>自成立以来的累计 借贷金额：</td>
                  <td>{numberFormat(disclosureArray.loanTotalAmt)}元</td>
                </tr>
                <tr>
                  <td>自成立以来的累计 借贷笔数：</td>
                  <td>{disclosureArray.loanTotalCount}笔</td>
                </tr>
                <tr>
                  <td>借贷余额笔数：</td>
                  <td>{disclosureArray.loanBalanceCount}笔</td>
                </tr>
                <tr>
                  <td>借贷余额：</td>
                  <td>{numberFormat(disclosureArray.loanBalanceAmt)}元</td>
                </tr>
                <tr>
                  <td>利息余额：</td>
                  <td>{numberFormat(disclosureArray.incomeBalanceAmt)}元</td>
                </tr>
                <tr>
                  <td>累计出借人数量：</td>
                  <td>{disclosureArray.lenderTotalCount}</td>
                </tr>
                <tr>
                  <td>累计借款人数量：</td>
                  <td>{disclosureArray.borrowerTotalCount}</td>
                </tr>
                <tr>
                  <td>当前出借人数量：</td>
                  <td>{disclosureArray.lenderCurrentCount}</td>
                </tr>
                <tr>
                  <td>当前借款人数量：</td>
                  <td>{disclosureArray.borrowerCurrentCount}</td>
                </tr>
                <tr>
                  <td>前十大借款人 待还金额占比：</td>
                  <td>{numberFormat(disclosureArray.topTenLoanPercent)}%</td>
                </tr>
                <tr>
                  <td>最大单一借款人 待还金额占比：</td>
                  <td>{numberFormat(disclosureArray.topOneLoanPercent)}%</td>
                </tr>
                <tr>
                  <td>关联关系借款余额 及笔数：</td>
                  <td>{disclosureArray.correlationLoanBalCount }</td>
                </tr>
                <tr>
                  <td>逾期金额：</td>
                  <td>{numberFormat(disclosureArray.overdueAmt)}元</td>
                </tr>
                <tr>
                  <td>逾期笔数：</td>
                  <td>{disclosureArray.overdueCount}笔</td>
                </tr>
                <tr>
                  <td>逾期90天（不含） 以上金额：</td>
                  <td>{numberFormat(disclosureArray.overdueMoreThreemouthAmt)}元</td>
                </tr>
                <tr>
                  <td>逾期90天（不含） 以上笔数：</td>
                  <td>{disclosureArray.overdueMoreThreemouthCount}笔</td>
                </tr>
                <tr>
                  <td>累计代偿金额：</td>
                  <td>{numberFormat(disclosureArray.insteadTotalAmt)}元</td>
                </tr>
                <tr>
                  <td>累计代偿笔数：</td>
                  <td>{numberFormat(disclosureArray.insteadTotalCount)}笔</td>
                </tr>
                <tr>
                  <td>项目逾期率：</td>
                  <td>{numberFormat(disclosureArray.gradePrjOverdueRate)}%</td>
                </tr><tr>
                  <td>金额逾期率：</td>
                  <td>{numberFormat(disclosureArray.overdueRate)}%</td>
                </tr>
                </tbody>
              </table>

              <div className={styles.chargeBox}>
                <h4 className={styles.Manage}> <span className={styles.content}>收费标准 <span></span></span></h4>
                <p className={styles.disclosureP}><span className={styles.title}>充值手续费：</span><span className={styles.cont}>{disclosureArray.rechargeDesc}</span></p>
                <p className={styles.disclosureP}><span className={styles.title}>提现手续费：</span><span className={styles.cont}>{disclosureArray.withdrawDesc}</span></p>
                <p className={styles.shoufeititle}>借款收费标准:</p>
                <div className={styles.shoufeiBox}>
                <p className={styles.disclosureP}>居间服务费比例（年化）：{disclosureArray.feeDesc}</p>
                <p className={styles.disclosureP}>年化利率：{disclosureArray.rateDesc}</p>
                <p className={styles.norm}>{disclosureArray.overdueFeeDesc}</p>
                <p className={styles.norm}>{disclosureArray.prepaymentDesc}</p>
                <p className={styles.norm}>{disclosureArray.withdrawDesc}</p>
                </div>
              </div>
              <Signature/>
              </div>
            </Information>
        }

      </div>
    )
  }

}

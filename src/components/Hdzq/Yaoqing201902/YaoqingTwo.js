import React from 'react';
import { connect } from 'dva';
import styles from './YaoqingTwo.less';
import { numberFormat } from "~/utils/utils";

@connect(state => ({
  global: state.global,
}))
export default class YaoqingTwo extends React.Component{

  render(){

    const {isAuth} = this.props.global;
    console.log(isAuth)
    const {detail, userId} = this.props;

    return(
      <div className={styles.TwoBox} >
        <div className={styles.TwoImgBox}>
          <img src={require("~/assets/invent/Yaoqing201902/invent_h5_title2@2x.png")}/>
        </div>

        <div className={styles.TwoContBox}>

          <div className={styles.TwoContHeadBox}>
            <img src={require("~/assets/invent/Yaoqing201902/invent_h5_icon2@2x.png")} className={styles.LImg}/>
            <div className={styles.RBox}>
              <img src={require("~/assets/invent/Yaoqing201902/invent_h5_red2@2x.png")} />
              <p>活动期间被邀请的好友，每有1位出借总金额满足以下条件，您都可获得1次额外奖励红包：</p>
            </div>
          </div>

          {
            userId ?
              <table className={styles.tableBox}>
                <tbody>
                <tr>
                  <td>每位好友活动期<br/>间出借总金额</td>
                  <td>额外奖励红包</td>
                  <td>您已获得</td>
                </tr>
                <tr>
                  <td>2000元≤好友出借<br/>总金额＜5000元</td>
                  <td>28元</td>
                  <td>{userId?detail.listTwo.one:'0'}次</td>
                </tr>
                <tr>
                  <td>5000元≤好友出借<br/>总金额＜10000元</td>
                  <td>58元</td>
                  <td>{userId?detail.listTwo.two:'0'}次</td>
                </tr>
                <tr>
                  <td>10000元≤好友出借<br/>总金额＜20000元</td>
                  <td>88元</td>
                  <td>{userId?detail.listTwo.three:'0'}次</td>
                </tr>
                <tr>
                  <td>20000元≤好<br/>友出借总金额</td>
                  <td>200元</td>
                  <td>{userId?detail.listTwo.four:'0'}次</td>
                </tr>
                </tbody>
              </table>
              :
              <table className={styles.tableBox}>
                <tbody>
                <tr>
                  <td>每位好友活动期<br/>间出借总金额</td>
                  <td>额外奖励红包</td>
                </tr>
                <tr>
                  <td>2000元≤好友出借<br/>总金额＜5000元</td>
                  <td>28元</td>
                </tr>
                <tr>
                  <td>5000元≤好友出借<br/>总金额＜10000元</td>
                  <td>58元</td>
                </tr>
                <tr>
                  <td>10000元≤好友出借<br/>总金额＜20000元</td>
                  <td>88元</td>
                </tr>
                <tr>
                  <td>20000元≤好<br/>友出借总金额</td>
                  <td>200元</td>
                </tr>
                </tbody>
              </table>
          }

          <p className={styles.TwoFooterP}>额外奖励红包将于2月25日活动结束后统一发放，最多可获得10次，按最高奖励。</p>
        </div>
        {
          userId
            ?
            <div className={styles.TwoFooterBox}>
              <img src={require("~/assets/invent/Yaoqing201902/invent_h5_wordinfo@2x.png")}/>
              {
                detail.listTwo.totalNum!==0
                  ?
                  <p>您已获得<span>{detail.listTwo.totalNum}</span>次额外奖励红包，共<span>{numberFormat(parseInt(detail.listTwo.totalReward,10)/100)}</span>元，还可获得{detail.listTwo.residualNum}次</p>
                  :
                  <p>您尚未获得额外奖励红包，还可获得2000元。</p>
              }
            </div>
            :
            null
        }



      </div>
    )
  }

}

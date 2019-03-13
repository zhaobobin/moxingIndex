import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './CouponsList.less'

import CusListView from '~/components/List/CusListView'
import CouponsItem from '~/components/Account/CouponsManage/CouponsItem'

@connect(state => ({
  global: state.global,
}))
export default class CouponsList extends React.Component {

  constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.state = {
      loading: true,
      total: null,
      list: '',
    }
  }

  queryCallback = (values) => {
    if(!values) return;
    this.setState({
      total: values.count
    })
  };

  render(){

    const {userId} = this.props.global.currentUser.userInfo;
    const {total} = this.state;

    const listNull = (
      <div className={styles.listNull}>
        <img src={require('~/assets/com/no_redenvelopes@2x.png')} alt="null"/>
        <p>优惠券福利陆续来袭，敬请留意平台动态！</p>
      </div>
    );

    return(
      <div className={styles.container}>

        <div className={styles.content}>

          <div className={styles.head}>
            <span className={styles.left}>
              {
                total > 0 ?
                  `共${total}张可用`
                  :
                  null
              }
            </span>
            <span className={styles.right}><Link to="/account/coupons-desc">使用规则</Link></span>
          </div>

          <div className={styles.body}>
            <CusListView
              api="/api/userCoupon/pc/findMyCoupon"
              payload={{
                userId: 19010310321353,                 //19010310321353
                isAbleUse: 0,
              }}
              pageSize={10}
              useBodyScroll={false}
              renderHeader={false}
              renderRow={<CouponsItem/>}
              listNull={listNull}
              callback={this.queryCallback}
            />
          </div>

        </div>

      </div>
    )
  }

}

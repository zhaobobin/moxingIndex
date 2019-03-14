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
    this.state = {
      total: null,
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
              queryParams={{
                userId,                 //19010310321353
                isAbleUse: 0,
              }}
              listViewProps={{
                pageSize: 10,
                useBodyScroll: false,
                renderHeader: false,
                renderItem: (item, id) => <CouponsItem item={item} id={id}/>
              }}
              callback={this.queryCallback}
            />
          </div>

        </div>

      </div>
    )
  }

}

import React from 'react';
import { Link } from 'dva/router';
import styles from './CouponsItem.less'

export default class CouponsItem extends React.Component {

  render(){

    const { id, item } = this.props;

    return(
      <div key={id} className={styles.item}>

        {
          item.title === 'ListNull' ?
            <div className={styles.empty}>
              <img src={require('~/assets/com/no_redenvelopes@2x.png')} alt="null"/>
              <p>优惠券福利陆续来袭，敬请留意平台动态！</p>
            </div>
            :
            <div className={styles.detail}>

            </div>
        }

      </div>
    )
  }

}

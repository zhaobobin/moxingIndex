import React from 'react';
import { Link } from 'dva/router';
import styles from './CouponsItem.less'

export default class CouponsItem extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      height: '110px',
    }
  }

  toogle = () => {
    let {height} = this.state;
    this.setState({
      height: height === 'auto' ? '110px' : 'auto'
    })
  };

  render(){

    const { id, item } = this.props;
    const { height } = this.state;

    const Amount = item.couponAmount ? item.couponAmount.split('.') : [];

    return(
      <div key={id} className={styles.item}>

        {
          item.title === 'ListNull' ?
            <div className={styles.empty}>
              <img src={require('~/assets/com/no_redenvelopes@2x.png')} alt="null"/>
              <p>优惠券福利陆续来袭，敬请留意平台动态！</p>
            </div>
            :
            <div className={styles.detail} style={{height: height}}>

              <div className={styles.left + " " + item.couponType === 3 ? styles.blue : styles.orange}>
                <p className={styles.p1}>
                  <span className={styles.sp1}>{Amount[0]}</span>
                  <span>.</span>
                  <span>{Amount[1]}</span>
                  <em>{item.couponType === 3 ? '%' : '元'}</em>
                </p>
                <p>
                  <span>{item.couponType === 3 ? '加息券' : '红包'}</span>
                </p>
              </div>

              <div className={styles.right}>
                <dl>
                  <dt>{item.amountLimit}</dt>
                  <dd>
                    <p>{item.termOfValidity}</p>
                    <p>{item.periodLimit}</p>
                    <p>{item.useExplain}</p>
                    <p>{item.gainSource}</p>
                  </dd>
                </dl>
              </div>

              <i
                onClick={this.toogle}
                className={styles.toggle + " " + height === 'auto' ? styles.up : styles.down}
              />

            </div>
        }

      </div>
    )
  }

}

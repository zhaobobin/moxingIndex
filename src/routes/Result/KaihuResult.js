import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import styles from './Result.less'

import img_success from '~/assets/com/success@2x.png'

@connect(state => ({
  global: state.global,
}))
export default class KaihuResult extends React.Component {

  redirect = (action) => {
    window.location.href = 'http://m.qutouwang.com?action=' + action;
  };

  render(){
    return(
      <div className={styles.result}>
        <img src={img_success} alt="img_result"/>
        <h1>恭喜，183****1429 <br/> 已成功开通银行存管！</h1>
        <p className={styles.desc}>开通CA电子认证，交易安全更放心</p>
        <div className={styles.btns}>
          <Button type="primary" onClick={() => this.redirect('open')}>安心签电子认证</Button>
        </div>
      </div>
    )
  }

}

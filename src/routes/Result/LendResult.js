import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import styles from './Result.less'

import img_success from '~/assets/com/success@2x.png'

@connect(state => ({
  global: state.global,
}))
export default class LendResult extends React.Component {

  redirect = (action) => {
    window.location.href = 'http://m.qutouwang.com?action=' + action;
  };

  render(){
    return(
      <div className={styles.result}>
        <img src={img_success} alt="img_result"/>
        <h1>出借成功！</h1>
        <div className={styles.btns}>
          <Button type="primary" onClick={() => this.redirect('lend')}>继续出借</Button>
        </div>
      </div>
    )
  }

}

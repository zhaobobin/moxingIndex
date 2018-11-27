import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import styles from './Result.less'

import img_success from '~/assets/com/success@2x.png'
import ResultJson from './ResultJson'

@connect(state => ({
  global: state.global,
}))
export default class ZxfwResult extends React.Component {

  redirect = (action) => {
    window.location.href = window.location.href + '?action=' + action;
  };

  render(){
    return(
      <div className={styles.result}>
        <img src={img_success} alt="img_result"/>
        <h1>授权出借成功!</h1>
        <div className={styles.btns}>
          <Button onClick={() => this.redirect(ResultJson.look.action)}>查看我的出借</Button>
          <Button type="primary" onClick={() => this.redirect(ResultJson.lend.action)}>继续出借</Button>
        </div>
      </div>
    )
  }

}

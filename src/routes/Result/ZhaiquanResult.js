import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import {ENV} from '~/utils/utils'
import styles from './Result.less'

import img_success from '~/assets/com/success@2x.png'
import ResultJson from './ResultJson'

@connect(state => ({
  global: state.global,
}))
export default class ZhaiquanResult extends React.Component {

  redirect = (action) => {
    window.location.href = ENV.siteUrl + '?action=' + action;
  };

  render(){
    return(
      <div className={styles.result}>
        <img src={img_success} alt="img_result"/>
        <h1>转让成功！</h1>
        <div className={styles.btns}>
          <Button type="primary" onClick={() => this.redirect(ResultJson.lend.action)}>查看我的转让</Button>
        </div>
      </div>
    )
  }

}

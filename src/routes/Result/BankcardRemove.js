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
export default class BankcardRemove extends React.Component {

  redirect = (action) => {
    window.location.href = ENV.siteUrl + '?action=' + action;
  };

  render(){
    return(
      <div className={styles.result}>
        <img src={img_success} alt="img_result"/>
        <h1>恭喜您，解绑银行卡成功</h1>
        <div className={styles.btns}>
          <Button type="primary" icon="plus" onClick={() => this.redirect(ResultJson.addcard.action)}>添加新银行卡</Button>
        </div>
      </div>
    )
  }

}

import React from 'react';
import styles from './Result.less'

import img_success from '~/assets/com/success@2x.png'
import ResultJson from './ResultJson'

export default class JihuoResult extends React.Component {

  render(){

    return(
      <div className={styles.result}>
        <img src={img_success} alt="img_result"/>
        <h1>恭喜您，存管账户激活成功！</h1>
      </div>
    )
  }

}

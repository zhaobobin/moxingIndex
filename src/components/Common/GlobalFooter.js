import React from 'react';
import { connect } from 'dva';
import { ENV } from '~/utils/utils'
import styles from './GlobalFooter.less'

export default function GlobalFooter () {

  return(
    <div className={styles.footer}>
      <p>
        <span>© 2019 趣族 app.hobbyzone.com</span>
        <span>中国互联网举报中心</span>
        <span>京ICP证000000号</span>
        <span>京ICP备00000号-3</span>
        <span>京公网安备 12312312121212112号</span>
      </p>
      <p>
        <span>网络文化经营许可证跟帖评论自律管理承诺书</span>
        <span>公司名称：北京xxx有限公司</span>
      </p>
    </div>
  )

}

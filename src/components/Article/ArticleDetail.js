/**
 * 文章详情
 */
import React from 'react';
import { Link } from 'dva/router';
import Moment from 'moment';

import styles from './ArticleDetail.less';

const ArticleDetail = (props) => {
   const detail = props;

  return(
    <div className={styles.detail}>
      <div className={styles.head}>

      </div>
      <div className={styles.body}>
        {
          detail ?
            <div className={styles.content} dangerouslySetInnerHTML={{__html: detail}} />
            :
            null
        }
      </div>
      <div className={styles.foot}>

      </div>
    </div>
  )
};

export default ArticleDetail;

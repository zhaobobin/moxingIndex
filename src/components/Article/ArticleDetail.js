/**
 * 文章详情
 */
import React from 'react';
import { Link } from 'dva/router';
import Moment from 'moment';

import styles from './ArticleDetail.less';

const ArticleDetail = ({detail, hideHead}) => {

  return(
    <div className={styles.detail}>

      {
        hideHead ?
          null
          :
          <div className={styles.head}>
            <h1>{detail.title}</h1>
            <p className={styles.info}>
              <span>{detail.date}</span>
              <span>来源：{detail.source}</span>
            </p>
          </div>
      }

      <div className={styles.body}>
        {
          detail ?
            <div className={styles.content} dangerouslySetInnerHTML={{__html: detail.content}} />
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

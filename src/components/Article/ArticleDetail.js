/**
 * 文章详情
 */
import React from 'react';
import moment from 'moment';

import styles from './ArticleDetail.less';

const ArticleDetail = ({detail, hideHead}) => {

  return(
    <div className={styles.detail}>

      {
        hideHead ?
          null
          :
          <div className={styles.head} align="center">
            <h1>{detail.title}</h1>
            <p className={styles.info}>
              <span>{moment(detail.releaseTime).format('YYYY-MM-DD')}</span>
              {
                detail.source ?
                  <span>来源：{detail.source}</span>
                  :
                  null
              }
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

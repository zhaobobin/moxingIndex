import React from 'react';
import { Link } from 'dva/router';
import styles from './InviteList.less'

export default function InviteList ({item, id}) {

  return(
    <div key={id} className={styles.item}>

      {
        item.title === 'ListNull' ?
          <div className={styles.empty}>
            <img src={require('~/assets/com/no_redenvelopes@2x.png')} alt="null"/>
            <p>优惠券福利陆续来袭，敬请留意平台动态！</p>
          </div>
          :
          <div className={styles.detail}>
            <div
              style={{
                lineHeight: '50px',
                color: '#888',
                fontSize: 18,
                borderBottom: '1px solid #F6F6F6',
              }}
            >{item.title}</div>
            <div style={{ display: 'flex', padding: '15px 0' }}>
              <img style={{ height: '64px', marginRight: '15px' }} src={item.img} alt="" />
              <div style={{ lineHeight: 1 }}>
                <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{item.des}</div>
                <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>35</span>¥</div>
              </div>
            </div>
          </div>
      }

    </div>
  )

}

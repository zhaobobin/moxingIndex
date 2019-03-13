import React from 'react';
import { Link } from 'dva/router';
import styles from './CouponsDesc.less'

import AccountJson from '~/routes/Account/AccountJson'
const coupons = AccountJson.coupons;

export default function CouponsDesc () {

  return(
    <div className={styles.container}>

      <div className={styles.content}>
        <dl>
          <dt>{coupons.desc1.title}</dt>
          <dd>
            {
              coupons.desc1.list.map((item, index) => (
                <p key={index}>{item}</p>
              ))
            }
          </dd>
        </dl>

        <dl>
          <dt>{coupons.desc2.title}</dt>
          <dd>
            {
              coupons.desc2.list.map((item, index) => (
                <p key={index}>{item}</p>
              ))
            }
          </dd>
        </dl>
      </div>

    </div>
  )

}

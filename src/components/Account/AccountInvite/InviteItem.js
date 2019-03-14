import React from 'react';
import { Link } from 'dva/router';
import { Button } from 'antd'
import { Toast } from 'antd-mobile';
import copy from 'copy-to-clipboard';
import styles from './InviteItem.less'

import HelpModal from '~/components/Dialog/HelpModal'

function copyLink (url) {
  copy(url);
  Toast.info('邀请好友链接已复制成功，可分享给好友', 2);
}

const iconStyle = {color: '#9EACBB', border: '1px solid #9EACBB', borderRadius: '50%'};

export default function InviteItem (props) {

  return(
    <div key={props.id} className={styles.item}>

      {
        props.item.title === 'ListNull' ?
          <div className={styles.empty}>
            <img src={require('~/assets/com/no_record@2x.png')} alt="null"/>
            <p>暂无数据</p>
            <Button type="primary" onClick={() => copyLink(props.webUrl)}>立即邀请</Button>
          </div>
          :
          <div className={styles.detail}>
            <p>
              <span className={styles.sp1}>{props.item.receiverPhone}</span>
              <span className={styles.sp2}>
                {props.item.invitationAmt || '--'}
                <HelpModal style={iconStyle} msg={'邀请好友奖励（示例）'}/>
              </span>
              <span className={styles.sp3}>{props.item.regTime}</span>
            </p>
          </div>
      }

    </div>
  )

}

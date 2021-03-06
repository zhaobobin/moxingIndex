/**
 * 提示框
 */
import React from 'react';
import { Modal } from 'antd';
import CountDown from '~/components/Common/Number/CountDown';
import styles from './Dialog.less'

const modal_width = '500px';

const modal_options = {
  width: modal_width,
  centered: true,
  destroyOnClose: true,
  zIndex: 1000,
};

export function Alert(opt){
  Modal.info({
    maskClosable: true,
    title: (
      <p className={styles.dialogTitle}>{opt.title}</p>
    ),
    content: (
      <div className={styles.dialogContent}>
        <span>{opt.content}</span>
      </div>
    ),
    okText: opt.btns || '确定',
    onOk() {
      return opt.callback(1)
    },
    onCancel() {
      return opt.callback(0)
    },
  });
}

export function Confirm(opt){
  Modal.confirm({
    ...modal_options,
    maskClosable: false,
    title: (
      <p className={styles.dialogTitle}>{opt.title}</p>
    ),
    okText: opt.btns ? opt.btns[0] : '确定',
    cancelText: opt.btns ? opt.btns[1] : '取消',
    onOk() {
      return opt.callback(1)
    },
    onCancel() {
      return opt.callback(0)
    },
  });
}

export function ResultAlert(opt){
  let modal = Modal.info({
    ...modal_options,
    maskStyle: opt.maskStyle || {},
    maskClosable: false,
    title: '',
    content: (
      <div className={styles.dialogContent}>
        <img src={opt.img} alt="" />
        <p><strong>{opt.title}</strong></p>
        <p>
          {
            opt.time ?
              <CountDown
                num={opt.time}
                onEnd={() => {
                  modal.destroy();
                  opt.callback(0);            //自动关闭
                }}
              />
              :
              null
          }
          <span>{opt.msg}</span>
        </p>
      </div>
    ),
    okText: opt.btns ? opt.btns[0] : '确定',
    onOk() {
      return opt.callback(1)                  //手动关闭
    },
    onCancel() {
      return opt.callback(0)
    },
  });
}

export function ResultConfirm(opt){
  Modal.confirm({
    ...modal_options,
    maskClosable: false,
    title: '',
    content: (
      <div className={styles.dialogContent}>
        <img src={opt.img} alt="" />
        <p><strong>{opt.title}</strong></p>
        <p><span>{opt.msg}</span></p>
      </div>
    ),
    okText: opt.btns ? opt.btns[0] : '确定',
    cancelText: opt.btns ? opt.btns[1] : '取消',
    onOk() {
      return opt.callback(1)
    },
    onCancel() {
      return opt.callback(0)
    },
  });
}

export function ArticleAlert(opt){
  Modal.info({
    ...modal_options,
    maskClosable: false,
    title: (
      <h1 className={styles.ArticleTitle}>{opt.title}</h1>
    ),
    content: (
      <div className={styles.ArticleDetail} dangerouslySetInnerHTML={{__html: opt.msg}}/>
    ),
    okText: opt.btns ? opt.btns[0] : '确定',
    onOk() {
      return opt.callback(1)
    },
    onCancel() {
      return opt.callback(0)
    },
  });
}

export function ArticleConfirm(opt){
  Modal.confirm({
    ...modal_options,
    maskClosable: false,
    title: (
      <h1 className={styles.ArticleTitle}>{opt.title}</h1>
    ),
    content: (
      <div className={styles.ArticleDetail} dangerouslySetInnerHTML={{__html: opt.msg}}/>
    ),
    okText: opt.btns ? opt.btns[0] : '确定',
    cancelText: opt.btns ? opt.btns[1] : '取消',
    onOk() {
      return opt.callback(1)
    },
    onCancel() {
      return opt.callback(0)
    },
  });
}

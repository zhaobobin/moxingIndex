import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {ENV, Storage} from "~/utils/utils";
import styles from './Register.less';

import logo from '~/assets/com/logo.png'
import img_success from '~/assets/com/pop_success@2x.png'

@connect(state => ({
  global: state.global,
}))
export default class RegisterResult extends React.Component {

  render(){

    const {userInfo} = this.props.global.currentUser;

    return(
      <div className={styles.container}>

        {/*<div className={styles.header}>*/}
          {/*<img src={logo} alt="logo"/>*/}
          {/*<h1>注册去投网</h1>*/}
        {/*</div>*/}

        <div className={styles.result}>
          <img src={img_success} alt="result"/>
          <h2>恭喜您，注册成功</h2>
          <p>580元红包已发放至您的账户</p>
        </div>

        <div className={styles.download}>
          <Link
            to="/download"
            className={styles.link}
            style={{marginBottom: '120px'}}
          >
            立即下载APP
          </Link>
          <p>
            <span>{ENV.icp}</span>
            <span>|</span>
            <span>{ENV.beian}</span>
          </p>
          <p><span>{ENV.address}</span></p>
        </div>

      </div>
    )
  }

}

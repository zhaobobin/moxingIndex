import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router'
import styles from './GlobalHeader.less'

import logo from '~/assets/com/m_nav_logo@2x.png'
import account from '~/assets/com/m_myaccount@2x.png'

@connect(state => ({
  global: state.global,
}))
export default class GlobalHeader extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      title: 'NavBar'
    }
  }

  goBack = () => {
    window.history.go(-1)
  };

  render(){

    return(
      <div className={styles.head}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="logo"/>
        </Link>
        <Link to="/account" className={styles.account}>
          <img src={account} alt=""/>
        </Link>
      </div>
    )
  }

}

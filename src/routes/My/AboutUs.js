import React from 'react'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List } from 'antd-mobile';
import styles from './AboutUs.less'

const Item = List.Item;

@connect(state => ({
  global: state.global,
}))
export default class AboutUs extends React.Component{

  render(){
    return(
      <div className={styles.container}>

        <div className={styles.head}>
          <img src={require('~/assets/com/logo2.png')} alt="logo"/>
          <p>趣族</p>
        </div>

        <div className={styles.menu}>
          <List>
            <Item
              arrow="horizontal"
              onClick={() => {
                this.props.dispatch(routerRedux.push('/download'))
              }}
            >下载APP</Item>
          </List>
        </div>

      </div>
    )
  }

}

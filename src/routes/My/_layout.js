import React from 'react'
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { List, Modal } from 'antd-mobile';
import styles from './_layout.less'

import UserinfoCard from '~/components/My/UserinfoCard'

const Item = List.Item;

@connect(state => ({
  global: state.global,
}))
export default class _layout extends React.Component{

  logout = () => {
    Modal.alert('', '确定退出吗?', [
      { text: '取消', onPress: () => {} },
      { text: '确定', onPress: () => {
          this.props.dispatch({
            type: 'global/logout',
            payload: {},
            callback: () => {
              this.props.dispatch(routerRedux.push('/m/activity/list'))
            }
          })
      }},
    ])
  }

  render(){
    return(
      <div className={styles.container}>
        <UserinfoCard detail={{ name: '老番茄', avatar: '' }}/>

        <div className={styles.menu}>
          <List>
            <Item
              thumb={require('~/assets/my/menu01.png')}
              arrow="horizontal"
              onClick={() => {
                this.props.dispatch(routerRedux.push('/m/my/ticket'))
              }}
            >我的门票</Item>
            <Item
              thumb={require('~/assets/my/menu02.png')}
              onClick={() => {
                this.props.dispatch(routerRedux.push('/m/my/about'))
              }}
              arrow="horizontal"
            >
              关于我们
            </Item>
            <Item
              thumb={require('~/assets/my/menu03.png')}
              onClick={this.logout}
              arrow="horizontal"
            >
              安全退出
            </Item>
          </List>
        </div>

      </div>
    )
  }

}

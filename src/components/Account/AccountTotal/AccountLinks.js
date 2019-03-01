import React from 'react';
import { connect } from 'dva';
import { Link, routerRedux } from 'dva/router';
import { List } from 'antd-mobile';
import styles from './AccountLinks.less'

const Item = List.Item;

@connect(state => ({
  global: state.global,
}))
export default class AccountLink extends React.Component {

  direct = (url) => {
    this.props.dispatch(routerRedux.push(url))
  };

  render(){
    return(
      <List className={styles.links}>

        <Item
          arrow="horizontal"
          extra="资金流水清晰"
          thumb={require('~/assets/account/my_cleartrade@2x.png')}
          onClick={() => this.direct('/account/record')}
        >
          交易记录
        </Item>

      </List>
    )
  }

}

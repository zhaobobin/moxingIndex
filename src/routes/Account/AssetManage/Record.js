/**
 * 交易记录
 */
import React from 'react';
import { connect } from 'dva';
import { Tabs } from 'antd-mobile';
import styles from './Record.less'

import CusListView from '~/components/List/CusListView'
import InviteItem from '~/components/Account/AccountInvite/InviteItem'

@connect(state => ({
  global: state.global,
}))
export default class Record extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      cashType: 0,
      total: null,
    }
  }

  queryCallback = (values) => {
    //if(!values) return;
    // this.setState({
    //   total: values.count,
    // })
  };

  render(){

    const { userId } = this.props.global.currentUser.userInfo;
    const { total, cashType } = this.state;

    const tabs = [
      { title: '全部', sub: '1', value: 0 },
      { title: '充值', sub: '2', value: 1 },
      { title: '出借', sub: '3', value: 2 },
      { title: '回款', sub: '4', value: 3 },
      { title: '提现', sub: '5', value: 4 },
      { title: '奖励', sub: '6', value: 5 },
      { title: '服务费', sub: '7', value: 6 },
      { title: '债权转让', sub: '8', value: 9 },
      { title: '其他', sub: '9', value: 10 },
    ];

    return(
      <div className={styles.record}>

        <div className={styles.head}>
          <Tabs
            tabs={tabs}
            prerenderingSiblingsNumber={false}
            onTabClick={(tab, index) => this.setState({cashType: tab.value})}
          >
            {
              tabs.map((item, index) => (
                <div
                  key={index}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}
                >
                  Content of first tab {index}
                </div>
              ))
            }
          </Tabs>
        </div>

        <CusListView
          api="/api/userAccountInfo/findUserTradeRecordsPC"
          queryParams={{
            userId,                 //19010310321353
            cashType
          }}
          listViewProps={{
            pageSize: 10,
            useBodyScroll: false,
            renderHeader: false,
            renderItem: (item, id) => <InviteItem item={item} id={id}/>
          }}
          callback={this.queryCallback}
        />

      </div>
    )
  }
}

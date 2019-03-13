import React from 'react';
import {ReactDom} from 'react-dom';
import { connect } from 'dva';
import { PullToRefresh, ListView, Button } from 'antd-mobile';
import styles from './CusListView.less'

const data = [
  {
    img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
    title: 'Meet hotel',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
    title: 'McDonald\'s invites you',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
  {
    img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
    title: 'Eat the week',
    des: '不是所有的兼职汪都需要风吹日晒',
  },
];
const NUM_ROWS = 20;

function getData(len) {
  let pIndex = 0;
  const dataArr = [];
  for (let i = 1; i <= len; i++) {
    dataArr.push(`row - ${(pIndex * len) + i}`);
  }
  console.log(dataArr)
  return dataArr;
}

@connect(state => ({
  global: state.global,
}))
export default class CusListView extends React.Component {

  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.state = {
      dataSource,
      refreshing: false,
      isLoading: false,
      height: document.documentElement.clientHeight,
      defaultBodyScroll: false,

      pageNun: 1,
      pageSize: 10,
      list: [],
      hasMore: true,
    };
  }

  componentDidMount() {
    this.initList();
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource !== this.props.dataSource) {
      // this.setState({
      //   dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
      // });
    }
  }

  //查询列表
  queryList = (action) => {
    let {api, payload, pageSize} = this.props;
    this.props.dispatch({
      type: 'global/post',
      url: api,
      payload: payload,
      callback: (res) => {
        if(res.code === 0){

          this.props.callback(res.data);

          let {list, pageNum, hasMore} = this.state;
          if(res.data.list){
            hasMore = res.data.list.length === pageSize
          }else{
            hasMore = false
          }
          if(action === 'loadMore'){
            if(res.data.list) list = this.state.list.concat(res.data.list);
            pageNum = this.state.hasMore + 1 ;
          }else{
            if(res.data.list) list = res.data.list;
            pageNum = 1;
            this.lv.scrollTo(0, 0);       //滚动到顶部
          }
          this.rData = getData(list.length);
          this.setState({
            refreshing: false,
            isLoading: false,
            dataSource: this.state.dataSource.cloneWithRows(this.rData),
            list: list,
            pageNun: pageNum,
            hasMore: hasMore
          })

        }
      }
    });
  };

  //初始化列表
  initList = () => {
    this.queryList('init');
  };

  //刷新列表
  refreshList = () => {
    this.setState({ refreshing: true });
    this.queryList('reFresh');
  };

  //查询更多
  queryMoreList = () => {
    if (this.state.isLoading || !this.state.hasMore) return;
    this.setState({ isLoading: true });
    this.queryList('loadMore');
  };

  render() {

    const {pageSize, renderHeader, useBodyScroll, renderRow, listNull} = this.props;
    const {isLoading, defaultBodyScroll, height, dataSource, list, refreshing} = this.state;

    let index = data.length - 1;
    const listItem = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      return (
        <div
          key={rowID}
          style={{
            marginBottom: '10px',
            padding: '0 15px',
            background: '#fff',
          }}
        >
          <div style={{ height: '50px', lineHeight: '50px', color: '#888', fontSize: '18px', borderBottom: '1px solid #ddd' }}>
            {obj.title}
          </div>
          <div style={{ display: 'flex', padding: '15px 0 15px 15px' }}>
            <img style={{ height: '63px', width: '63px', marginRight: '15px' }} src={obj.img} alt="" />
            <div style={{ display: 'inline-block' }}>
              <div style={{ marginBottom: '8px', color: '#000', fontSize: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '250px' }}>{obj.des}-{rowData}</div>
              <div style={{ fontSize: '16px' }}><span style={{ fontSize: '30px', color: '#FF6E27' }}>{rowID}</span> 元/任务</div>
            </div>
          </div>
        </div>
      );
    };

    return (
      <ListView
        className={styles.container}
        ref={el => this.lv = el}
        pageSize={pageSize || 10}
        style={{height: height}}
        useBodyScroll={useBodyScroll || defaultBodyScroll}
        dataSource={dataSource}
        renderRow={listItem}

        renderHeader={renderHeader || false}
        renderBodyComponent={() => <div className={styles.body} />}
        renderFooter={() => (
          <div className={styles.footer}>
            {isLoading ? '数据加载中...' : null}
          </div>
        )}

        pullToRefresh={
          <PullToRefresh
            refreshing={refreshing}
            onRefresh={this.refreshList}
          />
        }
        onEndReached={this.queryMoreList}
      />
    );
  }
}



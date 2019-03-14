import React from 'react';
import { connect } from 'dva';
import { PullToRefresh, ListView } from 'antd-mobile';
import styles from './CusListView.less'

const data = [
  {
    title: 'ListNull',
    desc: '暂无数据',
  },
];

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
      list: data,
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
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     });
  //   }
  // }

  //依据列表长度，生成key数组
  getData = (len) => {
    let pIndex = 0;
    const dataArr = [];
    for (let i = 0; i < len; i++) {
      dataArr.push(`row - ${(pIndex * len) + i}`);
    }
    //console.log(dataArr)
    return dataArr;
  };

  //查询列表
  queryList = (action) => {
    let {api, queryParams, listViewProps: {pageSize}} = this.props;
    this.props.dispatch({
      type: 'global/post',
      url: api,
      payload: queryParams,
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

          this.rData = this.getData(list.length);
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

    const {pageSize, renderHeader, useBodyScroll, renderItem} = this.props.listViewProps;
    const {isLoading, defaultBodyScroll, height, dataSource, list, refreshing} = this.state;

    let index = list.length - 1;
    const renderRow = (rowData, sectionID, rowID) => {
      //console.log(index)
      if (index < 0) index = list.length - 1;
      const item = list[index--];
      return renderItem(item, rowID);
    };

    return (
      <ListView
        className={styles.container}
        ref={el => this.lv = el}
        pageSize={pageSize || 10}
        style={{height: height}}
        useBodyScroll={useBodyScroll || defaultBodyScroll}
        dataSource={dataSource}
        renderRow={renderRow}

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



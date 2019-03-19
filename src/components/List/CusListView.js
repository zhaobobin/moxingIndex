/**
 * 自定义ListView
 * api [String] 查询接口
 * queryParams [Object] 查询参数
 * listViewProps [Object] listView自定义参数，支持自定义renderHeader,renderBodyComponent,renderFooter,renderItem
 * callback [Function] 查询结果回调
 * 备注: 初始状态渲染emptyData，查询结果有数据时重新渲染，emptyData样式在自定义renderItem中设置。
 */
import React from 'react';
import { connect } from 'dva';
import { PullToRefresh, ListView } from 'antd-mobile';
import { difference } from '~/utils/utils'
import styles from './CusListView.less'

const _ = require('lodash');

//空状态
const emptyData = [
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
    this.ajaxFlag = true;
    this.state = {
      dataSource,
      refreshing: false,
      isLoading: false,
      height: document.documentElement.clientHeight - 46,
      defaultBodyScroll: false,

      queryParams: '',
      pageNum: 1,
      pageSize: 10,
      dataList: [],                         //记录用数组
      renderList: [],                       //渲染用数组
      hasMore: true,
    };
  }

  componentDidMount() {
    this.initList(this.props.queryParams);
    if (this.state.useBodyScroll) {
      document.body.style.overflow = 'auto';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(nextProps.queryParams) !== JSON.stringify(this.props.queryParams)) {
      this.initList(nextProps.queryParams);
    }
  }

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

  //遍历数据列表
  forDataList = ({action, sortBy, resList}) => {

    //let {dataList, renderList} = this.state;

    let dataList = [], renderList = [];

    if(action === 'loadMore'){
      dataList = this.state.dataList.concat(resList);
    }else{
      dataList = resList;
    }

    //排序
    if(sortBy){
      let arr = [];
      for(let i in dataList){
        dataList[i][sortBy + '2'] = dataList[i][sortBy].split(' ')[0];
        arr.push(dataList[i]);
      }
      let obj = _.groupBy(arr, sortBy + '2');
      for(let i in obj){
        renderList.push({label: i, list: obj[i]})
      }
    }else{
      renderList = dataList;
    }

    //console.log(renderList)
    return {dataList, renderList}
  };

  //查询列表
  queryList = (action, queryParams) => {

    if(!this.ajaxFlag) return;
    this.ajaxFlag = false;

    let {api, listViewProps} = this.props;
    let { sortBy, pageSize } = listViewProps;
    this.props.dispatch({
      type: 'global/post',
      url: api,
      payload: {
        ...queryParams,
        pageNum: this.state.pageNum,
        pageSize: pageSize || this.state.pageSize,
      },
      callback: (res) => {
        setTimeout(() => {this.ajaxFlag = true}, 500);
        if(res.code === 0){

          this.props.callback(res.data);
          let {dataList, renderList, hasMore, pageNum} = this.state;

          //是否有数据
          if(res.data.list && res.data.list.length > 0){
            let forDataRes = this.forDataList({action, sortBy, resList: res.data.list});
            dataList = forDataRes.dataList;
            renderList = forDataRes.renderList;
            pageNum = pageNum + 1;
            hasMore = res.data.list.length === pageSize;
          }else{
            dataList = emptyData;
            renderList = emptyData;
            pageNum = 1;
            hasMore = false;
          }

          this.rData = this.getData(renderList.length);
          setTimeout(() => {
            this.setState({
              refreshing: false,
              isLoading: false,
              dataSource: this.state.dataSource.cloneWithRows(this.rData),
              dataList: dataList,
              renderList: renderList,
              hasMore: hasMore,
              pageNum: pageNum,
              queryParams: queryParams,
            })
          }, 500)

        }
      }
    });
  };

  //初始化列表
  initList = (queryParams) => {
    this.lv.scrollTo(0, 0);       //滚动到顶部
    this.setState({ isLoading: true, hasMore: true, pageNum: 1 });
    setTimeout(() => {
      this.queryList('init', queryParams);
    }, 500)
  };

  //刷新列表
  refreshList = () => {
    this.lv.scrollTo(0, 0);       //滚动到顶部
    this.setState({ refreshing: true, hasMore: true, pageNum: 1 });
    setTimeout(() => {
      this.queryList('reFresh', this.state.queryParams);
    }, 500)
  };

  //查询更多
  queryMoreList = () => {
    if (this.state.isLoading || !this.state.hasMore) return;
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.queryList('loadMore', this.state.queryParams);
    }, 500)
  };

  render() {

    const {pageSize, renderHeader, useBodyScroll, renderItem} = this.props.listViewProps;

    const {isLoading, defaultBodyScroll, height, dataSource, renderList, refreshing} = this.state;

    let index = renderList.length - 1;
    const renderRow = (rowData, sectionID, rowID) => {
      //console.log(index)
      if (index < 0) index = renderList.length - 1;
      const item = renderList[index--];
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



/**
 * 活动 - 列表
 */
import React from 'react'
import {connect} from 'dva';
import {Toast} from 'antd-mobile';
import styles from './ActivityList.less'

import InfiniteScroll from 'react-infinite-scroller';			// 无限加载
import ActivityListItem from '~/components/Activity/ActivityListItem'

@connect(state => ({
  global: state.global,
}))
export default class ActivityList extends React.Component{

  constructor(props){
    super(props);
    this.ajaxFlag = true;
    this.state = {
      loading: true,
      list: [],

      page: 1,
      per_page: 10,
      hasMore: false,
    }
  }

  componentDidMount(){
    this.queryList()
  }

  queryList = (params) => {
    this.props.dispatch({
      type: 'global/post',
      url: '/api/activities/index',
      payload: {},
      callback: (res) => {
        setTimeout(() => { this.ajaxFlag = true }, 500)
        if (res.code === '0') {
          this.setState({
            list: res.data,
            // hasMore: res.data.length > 10
          })
        } else {
          Toast.info(res.msg, 2);
        }
      }
    })
  }

  //Masonry布局 - 滚动加载更多
  LoadMore = (page) => {

    if(!page) return;
    let {per_page, hasMore} = this.state;

    if(!hasMore) return;

    if(!this.ajaxFlag) return;
    this.ajaxFlag = false;

    let _this = this;
    setTimeout(function(){
      _this.queryList({
        page: page + 1,
        per_page
      });
    }, 200)
  };

  render(){

    const { list, hasMore } = this.state;

    return(
      <div className={styles.container}>

        <InfiniteScroll
          pageStart={0}
          initialLoad={false}
          loadMore={this.LoadMore}
          hasMore={hasMore}
        >
          {
            list.map((item, index) => (
              <ActivityListItem item={item} index={index} />
            ))
          }
        </InfiniteScroll>

      </div>
    )
  }

}

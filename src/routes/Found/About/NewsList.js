import React from 'react';
import { connect } from 'dva';
import { Link  } from 'dva/router';
import styles from './Newlist.less';
import ToastLoading from '~/components/Common/ToastLoading'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
@connect(state => ({
  global: state.global,
}))
export default class NewsList extends React.Component {
constructor(props){
  super(props);
  this.ajaxFlag = true;
  this.loading = true;
  this.state = {
    newslistappApi: '/api/home/pc/findPcNewsList',
    newslistapp: [],
    /*total:0,
    pageNum:1,
    pageSize:5*/
  }
}
  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.keywords !== this.props.match.params.keywords) {
      let keywords = nextProps.match.params.keywords;
      console.log(keywords);
    }
  }
  componentDidMount(){
    this.getNewMediaData();
  }
  getNewMediaData = () => {
    let {newslistappApi, newslistapp,pageNum,pageSize} = this.state;
    if (!this.ajaxFlag) return;
    this.ajaxFlag = false;

    this.props.dispatch({
      type: 'global/post',
      url: newslistappApi,
      payload: {

      },
      callback: (res) => {
        this.ajaxFlag = true;
        this.loading = false;
        if (res.code === 0) {
          this.setState({newslistapp: res.data.list,total:res.data.count })
          console.log(res)
        } else {
          // ResultAlert({
          //   title: '错误信息提示',
          //   img: require('~/assets/com/my_recharge_wrong@2x.png'),
          //   msg: res.message,
          //   btns: ['确定'],
          //   callback: (res) => {
          //     this.setState({
          //       list:[],
          //        total:0,
          //         pageNum:1,
          //          pageSize:10
          //     });
          //   }
          // })
        }
      }
    })
  }

  render(){
    const {pageNum, pageSize, total,newslistapp} = this.state;
    return(
      <div className={styles.newlist}>
        {
          this.loading ? <ToastLoading/>
            :
            <div>
              {
                newslistapp.map((item, index) => {
                  return(<dl key={index}>
                    <dt><Link to={`/found/news-detail/${item.oid}`}><img src={item.imgPath}/></Link></dt>
                    <dd>
                      <Link to={`/found/news-detail/${item.oid}`}>{item.title}</Link>
                      <span>{moment(item.releaseTimeStr).format('YYYY-MM-DD')}</span>
                    </dd>
                  </dl>)
                })
              }

            </div>
        }
      </div>
    )
  }

}

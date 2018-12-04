import React from 'react';
import { connect } from 'dva';
import styles from '~/routes/Found/Activity/NoticesDetail.less';
import ToastLoading from '~/components/Common/ToastLoading'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
@connect(state => ({
  global: state.global,
}))
export default class NewsDetail extends React.Component {
  constructor(props) {
    super(props);
    this.loading = true;
    this.state = {
      newsdetailApi: '/api/home/pc/findPcNewsDetail',
      data:{}
    };

  }

  componentDidMount(){
    let id = this.props.match.params.id;
    this.getnewsdetailData(id);
  }
  getnewsdetailData=(id)=>{
    let {newsdetailApi,newsdetail} = this.state;


    this.props.dispatch({
      type: 'global/post',
      url: newsdetailApi,
      payload:{
        oid:id
      },
      callback: (res) => {
        console.log(res)
        this.loading = false;
        if(res.code === 0){
          this.setState({data:res.data})//调的接口的数据复制给了newsdetail

        }else{
          // ResultAlert({
          //   title: '错误信息提示',
          //   img: require('~/assets/com/my_recharge_wrong@2x.png'),
          //   msg: res.message,
          //   btns: ['确定'],
          //   callback: (res) => {
          //     this.setState({
          //       list:[],
          //     });
          //   }
          // })
        }
      }
    })
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.id !== this.props.match.params.id){
      let id = nextProps.match.params.id;

    }
  }

  render(){
    const {data} = this.state;
    return(
      <div className={styles.noticeDetail}>
        {
          this.loading ? <ToastLoading/>
            :
            <div>
              <h1>{data.title}<span>{moment(data.releaseTimeStr).format('YYYY.MM.DD')}</span></h1>
              <div className={styles.word}>
               <div dangerouslySetInnerHTML={{ __html: data.content }} />
              </div>
            </div>
        }
      </div>
    )
  }

}

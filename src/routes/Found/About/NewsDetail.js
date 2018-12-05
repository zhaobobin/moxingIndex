import React from 'react';
import { connect } from 'dva';

import ToastLoading from '~/components/Common/ToastLoading';
import ArticleDetail from '~/components/Article/ArticleDetail'

@connect(state => ({
  global: state.global,
}))
export default class NewsDetail extends React.Component {
  constructor(props) {
    super(props);
    this.loading = true;
    this.state = {
      data:{}
    };

  }

  componentDidMount(){
    let id = this.props.match.params.id;
    this.getnewsdetailData(id);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.match.params.id !== this.props.match.params.id){
      let id = nextProps.match.params.id;
      this.getnewsdetailData(id);
    }
  }

  getnewsdetailData=(id)=>{
    this.props.dispatch({
      type: 'global/post',
      url: '/api/home/pc/findPcNewsDetail',
      payload:{
        oid: id
      },
      callback: (res) => {
        this.loading = false;
        if(res.code === 0){
          this.setState({data:res.data})//调的接口的数据复制给了newsdetail
        }
      }
    })
  };

  render(){
    const {data} = this.state;
    return(
      <div>
        {
          this.loading ?
            <ToastLoading/>
            :
            <ArticleDetail detail={data}/>
        }
      </div>
    )
  }

}

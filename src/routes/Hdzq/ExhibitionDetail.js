import React from 'react'
import { connect } from 'dva';
import { getUrlParams } from '~/utils/utils';

import Loading from '~/components/Common/Loading'
import ArticleDetail from '~/components/Article/ArticleDetail'

@connect(state => ({
  global: state.global,
}))
export default class ExhibitionDetail extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      detail: ''
    }
  }

  componentDidMount(){
    let id = this.props.match.params.id;
    this.queryDetail(id);
  }

  UNSAFE_componentWillReceiveProps(nextProps){
    if(nextProps.match.params.id !== this.props.match.params.id){
      let id = nextProps.match.params.id;
      this.queryDetail(id);
    }
  }

  queryDetail = (id) => {
    this.props.dispatch({
      type: 'global/post',
      url: '/api/details/exhibition',
      payload:{
        id
      },
      callback: (res) => {
        if(res.code === '0'){
          this.setState({
            loading: false,
            detail: res.data
          })
        }
      }
    })
  };

  render(){

    const {loading, detail} = this.state;

    return(
      <div>
        {
          loading && !detail ?
            <Loading/>
            :
            <ArticleDetail detail={detail} />
        }
      </div>
    )
  }

}

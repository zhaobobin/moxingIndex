/**
 * banner组件
 * 类型: NOTICE:网站公告，NEWS：公司新闻，ACTIVITY：活动专区，MEDIA：媒体报道，HELP：帮助中心，OTH：其他',
 */
import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Spin } from 'antd';
import { Carousel } from 'antd-mobile';
import styles from './HomeBanner.less';

import LoadingBg from '~/components/Common/LoadingBg'

const CateList = {
  'NOTICE': {name: '网站公告', path: '/news/notices-list/detail', type: 'pc'},
  'NEWS': {name: '公司新闻', path: '/news/news-list/detail', type: 'pc'},
  'MEDIA': {name: '媒体报道', path: '/news/report-list/detail', type: 'pc'},
  'ACTIVITY': {name: '活动专区', path: '/hdzq/detail'},
  'OTH': {name: '其他', path: '/other/', type: 'pc'},
  'ZXFW': {name: '智享服务', path: '/lend/zxfw?platform=app&productId=123', type: 'h5'},
  'SBZQ': {name: '散标专区', path: '/lend/sbzq?platform=app&productId=123', type: 'h5'},
  'ZQZR': {name: '债权转让', path: '/lend/zqzr?platform=app&productId=123', type: 'h5'},
  'REGISTER': {name: '注册', path: '/user/register?platform=app', type: 'h5'},
  'SHAI': {name: '晒收益', path: '/share-shouyi', type: 'h5'},
  'RISK': {name: '风险测评', path: '/account/info-manage/risk-manage?platform=app&accessToken=9de8800f7c1b434e81f61fcfe3e85587&userId=18111210469988', type: 'h5'},
};

@connect(state => ({
  global: state.global,
}))
export default class HomeBanner extends React.Component {

  constructor(props) {
    super(props);
    this.ajaxFlag = true;
    this.state = {
      data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      list: '',
      loading: true,
      imgLoading: true,
      imgHeight: parseInt(document.body.clientWidth / 2),
    };

  }
  componentDidMount(){
    this.getBannerData();
  }

  getBannerData = () => {

    if(!this.ajaxFlag) return;
    this.ajaxFlag = false;

    this.props.dispatch({
      type: 'global/post',
      url: '/api/home/pc/findPcBannerList',
      payload:{},
      callback: (res) => {
        this.ajaxFlag = true;
        this.loading = false;
        if(res.code === 0){
          this.setState({
            loading: false,
            list: res.data,
          })
        }
      }
    })

  };

  //图片加载优化
  imgOnload = () => {
    this.setState({
      imgLoading: false
    })
  };

  render() {

    const {loading, list, imgLoading, imgHeight} = this.state;

    return (

      <div className={styles.banner}>

        {
          loading && !list ?
            <LoadingBg
              style={{
                width: "100%",
                height: "100%",
                position: 'absolute',
                left: 0,
                top: 0,
                zIndex: 0,
              }}
            />
            :
            <div className={styles.bannerBox}>
              <Carousel autoplay>
                {
                  list.map((item, index)=> (
                    !item.bannerType || item.bannerType === 'OTH' || item.bannerType === 'ACTIVITY' ?
                      <a
                        key={index}
                        href={item.linkUrl || "javascript:void(0)"}
                        className={styles.link}
                        target={item.linkUrl ? "_blank" : "_self"}
                        style={{ display: 'inline-block', width: '100%', height: imgHeight }}
                      >
                        <img src={item.imgPath} width="100%" height={imgHeight} alt="预加载" onLoad={this.imgOnload}/>
                        {
                          imgLoading ?
                            <Spin spinning={imgLoading} delay={300} size="large" />
                            :
                            <p className={styles.img} style={
                              {
                                width: '100%',
                                height: '100%',
                                background: `url(${item.imgPath}) no-repeat center center`,
                                backgroundSize: 'auto 100%'
                              }
                            } />
                        }
                      </a>
                      :
                      <Link
                        key={index}
                        to={`${CateList[item.bannerType].path}/${item.cmsId}`}
                        className={styles.link}
                        target="_blank"
                        style={{ display: 'inline-block', width: '100%', height: imgHeight }}
                      >
                        <img src={item.imgPath} width="100%" height={imgHeight} alt="预加载" onLoad={this.imgOnload}/>
                        {
                          imgLoading ?
                            <Spin spinning={imgLoading} delay={300} size="large" />
                            :
                            <p style={{height: '100%', background: `url(${item.imgPath}) no-repeat center center`, backgroundSize: 'auto 100%'}} />
                        }
                      </Link>
                  ))
                }
              </Carousel>

              <span className={styles.bannerTip}><i>广告</i><span>网贷有风险，出借需谨慎</span></span>

            </div>
        }

      </div>
    )
  }
}

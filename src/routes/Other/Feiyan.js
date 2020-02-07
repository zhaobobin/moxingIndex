/**
 * 肺炎
 */
import React from 'react'
import {connect} from 'dva';
import { Row, Col, Affix, Anchor } from 'antd'
import {Toast} from 'antd-mobile';
import LazyLoad from 'react-lazyload';
import styles from './Feiyan.less'

import logo from '~/assets/feiyan/logo.png'

import Loading from '~/components/Common/Loading'
import TotalData from '~/components/Feiyan/TotalData'
import MapData from '~/components/Feiyan/MapData'
import HistoryData from '~/components/Feiyan/HistoryData'
import CityTable from '~/components/Feiyan/CityTable'
import NewsList from '~/components/Feiyan/NewsList'
import Rumours from '~/components/Feiyan/Rumours'
import Share from '~/components/Feiyan/Share'

const { Link } = Anchor;

@connect(state => ({
  global: state.global,
}))
export default class Feiyan extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      currentAnchor: 'statistical',
      loading: true,
      affixed: null,
      totalData: '', // 总数据
      mapData: '', // 地图数据
      cityData: '', // 城市数据
    }
  }

  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
    let metas = document.getElementsByTagName('meta');
    metas['description'].content = '实时同步疫情动态，热心分享，掌握疫情传播趋势'
      this.queryTotalData();
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll)
  }

  //监控滚动
  handleScroll = () => {
    let currentAnchor;
    const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;

    const Progress = document.getElementById('progress');
    const True = document.getElementById('true');
    if(scrollY < Progress.offsetTop){
      currentAnchor = 'statistical'
    }
    else if(scrollY > Progress.offsetTop && scrollY < True.offsetTop) {
      currentAnchor = 'progress'
    }
    else if(scrollY > True.offsetTop) {
      currentAnchor = 'true'
    }
    this.setState({
      currentAnchor
    })
  }

  // 总数据
  queryTotalData(){
    this.props.dispatch({
      type: 'global/post',
      url: '/api/pneumonia/index',
      payload: {},
      callback: (res) => {
        if (res.code === '0') {
          this.queryMapData(res.data)
        } else {
          Toast.info(res.msg, 2);
        }
      }
    })
  }

  queryMapData(totalData){
    this.props.dispatch({
      type: 'global/post',
      url: '/api/pneumonia/province',
      payload: {},
      callback: (res) => {
        if (res.code === '0') {
          let MapData=[];
          for(let i in res.data){
            let mapObj={
              name: res.data[i].provinceName,
              value: res.data[i].confirmedCount,
              cured: res.data[i].curedCount,
              dead: res.data[i].deadCount,
              color: this.renderMapColor(res.data[i].confirmedCount)
            }
            MapData.push(mapObj)
          }
          this.setState({
            loading: false,
            totalData,
            mapData: MapData,
            cityData: res.data
          })
        } else {
          Toast.info(res.msg, 2);
        }
      }
    })
  }

  renderMapColor = (number) => {
    let color
    if(number > 1000) {
      color = '#9e191a'
    }
    else if(number >= 500 && number <= 1000) {
      color = '#c5271b'
    }
    else if(number >= 100 && number <= 499) {
      color = '#db574b'
    }
    else if(number >= 10 && number <= 99) {
      color = '#f38a6a'
    }
    else if(number >= 1 && number <= 9) {
      color = '#ffd3a2'
    }
    return color
  }

  handleClickMenu = (anchor) => {
    this.setState({
      currentAnchor: anchor
    });
    this.scroll(anchor)
  }

  scroll = (anchor) => {
    let anchorElement = document.getElementById(anchor);
    if (anchor === 'statistical') {
      window.scrollTo(0, 0);
    }else{
      window.scrollTo(0, anchorElement.offsetTop);
    }
  }

  // 锚点浮动
  onChangeAffixed = (affixed) => {
    this.setState({
      affixed
    })
  }

  render(){

    const {
      currentAnchor, loading, affixed,
      totalData, mapData, cityData,
    } = this.state;

    const menus = [
      { name: '最近情况', anchor: 'statistical'},
      { name: '最近进展', anchor: 'progress'},
      { name: '真假辟谣', anchor: 'true'},
    ]

    return(
      <>
      {
        loading ?
          <Loading/>
          :
          <div className={styles.container}>

            <div className={styles.head}>
              <img src={require('~/assets/feiyan/head_bg.png')} alt="bg"/>
            </div>

            <div className={styles.body}>

              <Affix onChange={this.onChangeAffixed} showInkInFixed={false}>
                <div className={styles.menu + " " + (affixed ? styles.fixed : null)}>

                  <Row gutter={40}>
                    {
                      menus.map((item, index) => (
                        <Col span={8} key={index}>
                          <div
                            className={item.anchor === currentAnchor ? styles.active : null}
                            onClick={() => this.handleClickMenu(item.anchor)}
                          >
                            <span>
                              {item.name}
                            </span>
                            <i/>
                          </div>
                        </Col>
                      ))
                    }
                  </Row>

                </div>
              </Affix>

              <TotalData totalData={totalData}/>

              <LazyLoad height={400}>
                <MapData data={mapData}/>
              </LazyLoad>

              <LazyLoad height={800}>
                <HistoryData/>
              </LazyLoad>

              <LazyLoad height={1400}>
                <CityTable cityData={cityData}/>
              </LazyLoad>

              {/*<div className={styles.section}>*/}
                {/*<h2>海外情况 <i/></h2>*/}
                {/*<div className={styles.con}>*/}

                {/*</div>*/}
              {/*</div>*/}

              <div id="progress">
                <LazyLoad height={1400}>
                  <NewsList/>
                </LazyLoad>
              </div>

              <div id="true">
                <LazyLoad height={1400}>
                  <Rumours/>
                </LazyLoad>
              </div>

            </div>

            <Share/>

            <div className={styles.foot}>
              <img src={logo} alt="logo"/>
            </div>

          </div>
      }
      </>
    )
  }

}

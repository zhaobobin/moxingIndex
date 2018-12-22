import React from 'react';
import { connect } from 'dva';
import styles from "./Other.less";
import Map from 'react-amap/lib/map';
import Marker from 'react-amap/lib/marker';
import {Icon} from "antd";
import { Link } from 'dva/router';
import Information from "~/components/Information/Information";
import Signature from "~/components/Information/signature";
@connect(state => ({
  global: state.global,
}))
export default class Other extends React.Component {

  render(){
    const position = { longitude: 116.474466, latitude: 39.950875};
    return(
      <div className={styles.Other}>

       <Information>
        <div className={styles.Map}>
          <Map plugins={['ToolBar']} zoom={14.5} center={position}>
            <Marker position={position} >
              {/*<div className={styles.tag}>恒远鑫达大厦</div>*/}
            </Marker>
          </Map>
        </div>
        <ul className={styles.OtherUl}>
          <li>
            <img src={require("~/assets/account/find_other_address@2x.png")} alt="" className={styles.img}/>
            <p>
              地址：北京市朝阳区亮马桥路甲40号1幢4层401内B02A室
            </p>
          </li>
          <li>
            <img src={require("~/assets/account/find_other_maile@2x.png")} alt="" className={styles.img}/>
            <p>
            邮编：100125
            </p>
          </li>
          <li>
            <img src={require("~/assets/account/find_other_reportphone@2x.png")} alt="" className={styles.img}/>
            <p>
             客服、投诉、举报电话：400-181-0588 <br/>
              <span className={styles.OtherSpan}>工作时间：9:00 - 17：30</span>
            </p>
          </li>
          <li>
            <img src={require("~/assets/account/find_other_reportmaile@2x.png")} alt="" className={styles.img}/>
            <p>
             客服、投诉、举报邮箱:qutouwang@chinacfsc.com，<br/>
              <span className={styles.OtherSpan}>工作时间：星期一至星期五，9:00 - 17：30（法定节假日除外）</span>
            </p>

          </li>
          <li>
            <img src={require("~/assets/account/find_other_help@2x.png")} alt="" className={styles.img}/>
            <p className={styles.online}>
              <Link to='help-list'>
              在线帮助
              <Icon  type="right"  />
              </Link>
            </p>
          </li>
        </ul>
     <Signature/>
         </Information>
      </div>
    )
  }

}

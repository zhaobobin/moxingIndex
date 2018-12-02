/*
*   签名共用模板
*
*
*
* */
import React from "react";
import styles from "./signature.less";
import {Tabs} from "antd";

export default class Signature extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }
  render(){
  return (
    <div>
      <div className={styles.bottomBox}>
        <span>法定代表人签名：</span>
        <img src={require("~/assets/account/find_autograph@2x.png")} alt="" className={styles.img}/>
      </div>
    </div>

  )
  }
}


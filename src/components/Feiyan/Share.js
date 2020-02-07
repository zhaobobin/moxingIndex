import React from 'react';
import styles from '~/routes/Other/Feiyan.less'

export default class Share extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      visible: false
    }
  }

  show = () => {
    this.setState({
      visible: true
    })
  }

  hide = () => {
    this.setState({
      visible: false
    })
  }

  render(){

    const { visible } = this.state;

    return(
      <div className={styles.share}>
        <div
          className={styles.shareBtn}
          onClick={this.show}
        >
          <p>分享实时疫情</p>
        </div>
        <div
          className={styles.shareModal + " " + (visible ? styles.show : null)}
          onClick={this.hide}
        >
          <p>
            <span>点击右上角“…” <br/> 分享好友，抗击肺炎</span>
            <i/>
          </p>
        </div>
      </div>
    )
  }

}
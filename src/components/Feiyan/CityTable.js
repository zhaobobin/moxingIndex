import React from 'react'
import {connect} from 'dva';
import { Icon } from 'antd'
import {Toast} from 'antd-mobile';
import styles from '~/routes/Other/Feiyan.less'

@connect(state => ({
  global: state.global,
}))
export default class CityTable extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      cityData: props.cityData, // 城市数据
    }
  }

  // 切换城市数据
  toggleCityItem = (index) => {
    const { cityData } = this.state;
    if (cityData[index].show === true) {
      cityData[index].show = false;
      this.setState({
        cityData
      })
    } else {
      this.props.dispatch({
        type: 'global/post',
        url: '/api/pneumonia/city',
        payload: {
          locationId: cityData[index].locationId
        },
        callback: (res) => {
          if (res.code === '0') {
            cityData[index].subList = res.data;
            cityData[index].show = true;
            this.setState({
              cityData
            })
          } else {
            Toast.info(res.msg, 2);
          }
        }
      })
    }
  }

  render(){

    const { cityData } = this.state;

    return(
      <div className={styles.section + " " + styles.city}>
        <h2>全国情况 <i/></h2>
        <div className={styles.con}>
          <div className={styles.th}>
            <ul>
              <li className={styles.l1}>地区</li>
              <li className={styles.l2}>确诊</li>
              <li className={styles.l3}>治愈</li>
              <li className={styles.l4}>死亡</li>
              <li className={styles.l5}/>
            </ul>
          </div>
          <div className={styles.tb}>
            {
              cityData.map((item, index) => (
                <div key={index} className={styles.item + " " + (item.show ? styles.show : null)}>
                  <div className={styles.total} onClick={() => this.toggleCityItem(index)}>
                    <ul>
                      <li className={styles.l1}>{item.provinceName}</li>
                      <li className={styles.l2}>{item.confirmedCount}</li>
                      <li className={styles.l3}>{item.curedCount}</li>
                      <li className={styles.l4}>{item.deadCount}</li>
                      <li className={styles.l5}><Icon type={item.show ? 'caret-up' : 'caret-down'} /></li>
                    </ul>
                  </div>
                  <div className={styles.subList}>
                    {
                      item.subList ?
                        item.subList.map((t, j) => (
                          <div key={j} className={styles.subItem}>
                            <ul>
                              <li className={styles.l1}>{t.cityName}</li>
                              <li className={styles.l2}>{t.confirmedCount}</li>
                              <li className={styles.l3}>{t.curedCount}</li>
                              <li className={styles.l4}>{t.deadCount}</li>
                              <li className={styles.l5}><i/></li>
                            </ul>
                          </div>
                        ))
                        :
                        null
                    }
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }

}
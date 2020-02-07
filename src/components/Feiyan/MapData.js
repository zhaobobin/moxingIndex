import React from 'react'
import {connect} from 'dva';
import styles from '~/routes/Other/Feiyan.less'

import HighMaps from '~/components/Table/HighMaps';

@connect(state => ({
  global: state.global,
}))
export default class MapData extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      loading: true,
      mapData: props.data, // 地图数据
    }
  }

  render(){

    const { mapData } = this.state;

    return(
      <div className={styles.section + " " + styles.map}>
        <div className={styles.con}>
          <HighMaps data={mapData}/>
          <div className={styles.legend}>
            <p>
              <span>确诊病例：</span>
              <span><i className={styles.red1}/><em>>1000</em></span>
              <span><i className={styles.red2}/><em>500-1000</em></span>
              <span><i className={styles.red3}/><em>100-499</em></span>
              <span><i className={styles.red4}/><em>10-99</em></span>
              <span><i className={styles.red5}/><em>1-9</em></span>
            </p>
          </div>
        </div>
      </div>
    )
  }

}
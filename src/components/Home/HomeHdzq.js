import React from 'react';
import { Link } from 'dva/router';
import {Carousel, WingBlank} from 'antd-mobile';
import styles from './HomeHdzq.less'

export default class HomeHdzq extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      height: document.documentElement.clientWidth * 0.38,
    }
  }

  render() {

    const { list, height } = this.state;

    return (
      <div className={styles.list}>

        <Carousel
          dots={false}
          cellSpacing={8}
          slideWidth={0.9}
        >
          {
            list.map((val, index) => (
              <Link key={index} to="/">
                <img
                  src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                  width="100%"
                  height={height}
                  alt="bg"
                />
              </Link>
            ))
          }
        </Carousel>

      </div>
    )
  }

}

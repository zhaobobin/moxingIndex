import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import HomeBanner from '~/components/Home/HomeBanner'
import HomeBtns from '~/components/Home/HomeBtns'

@connect(state => ({
  global: state.global,
}))
export default class Home extends React.Component {

  render(){
    return(
      <div>

        <HomeBanner/>

        <HomeBtns/>

      </div>
    )
  }

}

/**
 *	选择城市
 */
import React from 'react';
import { Cascader } from 'antd';
import options from './CityOptions';

export default class CitySelect extends React.Component {

  render(){

    const city = this.props.city ? this.props.city.split(" - ") : [];                //默认城市

    return (

      <Cascader
        size="large"
        options={options}
        defaultValue={city}
        onChange={this.props.handleSelectCity}
        displayRender={label => label.join(' - ')}
        placeholder="请选择地区"
      />

    )

  }

}

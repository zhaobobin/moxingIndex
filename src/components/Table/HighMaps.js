import React from 'react';
import ReactHighmaps from 'react-highcharts/ReactHighmaps.src';
import maps from './china'
//import styles from './HighMaps.less'

const Theme = {
  labelColor: '#333',
  borderColor: '#FDE7D6',
  nullColor: '#FFFAF6',
  selectColor: '#FDE7D6',
};
const HighMaps =({data})=> {
  const config = {
    chart: {
      spacing: [0, 10, 0, 10],
      height:300
    },
    title: {
      text: ''
    },
    credits: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    series: [{
      name: '投资地域分布（元）',
      mapData: maps,
      borderColor: Theme.borderColor,
      nullColor: Theme.nullColor,
      joinBy: 'name',
      cursor: 'pointer',
      dataLabels: {
        enabled: true,
        color: Theme.labelColor,
        format: '{point.name}',
        overflow:'justify', //根据情况自动调整数据标签位置
        allowOverlap: true , //标签之间的层叠
      },
      tooltip: {
        pointFormat: '{point.name}: {point.value}元'
      },
      data:data,
      states: {
        hover: {
          borderWidth: 3,
          borderColor: '#F18925',
          color:'#FDE7D6'
        },
      },
    }]
  };
  return(
    <div>
      <ReactHighmaps config={config}/>
    </div>
  )
}
export default  HighMaps ;

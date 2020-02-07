import React from 'react';
import ReactHighmaps from 'react-highcharts/ReactHighmaps.src';
import maps from './china'

const Theme = {
  labelColor: '#333',
  borderColor: '#b4b0a5',
  nullColor: '#FFFAF6',
  selectColor: '#FDE7D6',
};
export default function HighMaps ({data}) {

  const config = {
    chart: {
      spacing: [10, 10, 10, 10],
      height:340
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
    tooltip: {
      headerFormat: '',
      pointFormat: '<span style="font-size:10px">{point.name}</span><br/><br/> 确诊: <b>{point.value}</b>人<br/> 治愈: <b>{point.cured}</b>人<br/> 死亡: <b>{point.dead}</b>人<br/><br/>'
    },
    series: [{
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
        crops:false
      },

      data:data,
      /*  middleX:1,      //设置节点中心的水平位置
        middleY: 0,     //设置节点中心的垂直位置*/
      states: {
        hover: {
          borderWidth: 3,
          borderColor: '#F18925',
          color:'#FFFAF6'
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

import React from 'react';
import ReactHighcharts from 'react-highcharts';

ReactHighcharts.Highcharts.setOptions({
  lang: {
    thousandsSep: ','
  }
})

const HighLine = ({ startDate, data }) => {
  const config = {
    credits: {
      enabled:false
    },
    chart: {
      type: 'spline'
    },
    title: false,
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        day: '%m.%d',
      },
      tickInterval: 24 * 3600 * 1000,
      labels:{
        step: 1,
        rotation: -45
      }
    },
    yAxis: {
      title: {
        text: false
      }
    },
    tooltip: {
      shared: true,
      crosshairs: true,
      dateTimeLabelFormats: {
        day: '%Y-%m-%d'
      },
      // headerFormat: '<b>{series.name}</b><br>',
      // pointFormat: '{point.y: .0f}'
    },
    legend: {
      align: 'right',
      verticalAlign: 'bottom',
    },
    plotOptions: {
      series: {
        pointStart: startDate,
        pointInterval: 24 * 3600 * 1000, // one day
      }
    },
    series: data,
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          legend: {
            layout: 'horizontal',
            align: 'center',
            verticalAlign: 'bottom'
          }
        }
      }]
    }
  };
  return(
    <div>
      <ReactHighcharts config={config} />
    </div>
  )
}
export default HighLine;
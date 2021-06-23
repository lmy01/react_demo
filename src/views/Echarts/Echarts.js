import React from 'react'
import ReactEcharts from 'echarts-for-react'
import { Row, Col } from 'antd'

export default class Echarts extends React.Component{
  render () {
    var sunburstData = [{
        name: 'Grandpa',
        children: [{
            name: 'Uncle Leo',
            value: 15,
            children: [{
                name: 'Cousin Jack',
                value: 2
            }, {
                name: 'Cousin Mary',
                value: 5,
                children: [{
                    name: 'Jackson',
                    value: 2
                }]
            }, {
                name: 'Cousin Ben',
                value: 4
            }]
        }, {
            name: 'Aunt Jane',
            children: [{
                name: 'Cousin Kate',
                value: 4
            }]
        }, {
            name: 'Father',
            value: 10,
            children: [{
                name: 'Me',
                value: 5,
                itemStyle: {
                    color: 'red'
                }
            }, {
                name: 'Brother Peter',
                value: 1
            }]
        }]
    }, {
        name: 'Mike',
        children: [{
            name: 'Uncle Dan',
            children: [{
                name: 'Cousin Lucy',
                value: 3
            }, {
                name: 'Cousin Luck',
                value: 4,
                children: [{
                    name: 'Nephew',
                    value: 2
                }]
            }]
        }]
    }, {
        name: 'Nancy',
        children: [{
            name: 'Uncle Nike',
            children: [{
                name: 'Cousin Betty',
                value: 1
            }, {
                name: 'Cousin Jenny',
                value: 2
            }]
        }]
    }];
    
    const sunburstOption = {
        visualMap: {
            type: 'continuous',
            min: 0,
            max: 10,
            inRange: {
                color: ['#2D5F73', '#538EA6', '#F2D1B3', '#F2B8A2', '#F28C8C']
            }
        },
        series: {
            type: 'sunburst',
            data: sunburstData,
            radius: [0, '90%'],
            label: {
                rotate: 'radial'
            }
        }
    };
    const pieOption = {
      title: {
        text: '天气情况统计',
        subtext: '虚构数据',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        // orient: 'vertical',
        // top: 'middle',
        bottom: 10,
        left: 'center',
        data: ['西凉', '益州', '兖州', '荆州', '幽州']
    },
    series: [
        {
            type: 'pie',
            radius: '65%',
            center: ['50%', '50%'],
            selectedMode: 'single',
            data: [
                {
                    value: 1548,
                    name: '幽州',
                },
                {value: 535, name: '荆州'},
                {value: 510, name: '兖州'},
                {value: 634, name: '益州'},
                {value: 735, name: '西凉'}
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
    }
    const lineOption = {
      xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line'
      }]
    }
    const barOption = {
      xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
          type: 'value'
      },
      series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'bar'
      }]
    }
    return <div>
      <div className="flex">
        <ReactEcharts 
        option={sunburstOption}
        style={{ height: 350, width: 380 }}
        notMerge={true}
        lazyUpdate={true}/>
        <ReactEcharts 
        option={pieOption}
        style={{ height: 350, width: 380 }}
        notMerge={true}
        lazyUpdate={true}/>        
      </div>
      
      <div className="flex">
        <ReactEcharts 
        option={lineOption}
        style={{ height: 350, width: 380 }}
        notMerge={true}
        lazyUpdate={true}/>
        <ReactEcharts 
        option={barOption}
        style={{ height: 350, width: 380 }}
        notMerge={true}
        lazyUpdate={true}/>
      </div>      
        
    </div>
  }
}
import React from 'react'
import {Box} from '@mantine/core'
import dayjs from 'dayjs'
import './App.css'
import {dayTrips} from './data'
import {useStyles} from './hooks'
import {EChartsOption, ReactECharts} from './react-echarts'

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export const App = () => {
  const {classes} = useStyles()
  const option: EChartsOption = {
    title: {
      left: 150,
      height: 100,
      show: true,
      text: "Vegas Daytripper's 2023 Win/Loss",
    },
    axisPointer: {
      triggerTooltip: true,
    },
    tooltip: {
      trigger: 'axis',
      show: true,
      axisPointer: {
        type: 'cross',
      },
      formatter: (params: any) => {
        const dataIndex = params[0].dataIndex
        let content = `<div class="${classes.datapointTooltip}">`
        if (Array.isArray(params) && params.length) {
          content += `<b>Date: ${dayjs(params[0].data[0]).format(
            'MMM DD, YYYY'
          )}</b><br/><span class="${
            Number(dayTrips[dataIndex][1]) < 0
              ? classes.negativeCurrency
              : classes.positiveCurrency
          }">Win/Loss: ${currency.format(
            Number(dayTrips[dataIndex][1])
          )}</span><br/><b class="${
            params[0].data[1] < 0
              ? classes.negativeCurrency
              : classes.positiveCurrency
          }">YTD: ${currency.format(params[0].data[1])}</b><br/><b>Location: ${
            params[0].data[2]
          }</b>`
        }
        content += '</div>'
        return content
      },
    },
    xAxis: {
      type: 'time',
      axisLabel: {
        rotate: 45,
        formatter: (date: number) => dayjs(date).format('MMM DD'),
      },
    },
    yAxis: {
      type: 'value',
      name: 'USD $',
      nameLocation: 'middle',
      nameGap: 100,
      axisLabel: {
        formatter: (money: number) => currency.format(money),
      },
    },
    animationDuration: dayTrips.length * 1000,
    animationEasing: 'cubicInOut',
    series: [
      {
        type: 'line',
        emphasis: {
          focus: 'series',
        },
        labelLayout: {
          moveOverlap: 'shiftY',
        },
        data: dayTrips.reduce((acc, dayTrip, index) => {
          if (index > 0) {
            acc.push([
              dayTrip[0],
              Number(acc[index - 1][1]) + Number(dayTrip[1]),
              dayTrip[2],
            ])
          } else {
            acc.push(dayTrip)
          }
          return acc
        }, [] as typeof dayTrips),
        datasetId: 'trips',
      },
    ],
  }

  return (
    <div className="App">
      <Box h={600} mt={100}>
        <ReactECharts
          onChartReady={(chart) => {
            setTimeout(() => chart.setOption(option), 100)
          }}
          option={{...option, series: []}}
          renderer="canvas"
        />
      </Box>
    </div>
  )
}

import React from 'react'
import {Box, createStyles} from '@mantine/core'
import dayjs from 'dayjs'
import './App.css'
import {EChartsOption, ReactECharts} from './react-echarts'

const useStyles = createStyles(() => ({
  datapointTooltip: {
    color: 'black',
    margin: '-1rem',
    maxWidth: '18rem',
    padding: '0.75rem',
    textAlign: 'left',
    textShadow: '1px 1px rgba(0,0,0,0.15)',
    userSelect: 'none',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-all',
  },
  negativeCurrency: {
    color: 'red',
  },
  positiveCurrency: {
    color: 'black',
  },
}))

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const ARIA = 'Aria'
const BELLAGIO = 'Bellagio'
const EL_CORTEZ = 'El Cortez'
const FLAMINGO = 'Flamingo'
const MANDALAY_BAY = 'Mandalay Bay'
const PALAZZO = 'Palazzo'

const dayTrips = [
  ['2023-01-11', 10095.0, BELLAGIO],
  ['2023-01-18', 585.0, MANDALAY_BAY],
  ['2023-01-25', -9100.0, PALAZZO],

  ['2023-02-08', 8225, MANDALAY_BAY],
  ['2023-02-14', -11700.0, ARIA],
  ['2023-02-15', -2180.0, FLAMINGO],
  ['2023-02-21', -13400.0, PALAZZO],

  ['2023-03-01', -1560.0, PALAZZO],
  ['2023-03-15', 5100.0, ARIA],
  ['2023-03-22', -4900.0, PALAZZO],
  ['2023-03-29', 5100.0, BELLAGIO],

  ['2023-04-05', -945.0, EL_CORTEZ],
  ['2023-04-12', -2000.0, PALAZZO],
  ['2023-04-13', -25000.0, PALAZZO],

  ['2023-05-10', 6701.0, BELLAGIO],
  ['2023-05-17', -14500.0, ARIA],
  ['2023-05-24', -13700.0, PALAZZO],

  ['2023-06-01', -7340.0, PALAZZO],
  ['2023-06-07', 3200.0, ARIA],
  ['2023-06-14', 1215.0, BELLAGIO],
  ['2023-06-21', 13010.0, ARIA],
  ['2023-06-27', -4570.0, PALAZZO],

  ['2023-07-05', 31700.0, PALAZZO],
  ['2023-07-12', -7400.0, ARIA],
]

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
      type: 'category',
      axisLabel: {
        rotate: 45,
        formatter: (date: string) => dayjs(date).format('MMM DD'),
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
    series: [
      {
        type: 'line',
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
      },
    ],
  }

  return (
    <div className="App">
      <Box h={600} mt={100}>
        <ReactECharts option={option} renderer="canvas" />
      </Box>
    </div>
  )
}

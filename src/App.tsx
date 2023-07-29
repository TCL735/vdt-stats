import React from 'react'
import {Box, Stack, Table} from '@mantine/core'
import dayjs from 'dayjs'
import './App.css'
import {dayTrips, getRewardsProgramAbbreviation} from './data'
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
            Number(
              dayTrips[dataIndex][1].reduce((sum, amount) => sum + amount)
            ) < 0
              ? classes.negativeCurrency
              : classes.positiveCurrency
          }">Win/Loss: ${dayTrips[dataIndex][1]
            .map((amount) => currency.format(amount))
            .join(', ')}</span><br/><b class="${
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
      boundaryGap: ['6%', '6%'],
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
          if (index === 0) {
            return [
              [
                dayTrip[0],
                dayTrip[1].reduce((sum, value) => sum + value),
                dayTrip[2].join(', '),
              ],
            ]
          }
          acc.push([
            dayTrip[0],
            dayTrip[1].reduce((sum, value) => sum + value) +
              acc[acc.length - 1][1],
            dayTrip[2].join(', '),
          ])

          return acc
        }, [] as any),
        datasetId: 'trips',
      },
    ],
  }

  let tableWinLossTotal = 0
  const dayTripsAsRows = dayTrips.map((dayTrip, index) => {
    const tripNumber = index + 1
    const date = dayjs(dayTrip[0]).format('M/DD/YYYY')
    const locations = dayTrip[2]
    const winLoss = dayTrip[1]
    winLoss.forEach((winOrLoss) => (tableWinLossTotal += winOrLoss))
    return locations.map((location, idx) => (
      <tr key={`${location}-${date}-${idx}`}>
        <th key={`${location}-${date}-${idx}-c1`} style={{textAlign: 'left'}}>
          {idx === 0 ? tripNumber : ''}
        </th>
        <th key={`${location}-${date}-${idx}-c2`} style={{textAlign: 'left'}}>
          {idx === 0 ? date : ''}
        </th>
        <th key={`${location}-${date}-${idx}-c3`} style={{textAlign: 'left'}}>
          {getRewardsProgramAbbreviation(location)}
        </th>
        <th key={`${location}-${date}-${idx}-c4`} style={{textAlign: 'right'}}>
          {winLoss[idx]}
        </th>
      </tr>
    ))
  })

  return (
    <div className="App">
      <Stack>
        <Box h={600} mt={100}>
          <ReactECharts
            onChartReady={(chart) => {
              setTimeout(() => chart.setOption(option), 100)
            }}
            option={{...option, series: []}}
            renderer="canvas"
          />
        </Box>
        <Table mt={50} mb={100} ml={100} maw={400}>
          <thead>
            <tr>
              <th key="h1">Trip</th>
              <th key="h2">Date</th>
              <th key="h3">Program</th>
              <th key="h4" style={{textAlign: 'right'}}>
                Win/Loss
              </th>
            </tr>
          </thead>
          <tbody>
            {dayTripsAsRows}
            <tr>
              <th></th>
              <th>Total</th>
              <th></th>
              <th style={{textAlign: 'right'}}>{tableWinLossTotal}</th>
            </tr>
          </tbody>
        </Table>
      </Stack>
    </div>
  )
}

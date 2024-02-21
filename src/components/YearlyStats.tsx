import React, {FC} from 'react';
import {Box, Stack, Table} from '@mantine/core';
import dayjs from 'dayjs';
import {getRewardsProgramAbbreviation, DayTrip} from '../data';
import {useStyles} from '../hooks';
import {EChartsOption, ReactECharts} from '../react-echarts';

const currency = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

interface YearlyStatsProps {
  label: string;
  lineColor: string;
  year: string | null;
  dayTrips: Array<DayTrip>;
}

export const YearlyStats: FC<YearlyStatsProps> = ({
  dayTrips,
  label,
  lineColor,
  year,
}) => {
  const yearStart = year ? `${year}-01-01` : '2024-01-01';
  const {classes} = useStyles();
  const option: EChartsOption = {
    title: {
      left: 150,
      height: 100,
      show: true,
      text: label,
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
        const dataIndex = params[0].dataIndex;
        let content = `<div class="${classes.datapointTooltip}">`;
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
            .map(
              (amount) =>
                `<span class="${
                  amount < 0
                    ? classes.negativeCurrency
                    : classes.positiveCurrency
                }">${currency.format(amount)}  </span>`
            )
            .join('')}</span><br/><b class="${
            params[0].data[1] < 0
              ? classes.negativeCurrency
              : classes.positiveCurrency
          }">YTD: ${currency.format(
            params[0].data[1]
          )}</b><br/><span>Location: ${dayTrips[dataIndex][2]
            .map(
              (location, index) =>
                `<span class="${
                  dayTrips[dataIndex][1][index] < 0
                    ? classes.negativeCurrency
                    : classes.positiveCurrency
                }">${location}${
                  index < dayTrips[dataIndex][2].length - 1 ? ', ' : ''
                }</span>`
            )
            .join('')}</span>`;
        }
        content += '</div>';
        return content;
      },
    },
    xAxis: {
      type: 'time',
      axisLabel: {
        rotate: 45,
        formatter: (date: number) => dayjs(date).format('MMM DD'),
      },
      min: (value) => dayjs(yearStart).valueOf(),
      max: (value) => {
        if (value.min === value.max) {
          return value.max + 1000 * 60 * 60 * 24 * 31;
        }
        return value.max + 1000 * 60 * 60 * 24 * 7;
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
        color: lineColor,
        type: 'line',
        emphasis: {
          focus: 'series',
        },
        labelLayout: {
          moveOverlap: 'shiftY',
        },
        endLabel: {
          show: true,
          // @ts-ignore
          formatter: (params: any) => {
            if (params) {
              return `${currency.format(params.value[1])}`;
            }
            return '';
          },
          valueAnimation: true,
        },
        data: dayTrips.reduce((acc, dayTrip, index) => {
          if (index === 0) {
            return [
              [
                dayTrip[0],
                dayTrip[1].reduce((sum, value) => sum + value),
                dayTrip[2].join(', '),
              ],
            ];
          }
          acc.push([
            dayTrip[0],
            dayTrip[1].reduce((sum, value) => sum + value) +
              acc[acc.length - 1][1],
            dayTrip[2].join(', '),
          ]);

          return acc;
        }, [] as any),
        datasetId: 'trips',
      },
    ],
  };

  let tableWinLossTotal = 0;

  const dayTripsAsRows = dayTrips.map((dayTrip, index) => {
    const tripNumber = index + 1;
    const date = dayjs(dayTrip[0]).format('M/DD/YYYY');
    const locations = dayTrip[2];
    const winLoss = dayTrip[1];
    const tripColor =
      winLoss.reduce((acc, amount) => acc + amount, 0) < 0
        ? classes.negativeCurrency
        : classes.positiveCurrency;
    winLoss.forEach((winOrLoss) => (tableWinLossTotal += winOrLoss));
    return locations.map((location, idx) => {
      const locationColor =
        winLoss[idx] < 0 ? classes.negativeCurrency : classes.positiveCurrency;
      return (
        <tr key={`${location}-${date}-${idx}`}>
          <td
            key={`${location}-${date}-${idx}-c1`}
            style={{textAlign: 'left'}}
            className={tripColor}
          >
            {idx === 0 ? tripNumber : ''}
          </td>
          <td
            key={`${location}-${date}-${idx}-c2`}
            style={{textAlign: 'left'}}
            className={tripColor}
          >
            {idx === 0 ? date : ''}
          </td>
          <td
            key={`${location}-${date}-${idx}-c3`}
            style={{textAlign: 'left'}}
            className={locationColor}
          >
            {location}
          </td>
          <td
            key={`${location}-${date}-${idx}-c4`}
            style={{textAlign: 'left'}}
            className={locationColor}
          >
            {getRewardsProgramAbbreviation(location)}
          </td>
          <td
            key={`${location}-${date}-${idx}-c5`}
            style={{textAlign: 'right'}}
            className={locationColor}
          >
            {winLoss[idx]}
          </td>
        </tr>
      );
    });
  });

  return (
    <Stack>
      <Box h={600} mt={100}>
        <ReactECharts
          onChartReady={(chart) => {
            setTimeout(() => chart.setOption(option), 100);
          }}
          option={{...option, series: []}}
          settings={{
            replaceMerge: ['series'],
          }}
          renderer="canvas"
        />
      </Box>
      <Table mt={50} mb={100} ml={100} maw={500}>
        <thead>
          <tr>
            <th key="h1">Trip</th>
            <th key="h2">Date</th>
            <th key="h3">Location</th>
            <th key="h4">Program</th>
            <th key="h5" style={{textAlign: 'right'}}>
              Win/Loss
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{borderTopColor: 'black'}}></td>
            <td style={{borderTopColor: 'black'}}></td>
            <td style={{borderTopColor: 'black'}}></td>
            <th style={{borderTopColor: 'black'}}>Total</th>
            <th
              style={{
                textAlign: 'right',
                borderTopColor: 'black',
              }}
              className={
                tableWinLossTotal < 0
                  ? classes.negativeCurrency
                  : classes.positiveCurrency
              }
            >
              {currency.format(tableWinLossTotal)}
            </th>
          </tr>
          {dayTripsAsRows.reverse()}
        </tbody>
      </Table>
    </Stack>
  );
};

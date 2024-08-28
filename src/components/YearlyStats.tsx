import React, {FC} from 'react';
import {Box, Stack} from '@mantine/core';
import dayjs from 'dayjs';
import {DayTrip} from '../types';
import {EChartsOption, ReactECharts} from '../react-echarts';
import {TableContainer, TableColumn} from './Table';
import {useStyles} from '../hooks';
import {
  createRowData,
  currency,
  currencyFormatter,
  dateFormatter,
} from '../utils';

interface YearlyStatsProps {
  label: string;
  lineColor: string;
  yearStart?: string;
  yearEnd?: string;
  dayTrips: Array<DayTrip>;
}

export const YearlyStats: FC<YearlyStatsProps> = ({
  dayTrips,
  label,
  lineColor,
  yearStart = `${dayjs(dayTrips[0][0]).toISOString().slice(0, 10)}`,
  yearEnd = `${dayjs(dayTrips[dayTrips.length - 1][0])
    .toISOString()
    .slice(0, 10)}`,
}) => {
  const {classes} = useStyles();

  const data: Array<[number, number, string, string]> = dayTrips.reduce(
    (acc, dayTrip, index) => {
      const session = dayTrip[1].reduce((sum, value) => sum + value);
      if (index === 0) {
        return [
          [
            dayTrip[0],
            session,
            dayTrip[2].join(', '),
            session > 0 ? 'black' : 'red',
          ],
        ];
      }
      acc.push([
        dayTrip[0],
        session + acc[acc.length - 1][1],
        dayTrip[2].join(', '),
        session > 0 ? 'black' : 'red',
      ]);

      return acc;
    },
    [] as any
  );

  const option: EChartsOption = {
    title: {
      left: 0,
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
    grid: {
      left: 80,
      right: 5,
    },
    xAxis: {
      type: 'time',
      axisLabel: {
        rotate: 45,
        formatter: (date: number) => dayjs(date).format('MMM DD'),
      },
      axisLine: {
        lineStyle: {
          width: 2,
        },
      },
      min: (value) => dayjs(yearStart).subtract(1, 'day').valueOf(),
      max: (value) => dayjs(yearEnd).add(1, 'day').valueOf(),
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
    visualMap: {
      type: 'piecewise',
      show: false,
      dimension: 0,
      pieces: data.reduce((acc, dayData, index) => {
        if (index === 0) {
          acc.push({
            min: 0,
            max: dayData[0],
            color: dayData[3],
          });
        } else {
          acc.push({
            min: acc[acc.length - 1].max,
            max: dayData[0],
            color: dayData[3],
          });
        }
        return acc;
      }, [] as any),
    },
    animationDuration: dayTrips.length * 300,
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
          offset: [-80, 20],
        },
        data,
        datasetId: 'trips',
      },
    ],
  };

  const {
    wholeTripColors,
    locationColors,
    tripDates,
    tripLocations,
    tripNumbers,
    tripPrograms,
    tripResults,
  } = createRowData(dayTrips);

  const grandTotal = tripResults.reduce(
    (total, amount) => (total += amount),
    0
  );

  return (
    <Stack className="container">
      <Box className="graph-box">
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
      <TableContainer>
        <TableColumn
          className=""
          handleConsecutiveRepeatValueAs="last"
          title="Trip"
          headerRows={['']}
          headerRowColors={['']}
          rowData={tripNumbers}
          rowDataColors={wholeTripColors}
        />
        <TableColumn
          className=""
          formatter={dateFormatter}
          handleConsecutiveRepeatValueAs="last"
          title="Date"
          headerRows={['']}
          headerRowColors={['']}
          rowData={tripDates}
          rowDataColors={wholeTripColors}
        />
        <TableColumn
          className=""
          handleConsecutiveRepeatValueAs="always"
          title="Location"
          headerRows={['']}
          headerRowColors={['']}
          rowData={tripLocations}
          rowDataColors={locationColors}
        />
        <TableColumn
          className=""
          handleConsecutiveRepeatValueAs="always"
          title="Program"
          headerRows={['Total']}
          headerRowColors={['black']}
          rowData={tripPrograms}
          rowDataColors={locationColors}
        />
        <TableColumn
          className="currency-column"
          formatter={currencyFormatter}
          handleConsecutiveRepeatValueAs="always"
          rowDataColors={locationColors}
          title="Win/Loss"
          headerRows={[grandTotal]}
          headerRowColors={[grandTotal >= 0 ? 'black' : 'red']}
          rowData={tripResults}
        />
      </TableContainer>
    </Stack>
  );
};

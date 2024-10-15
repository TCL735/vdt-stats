import React, { FC, useCallback, useContext, useMemo } from "react";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { ECharts } from "echarts/core";
import {
  POSITIVE_CURRENCY_TEXT_COLOR,
  NEGATIVE_CURRENCY_TEXT_COLOR,
} from "../types";
import { EChartsOption, ReactECharts } from "../react-echarts";
import { StatsTableCompact, StatsTableLarge } from "./Table";
import { currency, StatsContext, useWindowDimensions } from "../utils";

interface YearlyStatsProps {
  label: string;
}

export const YearlyStats: FC<YearlyStatsProps> = ({ label }) => {
  const { dayTrips } = useContext(StatsContext);
  const yearStart = `${dayjs(dayTrips[0][0]).toISOString().slice(0, 10)}`;
  const yearEnd = `${dayjs(dayTrips[dayTrips.length - 1][0])
    .toISOString()
    .slice(0, 10)}`;

  const { width, heightClass } = useWindowDimensions();

  const optionWithoutSeries = useMemo(
    () =>
      ({
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
          trigger: "axis",
          show: true,
          axisPointer: {
            type: "cross",
          },
          formatter: (params: any) => {
            const dataIndex = params[0].dataIndex;
            let content = `<div class="${POSITIVE_CURRENCY_TEXT_COLOR} m-[-1rem] max-w-[30rem] p-3 text-left selet-none whitespace-pre-wrap break-all">`;
            if (Array.isArray(params) && params.length) {
              content += `<b>Date: ${dayjs(params[0].data[0]).format(
                "MMM DD, YYYY",
              )}</b><br/><span class="${
                Number(
                  dayTrips[dataIndex][1].reduce((sum, amount) => sum + amount),
                ) < 0
                  ? NEGATIVE_CURRENCY_TEXT_COLOR
                  : POSITIVE_CURRENCY_TEXT_COLOR
              }">Win/Loss: ${dayTrips[dataIndex][1]
                .map(
                  (amount) =>
                    `<span class="${
                      amount < 0
                        ? NEGATIVE_CURRENCY_TEXT_COLOR
                        : POSITIVE_CURRENCY_TEXT_COLOR
                    }">${currency.format(amount)}  </span>`,
                )
                .join("")}</span><br/><b class="${
                params[0].data[1] < 0
                  ? NEGATIVE_CURRENCY_TEXT_COLOR
                  : POSITIVE_CURRENCY_TEXT_COLOR
              }">YTD: ${currency.format(
                params[0].data[1],
              )}</b><br/><span>Location: ${dayTrips[dataIndex][2]
                .map(
                  (location, index) =>
                    `<span class="${
                      dayTrips[dataIndex][1][index] < 0
                        ? NEGATIVE_CURRENCY_TEXT_COLOR
                        : POSITIVE_CURRENCY_TEXT_COLOR
                    }">${location}${
                      index < dayTrips[dataIndex][2].length - 1 ? ", " : ""
                    }</span>`,
                )
                .join("")}</span>`;
            }
            content += "</div>";
            return content;
          },
        },
        grid: {
          left: 80,
          right: 5,
        },
        xAxis: {
          type: "time",
          axisLabel: {
            rotate: 45,
            formatter: (date: number) => dayjs(date).format("MMM DD"),
            hideOverlap: true,
          },
          axisLine: {
            lineStyle: {
              width: 2,
            },
          },
          axisTick: {
            show: true,
            length: 5,
          },
          min: () => dayjs(yearStart).subtract(1, "day").valueOf(),
          max: () => dayjs(yearEnd).add(1, "day").valueOf(),
        },
        yAxis: {
          type: "value",
          name: "USD $",
          nameLocation: "middle",
          nameGap: 100,
          axisLabel: {
            formatter: (money: number) => currency.format(money),
          },
        },
        animationDuration: dayTrips.length * 100,
        animationEasing: "cubicInOut",
        series: [],
      } as EChartsOption),
    [dayTrips, label, yearStart, yearEnd],
  );

  const option = useMemo(() => {
    const data: Array<[number, number, string, string]> = dayTrips.reduce(
      (acc, dayTrip, index) => {
        const session = dayTrip[1].reduce((sum, value) => sum + value);
        if (index === 0) {
          return [
            [
              dayTrip[0],
              session,
              dayTrip[2].join(", "),
              session > 0 ? "black" : "red",
            ],
          ];
        }
        acc.push([
          dayTrip[0],
          session + acc[acc.length - 1][1],
          dayTrip[2].join(", "),
          session > 0 ? "black" : "red",
        ]);

        return acc;
      },
      [] as any,
    );

    return {
      ...optionWithoutSeries,
      visualMap: {
        type: "piecewise",
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
      series: [
        {
          type: "line",
          emphasis: {
            focus: "series",
          },
          labelLayout: {
            moveOverlap: "shiftY",
          },
          endLabel: {
            show: true,
            // @ts-ignore
            formatter: (params: any) => {
              if (params) {
                return `${currency.format(params.value[1])}`;
              }
              return "";
            },
            valueAnimation: true,
            offset: [-80, 35],
          },
          data,
          datasetId: "trips",
        },
      ],
    } as EChartsOption;
  }, [optionWithoutSeries, dayTrips]);

  const onChartReady = useCallback(
    (chart: ECharts) => {
      setTimeout(() => chart.setOption(option), 100);
    },
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
    [width, option],
  );

  const { pathname } = useLocation();

  return (
    <div className="mb-3 mx-3">
      <div className={`${heightClass} mt-5`}>
        <ReactECharts
          onChartReady={onChartReady}
          option={optionWithoutSeries}
          pathname={pathname}
          settings={{
            replaceMerge: ["series"],
          }}
          renderer="canvas"
        />
      </div>
      {width >= 1024 ? <StatsTableLarge /> : <StatsTableCompact />}
    </div>
  );
};

import { useElementSize, useMergedRef } from "@mantine/hooks";
import {
  BarChart,
  BarSeriesOption,
  LineChart,
  LineSeriesOption,
  CustomChart,
  CustomSeriesOption,
  ScatterChart,
  ScatterSeriesOption,
} from "echarts/charts";
import {
  DataZoomComponentOption,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  DatasetComponent,
  DatasetComponentOption,
  GridComponent,
  GridComponentOption,
  LegendComponent,
  LegendComponentOption,
  MarkAreaComponent,
  MarkPointComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  TooltipComponentOption,
  TransformComponent,
  VisualMapComponent,
} from "echarts/components";
import type { ComposeOption, ECharts, SetOptionOpts } from "echarts/core";
import { getInstanceByDom, init, registerLayout, use } from "echarts/core";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer, SVGRenderer } from "echarts/renderers";
import { CSSProperties, forwardRef, useEffect } from "react";
import { StageHandlerOverallReset } from "echarts/types/src/util/types";

export const graphColours = [
  "#50C9F0",
  "#4C5994",
  "#43B4BA",
  "#9F58AD",
  "#EC8F46",
  "#474341",
  "#2663A9",
  "#D14F97",
  "#6AA146",
  "#D7E16F",
] as const;

// register only the necessary ECharts components
use([
  BarChart,
  CanvasRenderer,
  CustomChart,
  DataZoomInsideComponent,
  DataZoomSliderComponent,
  DatasetComponent,
  GridComponent,
  LabelLayout,
  LegendComponent,
  LineChart,
  MarkAreaComponent,
  MarkPointComponent,
  SVGRenderer,
  ScatterChart,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  TransformComponent,
  VisualMapComponent,
]);

export type EChartsOption = ComposeOption<
  | BarSeriesOption
  | GridComponentOption
  | DatasetComponentOption
  | DataZoomComponentOption
  | LegendComponentOption
  | LineSeriesOption
  | ScatterSeriesOption
  | TooltipComponentOption
  | CustomSeriesOption
>;

const getDefaultChartOption = (theme: "light" | "dark"): EChartsOption => ({
  color: theme === "light" ? graphColours : undefined,
  textStyle: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji",
    color: "#303a42",
  },
});

export interface ReactEChartsProps {
  option: EChartsOption;
  pathname?: string; // allows navigation to cause re-render
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: "light" | "dark";
  renderer?: "svg" | "canvas";
  // This does not provide a lot of type safety... But works for now :)
  // TODO: Figure out a way to provide type safety here
  chartEvents?: Record<string, Function>;
  onChartReady?: (chart: ECharts) => void;
  customLayoutFunction?: StageHandlerOverallReset;
  className?: string;
}

export const ReactECharts = forwardRef<HTMLDivElement, ReactEChartsProps>(
  (
    {
      option: chartOption,
      pathname,
      style,
      settings,
      loading,
      theme = "light",
      renderer = "canvas",
      onChartReady,
      chartEvents,
      className,
      customLayoutFunction,
      ...rest
    },
    ref,
  ) => {
    const { ref: container, width, height } = useElementSize<HTMLDivElement>();
    const mergedRef = useMergedRef(container, ref);

    useEffect(() => {
      // Initialize chart
      let chart: ECharts | undefined;
      if (container.current !== null) {
        if (customLayoutFunction) {
          registerLayout(customLayoutFunction as any);
        }
        chart = init(container.current, theme, { renderer });
        onChartReady?.(chart);
      }

      // Return cleanup function
      return () => {
        chart?.dispose();
      };
    }, [
      container,
      customLayoutFunction,
      onChartReady,
      pathname,
      renderer,
      theme,
    ]);

    useEffect(() => {
      // Chart resize
      if (container.current !== null) {
        const chart = getInstanceByDom(container.current);
        chart?.resize({ animation: { duration: 300 } });
      }
    }, [width, height, container]);

    useEffect(() => {
      // Update chart
      if (container.current !== null) {
        // augment the option with the default configuration
        const option = { ...getDefaultChartOption(theme), ...chartOption };
        const chart = getInstanceByDom(container.current);
        chart?.setOption(option, settings);
      }
    }, [chartOption, container, settings, theme]);

    useEffect(() => {
      // change in loading state
      if (container.current !== null) {
        const chart = getInstanceByDom(container.current);
        loading ? chart?.showLoading() : chart?.hideLoading();
      }
    }, [container, loading, theme]);

    useEffect(() => {
      // Bind events
      if (container.current !== null) {
        const chart = getInstanceByDom(container.current);
        if (chart && chartEvents) {
          Object.keys(chartEvents).forEach((eventName) => {
            if (chartEvents[eventName]) {
              chart?.on(eventName, (param) =>
                chartEvents[eventName]?.(param, chart),
              );
            }
          });
        }
      }
    }, [chartEvents, container]);

    return (
      <div
        ref={mergedRef}
        style={{ width: "100%", height: "100%", ...style }}
        className={className}
        {...rest}
      />
    );
  },
);

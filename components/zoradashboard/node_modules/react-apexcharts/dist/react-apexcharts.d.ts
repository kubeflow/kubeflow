/// <reference types="react"/>
import { ApexOptions } from 'apexcharts'
/**
 * Basic type definitions from https://apexcharts.com/docs/react-charts/#props
 */
declare module "react-apexcharts" {
  interface Props {
    type?: "line"
    | "area"
    | "bar"
    | "histogram"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "treemap"
    | "boxPlot"
    | "candlestick"
    | "radar"
    | "polarArea"
    | "rangeBar",
    series?: Array<any>,
    width?: string | number,
    height?: string | number,
    options?: ApexOptions,
    [key: string]: any,
  }
  export default class ReactApexChart extends React.Component<Props> {}    
}

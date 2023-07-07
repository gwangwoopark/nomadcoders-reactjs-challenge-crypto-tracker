import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";
import { useTheme } from "styled-components";

interface IHistorical {
  close: string;
  high: string;
  low: string;
  market_cap: number;
  open: string;
  time_close: number;
  time_open: number;
  volume: string;
}

interface CoinOutletContext {
  coinId: string;
}

function Chart() {
  const theme = useTheme();
  const { coinId } = useOutletContext<CoinOutletContext>();
  const { isLoading, data } = useQuery<IHistorical[]>({
    queryKey: ["ohlcv", coinId],
    queryFn: () => fetchCoinHistory(coinId),
  });

  return (
    <div>
      {isLoading || !theme ? (
        "Loading chart..."
      ) : (
        <ApexCharts
          type="candlestick"
          series={[
            {
              name: "Price",
              data: data?.map((price) => {
                return {
                  x: price.time_close * 1000,
                  y: [
                    Number(price.open),
                    Number(price.low),
                    Number(price.high),
                    Number(price.close),
                  ],
                };
              }) ?? [[]],
            },
          ]}
          options={{
            theme: { mode: theme.title },
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            grid: {
              show: true,
            },
            yaxis: {
              show: true,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: true },
              type: "datetime",
            },
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(3)}`,
              },
              x: {
                format: "dd/MM/yy",
              },
            },
          }}
        />

        // <ApexCharts
        //   type="line"
        //   series={[
        //     {
        //       name: "Price",
        //       data: data?.map((price) => Number(price.close)) ?? [],
        //     },
        //   ]}
        //   options={{
        //     theme: { mode: "dark" },
        //     chart: {
        //       height: 300,
        //       width: 500,
        //       toolbar: { show: false },
        //       background: "transparent",
        //     },
        //     grid: {
        //       show: false,
        //     },
        //     yaxis: {
        //       show: false,
        //     },
        //     xaxis: {
        //       axisBorder: { show: false },
        //       axisTicks: { show: false },
        //       labels: { show: false },
        //       type: "datetime",
        //       categories: data?.map((price) => price.time_close * 1000) ?? [],
        //     },
        //     stroke: {
        //       curve: "smooth",
        //       width: 4,
        //     },
        //     fill: {
        //       type: "gradient",
        //       gradient: {
        //         gradientToColors: ["#0be881"],
        //         stops: [0, 100],
        //       },
        //     },
        //     colors: ["#0fbcf9"],
        //     tooltip: {
        //       y: {
        //         formatter: (value) => `$ ${value.toFixed(3)}`,
        //       },
        //       x: {
        //         format: "dd/MM/yy",
        //       },
        //     },
        //   }}
        // />
      )}
    </div>
  );
}

export default Chart;

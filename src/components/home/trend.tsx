"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { ReviewsTrendProps } from "@/types/home";
import styles from "./trend.module.css";

interface TooltipPayloadItem {
  payload: {
    displayDay: string;
    reviews: number;
  };
  value?: number;
}

const Trend: React.FC<ReviewsTrendProps> = ({ data, className = "" }) => {
  const lastDayInMonth =
    data && data.length > 0
      ? Math.max(...data.map((item) => parseInt(item.displayDay.split(" ")[1])))
      : 31;

  const CustomTooltip: React.FC<{
    active?: boolean;
    payload?: TooltipPayloadItem[];
    label?: string;
  }> = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className={styles.tooltip}>
          <p className={styles.tooltipLabel}>{dataPoint.displayDay}</p>
          <p className={styles.tooltipValue}>
            Reviews: {payload[0].value?.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  const formatYAxisTick = (value: number) => {
    if (value >= 1000) {
      return `${value / 1000}k`;
    }
    return value.toString();
  };

  return (
    <section className={`${className}`}>
      <div className={styles.trendCard}>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
              }}
            >
              <defs>
                <linearGradient
                  id="reviewsGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="#4A90E2" stopOpacity={0.4} />
                  <stop offset="50%" stopColor="#4A90E2" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#4A90E2" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke="#FFFFFF"
                strokeOpacity={0.1}
                horizontal={true}
                vertical={false}
                horizontalPoints={[10000, 20000, 30000]}
              />
              <XAxis
                dataKey="displayDay"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#9CA3AF", fontWeight: 500 }}
                interval={0}
                height={40}
                tickFormatter={(value: string) => {
                  if (typeof value !== 'string') {
                    return "";
                  }
                  const parts = value.split(" ");
                  const day = parseInt(parts[1]);

                  if (
                    day === 1 ||
                    day === 10 ||
                    day === 20 ||
                    day === lastDayInMonth
                  ) {
                    return parts[0] + " " + parts[1];
                  }
                  return "";
                }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#9CA3AF", fontWeight: 500 }}
                tickFormatter={formatYAxisTick}
                domain={[0, "dataMax + 2000"]}
                ticks={[10000, 20000, 30000]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="reviews"
                stroke="#4A90E2"
                strokeWidth={3}
                fill="url(#reviewsGradient)"
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#4A90E2",
                  strokeWidth: 2,
                  stroke: "#fff",
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default Trend;

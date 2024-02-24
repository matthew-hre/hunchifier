"use client";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { ResponsiveLine } from "@nivo/line";
import { use, useState, useEffect, FC } from "react";
import { timeParse, timeFormat } from "d3-time-format";

export default function AnalyticsClient(props: any) {
  const [dailyData, setDailyData] = useState<TransformedData[]>([]);
  const [hourlyData, setHourlyData] = useState<TransformedData[]>([]);

  useEffect(() => {
    setHourlyData(transformData(props.hourlyData));
    setDailyData(transformData(props.dailyData));
  }, [props.hourlyData, props.dailyData]);

  return (
    <div className="flex flex-col w-full mt-10">
      <main className="flex min-h-screen- flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
        <div className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="flex flex-col">
              <CardHeader>
                <CardDescription>Hourly Rankings</CardDescription>
                <CardTitle></CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart
                  className="aspect-[4/3]"
                  data={hourlyData}
                  charttype={"hourly"}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardDescription>Daily Rankings</CardDescription>
                <CardTitle></CardTitle>
              </CardHeader>
              <CardContent>
                <LineChart className="aspect-[4/3]" data={dailyData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function LineChart(props: any) {
  const colorMapping: { [key: string]: string } = {
    Thomas: "#1f77b4",
    Kostya: "#acc2d9",
    Sunny: "#ffd700",
    Velibor: "#cfff04",
    Archit: "#c879ff",
    Marusia: "#7f7f7f",
    Archie: "#ff5165",
    Dylan: "#017374",
    Nate: "#ff69b4",
    Jake: "#8b4513",
    Khalaf: "#ff7f0e",
    Tadhg: "#d62728",
    Harsheen: "#4682b4",
    Nicole: "#808000",
    Jessika: "#ff00ff",
    Jameson: "#6a51a3",
    Matthew: "#4a8a08",
    Kaydan: "#28a063",
    Manning: "#341739",
  };

  const parseDate = timeParse("%Y-%m-%d");
  const formatDate = timeFormat("%m-%d");

  return (
    <div {...props}>
      <ResponsiveLine
        data={props.data}
        {...(props.charttype === "hourly"
          ? {
              axisBottom: {
                format: "%I:%M%p",
                tickValues: "every 1 hour",
                legend: "Time of day",
                legendOffset: 50,
                renderTick: CustomTickComponent,
                legendPosition: "middle",
              },
              xScale: {
                type: "time",
                format: "%Y-%m-%dT%H:%M:%S",
                useUTC: false,
                precision: "hour",
              },
            }
          : {
              axisBottom: {
                tickSize: 0,
                tickPadding: 0,
                tickRotation: 45,
                legend: "Date",
                legendOffset: 48,
                legendPosition: "middle",
                format: (value) => {
                  const date = parseDate(value);
                  return date ? formatDate(date) : "";
                },
              },
              xScale: {
                type: "point",
              },
              legends: [
                {
                  anchor: "bottom-left",
                  direction: "column",
                  justify: false,
                  translateX: 10,
                  translateY: 0,
                  itemsSpacing: 2,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ],
            })}
        margin={{ top: 10, right: 50, bottom: 60, left: 40 }}
        yScale={{
          type: "linear",
          reverse: true,
          min: 1,
          max: 18,
        }}
        axisTop={null}
        axisRight={null}
        axisLeft={{
          tickSize: 5,
          tickValues: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
          ],
          tickPadding: 16,
        }}
        tooltip={({ point }) => (
          <div
            style={{
              background: "white",
              padding: "9px 12px",
              border: "1px solid #ccc",
            }}
          >
            <div>
              <strong>{point.serieId}</strong>
            </div>{" "}
            {/* Display the legend */}
            <div>y: {point.data.yFormatted}</div> {/* Display the y value */}
          </div>
        )}
        colors={({ id }: any) => colorMapping[id] || "#000"}
        pointSize={6}
        useMesh={true}
        gridYValues={1}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        role="application"
      />
    </div>
  );
}

type Record = {
  first_name: string;
  date: string;
  rank: number;
};

type TransformedData = {
  id: string;
  data: Array<{ x: string; y: number }>;
};

function transformData(records: Record[]): TransformedData[] {
  const groupedByUser: Map<string, Array<{ x: string; y: number }>> = new Map();

  // Step 1: Group records by first_name
  records.forEach(({ first_name, date, rank }) => {
    if (!groupedByUser.has(first_name)) {
      groupedByUser.set(first_name, []);
    }
    const userData = groupedByUser.get(first_name);
    userData?.push({ x: date, y: rank });
  });

  // Step 2 & 3: Create the transformed data array
  const transformedData: TransformedData[] = [];
  groupedByUser.forEach((data, id) => {
    transformedData.push({ id, data });
  });

  return transformedData;
}

const CustomTickComponent = ({
  x,
  y,
  value,
}: {
  x: number;
  y: number;
  value: any;
}) => {
  const date = new Date(value);

  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;

  return (
    <>
      <text x={x} y={y + 20} textAnchor="middle" style={{ fontSize: 12 }}>
        {timeStr}
      </text>
      <text
        x={x}
        y={y + 40}
        textAnchor="middle"
        style={{ fontSize: 12, fontWeight: "bold" }}
      >
        {dateStr}
      </text>
    </>
  );
};

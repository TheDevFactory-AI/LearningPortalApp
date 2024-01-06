import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export type MetricData={
  //refactor this
    name:string,
    total:number
}

export const BarChartDisplayer = ({data}:{data:MetricData[]}) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 20, right: 5, bottom: -10, left: -25 }}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `$${value}`}
        />
        <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"

export type MetricData={
  //refactor this
    name:string,
    total:number
}

export const BarChartDisplayer = ({data}:{data:MetricData[]}) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} margin={{ top: 20, right: 5, bottom: -10, left: -25 }}>
      <CartesianGrid strokeDasharray="4" />
        <XAxis
          dataKey="name"
          stroke="black"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="black"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar dataKey="total" fill="#02f7ef" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

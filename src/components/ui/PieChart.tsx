import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { MetricData } from './BarChart';

type PieChartDisplayerProp={
    metricDataName:string,
    metricData:MetricData[]
}

const PieChartDisplayer = ({data}:{data:[PieChartDisplayerProp] | [PieChartDisplayerProp,PieChartDisplayerProp]}) => {
    const dataLength=data.length
  return (
    <ResponsiveContainer width="100%" height="100%">
    <PieChart width={730} height={250}>
        <Pie 
        data={data[0].metricData} 
        dataKey="total" 
        nameKey="name" 
        cx="50%" 
        cy="50%" 
        outerRadius={50} 
        fill="#82ca9d" label />
    {
      dataLength===2 && <Pie data={data[1].metricData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={70} outerRadius={90} fill="#82ca9d" label />
    }
    </PieChart>
          </ResponsiveContainer>
  )
}

export default PieChartDisplayer
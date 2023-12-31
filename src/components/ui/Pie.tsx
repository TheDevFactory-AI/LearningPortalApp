import { PieChart, Pie } from 'recharts';
import { MetricData } from './BarChart';

export type PieChartDisplayerProp={
    metricDataName:string,
    metricData:MetricData[]
}

const PieChartDisplayer = ({data}:{data:[PieChartDisplayerProp] | [PieChartDisplayerProp,PieChartDisplayerProp]}) => {
    const dataLength=data.length
  return (
    
      <PieChart width={200} height={200}>
          <Pie 
          data={data[0].metricData} 
          dataKey="total" 
          nameKey="name" 
          cx="50%" 
          cy="50%" 
          outerRadius={65} 
          fill="#c6f702" />
      {
        dataLength===2 && <Pie data={data[1].metricData} dataKey="total" nameKey="name" cx="50%" cy="50%" innerRadius={75} outerRadius={95} fill="#02f7ef"  />
      }
      </PieChart>
     
  )
}

export default PieChartDisplayer
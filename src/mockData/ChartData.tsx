import { PieChartDisplayerProp } from "@/components/ui/PieChart"

export const data01: PieChartDisplayerProp = {metricDataName: "Data1", metricData: [
        { name: 'Group A', total: 400 },
        { name: 'Group B', total: 300 },
        { name: 'Group C', total: 300 },
        { name: 'Group D', total: 200 },
      ]
    }

export const data02: PieChartDisplayerProp = {metricDataName: "Data2", metricData: [
        { name: 'A1', total: 100 },
        { name: 'A2', total: 300 },
        { name: 'B1', total: 100 },
        { name: 'B2', total: 80 },
        { name: 'B3', total: 40 },
        { name: 'B4', total: 30 },
        { name: 'B5', total: 50 },
        { name: 'C1', total: 100 },
        { name: 'C2', total: 200 },
        { name: 'D1', total: 150 },
        { name: 'D2', total: 50 },
      ]
    }
  

export const barChartData = [
    {name: "React", total: 70}, 
    {name: "JS", total: 100}, 
    {name: "TS", total: 97},
    {name: "CSS", total: 93},
  ]

export const barChartData2 = [
    {name: "MongoDB", total: 86}, 
    {name: "SQL", total: 94}, 
    {name: "NoSQL", total: 97},
    {name: "AWS", total: 93},
    {name: "NodeJS", total: 84}
  ]
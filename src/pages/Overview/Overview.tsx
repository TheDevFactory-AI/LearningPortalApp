import { Route } from "@tanstack/react-router"
import { MainAppRoute } from "@/rootRoutes/MainApp"
import { manageAccessToken } from "@/utils/Auth/Session"
import { AuthenticateUserResp } from "../Authentication/AuthUtils/Login"
import { Card, CardTitle, CardContent } from "@/components/ui/card" 
import PieChartDisplayer from "@/components/ui/Pie"
import { BarChartDisplayer } from "@/components/ui/BarChart"
import { data01, data02, barChartData, barChartData2 } from "@/mockData/ChartData"
import {TitleSmall, Title, Header} from "@/components/ui/Title"
import Timeline from "./Timeline"
import { projectsList } from "@/mockData/projects"
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const Overview=()=>{
  return (
    <div className="flex flex-col p-4 bg-gray-100 min-h-screen">
      <div className="flex pl-4 ">
        <Header>Overview</Header>
      </div>
      
      <div className="grid grid-cols-3">
        
        <div className="flex flex-col basis-1/3">
          <Card className="basis-1/2 m-4 p-4 bg-white border-none">
            <CardTitle className="flex text-white">
              <Title>Overrall Rating</Title>
            </CardTitle>
            <CardContent className="flex justify-center items-center m-8">
              <PieChartDisplayer data={[data01]}/>
            </CardContent>
          </Card>
          <Card className="basis-1/2 m-4 p-4 bg-white border-none">
            <CardTitle className="flex text-white">
              <Title>Front-End</Title>
            </CardTitle>
            <CardContent className="flex justify-center items-center m-4">
              <BarChartDisplayer data={barChartData}/>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col basis-1/3">
          <Card className="basis-1/2 m-4 p-4 bg-white border-none">
            <CardTitle className="basis-1/2 text-white">
              <Title>Version Control and Workflow</Title>
            </CardTitle>
            <CardContent className="flex basis-1/2 justify-center items-center m-8">
              <PieChartDisplayer data={[data02]}/>
            </CardContent>
          </Card>
          <Card className="basis-1/2 m-4 p-4 bg-white border-none">
            <CardTitle className="flex text-white">
              <Title>Back-End</Title>
            </CardTitle>
            <CardContent className="flex justify-center items-center m-4">
              <BarChartDisplayer data={barChartData2}/>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col basis-1/3">
          {/* <div className="flex basis-1/2"> */}
            <Timeline projects={projectsList}/>
          {/* </div> */}

          <div className="flex flex-row basis-1/2">
            <Card className="basis-1/2 m-4 p-4 bg-white border-none">
              <CardTitle className="flex text-white">
                <TitleSmall>Code Quality and Efficiency</TitleSmall>
              </CardTitle>
              <CardContent className="flex pt-8 justify-center items-center">
                <h1 className="text-3xl font-bold">8.5/10</h1>
              </CardContent>
            </Card>
            <Card className="basis-1/2 m-4 p-4 bg-white border-none">
              <CardTitle className="flex text-white">
                <TitleSmall>Problem-Solving Skills</TitleSmall>
              </CardTitle>
              <CardContent className="flex pt-8 justify-center items-center">
              <h1 className="text-3xl font-bold">8.0/10</h1>
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-row basis-1/2">
            <Card className="basis-1/2 m-4 p-4 bg-white border-none">
              <CardTitle className="flex text-white">
                <TitleSmall>Project Management</TitleSmall>
              </CardTitle>
              <CardContent className="flex pt-8 justify-center items-center">
                <h1 className="text-3xl font-bold">7.4/10</h1>
              </CardContent>
            </Card>
            <Card className="basis-1/2 m-4 p-4 bg-white border-none">
              <CardTitle className="flex text-white">
                <TitleSmall>Communication Skills</TitleSmall>
              </CardTitle>
              <CardContent className="flex pt-8 justify-center items-center">
                <h1 className="text-3xl font-bold">9.0/10</h1>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

const OverViewRoute = new Route({
    getParentRoute: () => MainAppRoute,
    path: "/overview",
    component: Overview,
    beforeLoad:async ({context:{auth,queryClient}})=>{
      const session=await manageAccessToken({AuthPayload:auth})
      if(!session){//no token means that token is still good
        return
      }
      const newAuthPayload={
        ...auth,
          session
        } as AuthenticateUserResp
      queryClient.setQueryData(['Auth'],newAuthPayload)
      return {
        auth:newAuthPayload
      }
    },
    })
export default OverViewRoute;
import { Route } from "@tanstack/react-router"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import PressableButton from "@/components/ui/pressableButton"
import { MainAppRoute } from "@/rootRoutes/MainApp"
import { manageAccessToken } from "@/utils/Auth/Session"
import { AuthenticateUserResp } from "../Authentication/AuthUtils/Login"
import { Card, CardTitle, CardContent } from "@/components/ui/card" 
import PieChartDisplayer from "@/components/ui/Pie"
import { BarChartDisplayer } from "@/components/ui/BarChart"
import { data01, data02, barChartData } from "@/mockData/ChartData"
import Title from "@/components/ui/Title"
import Header from "@/components/ui/Header"
import Timeline from "./Timeline"
import { projectsList } from "@/mockData/projects"


function AccordionDemo() {
  return (
    {/* <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
            <PressableButton
            props={{variant:"ghost"}}
            onPress={()=>console.log('pressed')}>
              Hover me !
            </PressableButton>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
 */}
  )
}



const Overview=()=>{
  return (
    <div className="flex flex-col p-4 bg-blue-950 min-h-screen">
    {/* <AccordionDemo />  */}
      <div className="flex pl-4 ">
        <Header>Overview</Header>
      </div>
      
      <div className="grid grid-cols-3">
        
        <div className="flex flex-col basis-1/3">
          <Card className="basis-1/2 m-4 p-4 bg-blue-700 border-none">
            <CardTitle className="flex text-white">
              <Title>Title</Title>
            </CardTitle>
            <CardContent className="flex justify-center items-center m-8">
              <PieChartDisplayer data={[data01, data02]}/>
            </CardContent>
          </Card>
          <Card className="basis-1/2 m-4 p-4 bg-blue-700 border-none">
            <CardTitle className="flex text-white">
              <Title>Title</Title>
            </CardTitle>
            <CardContent className="flex justify-center items-center m-4">
              <BarChartDisplayer data={barChartData}/>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col basis-1/3">
          <Card className="basis-1/2 m-4 p-4 bg-blue-700 border-none">
            <CardTitle className="flex text-white">
              <Title>Title</Title>
            </CardTitle>
            <CardContent className="flex justify-center items-center m-8">
              <PieChartDisplayer data={[data02, data01]}/>
            </CardContent>
          </Card>
          <Card className="basis-1/2 m-4 p-4 bg-blue-700 border-none">
            <CardTitle className="flex text-white">
              <Title>Title</Title>
            </CardTitle>
            <CardContent className="flex justify-center items-center m-4">
              <BarChartDisplayer data={barChartData}/>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col basis-1/3">
          {/* <div className="flex basis-1/2"> */}
            <Timeline projects={projectsList}/>
          {/* </div> */}

          <div className="flex flex-row basis-1/2">
            <Card className="basis-1/2 m-4 p-4 bg-blue-700 border-none">
              <CardTitle className="flex text-white">
                <Title>Title</Title>
              </CardTitle>
              <CardContent className="flex pt-8 justify-center items-center">
                1ms
              </CardContent>
            </Card>
            <Card className="basis-1/2 m-4 p-4 bg-blue-700 border-none">
              <CardTitle className="flex text-white">
                <Title>Title</Title>
              </CardTitle>
              <CardContent className="flex pt-8 justify-center items-center">
                1ms
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-row basis-1/2">
            <Card className="basis-1/2 m-4 p-4 bg-blue-700 border-none">
              <CardTitle className="flex text-white">
                <Title>Title</Title>
              </CardTitle>
              <CardContent className="flex pt-8 justify-center items-center">
                1ms
              </CardContent>
            </Card>
            <Card className="basis-1/2 m-4 p-4 bg-blue-700 border-none">
              <CardTitle className="flex text-white">
                <Title>Title</Title>
              </CardTitle>
              <CardContent className="flex pt-8 justify-center items-center">
                1ms
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
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
    <div className="p-4 bg-cyan-50 min-h-screen">
    {/* <AccordionDemo />  */}

    <div className="flex">
      <Card className="h-[350px] w-2/3 m-4 p-4 bg-white">
        <CardTitle className="flex justify-center items-center">Pie Chart</CardTitle>
        <CardContent className="flex justify-center items-center m-8">
          <PieChartDisplayer data={[data01, data02]}/>
        </CardContent>
      </Card>
      <Card className="h-[350px] w-1/3 m-4 p-4 bg-white">
        <CardTitle className="flex justify-center items-center">Pie Chart</CardTitle>
        <CardContent className="flex justify-center items-center m-4">
          <PieChartDisplayer data={[data02]}/>
        </CardContent>
      </Card>
    </div>
    <div className="flex">
      <Card className="h-[350px] w-[450px] m-4 p-4 bg-white">
        <CardTitle className="flex justify-center items-center">Bar Chart</CardTitle>
        <CardContent className="flex pt-8 justify-center items-center">
          <BarChartDisplayer data={barChartData}/>
        </CardContent>
      </Card>
      <Card className="h-[350px] w-[450px] m-4 p-4 bg-white">
        <CardTitle className="flex justify-center items-center">Bar Chart</CardTitle>
        <CardContent className="flex pt-8 justify-center items-center">
          <BarChartDisplayer data={barChartData}/>
        </CardContent>
      </Card>
      <Card className="h-[350px] w-[450px] m-4 p-4 bg-white">
        <CardTitle className="flex justify-center items-center">Bar Chart</CardTitle>
        <CardContent className="flex pt-8 justify-center items-center">
          <BarChartDisplayer data={barChartData}/>
        </CardContent>
      </Card>
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
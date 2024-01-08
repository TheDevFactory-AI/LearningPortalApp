/* eslint-disable @typescript-eslint/no-explicit-any */
import { MainAppRoute } from "@/rootRoutes/MainApp";
import { manageAccessToken } from "@/utils/Auth/Session";
import { Route } from '@tanstack/react-router';
import { AuthenticateUserResp } from "../Authentication/AuthUtils/Login";
import Header from "@/components/ui/Header";
import { useGetProjectsProjectId } from '../../../openapi/api/endpoints/default/default';

const CourseDetails = ({useParams}:{useParams:any}) => {
  const {courseId} = useParams();
  //create custom hook to get the data
  //const {data}=useSuspenseQuery(courseQueryOptions({courseId}))
  const {data}=useGetProjectsProjectId(courseId)
  
  return (
    <div className="flex flex-col p-4 bg-blue-950 min-h-screen">
      <div className="flex pl-4 ">
        <Header>{data?.projectName}</Header>
      </div>
    </div>
  )
}



const CourseDetailsRoute = new Route({
    getParentRoute: () => MainAppRoute,
    path: "course/$courseId",
    component: CourseDetails,//this is how the component is rendered based on the path
    //this is why the suspense is working
    /*
    parseParams: (params) => ({
      courseId: z.number().int().parse(Number(params.courseId)),
    }),
    */
    
    stringifyParams: ({ courseId }) => ({ courseId: `${courseId}` }),
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
    /*
    load:({params})=>{
      console.log(`loading time !!! @/course/${params.courseId}`) 
      //simply sure that data is loaded properly here
    }
    */
    

})

export default CourseDetailsRoute;


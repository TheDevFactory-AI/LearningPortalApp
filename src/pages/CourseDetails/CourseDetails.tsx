/* eslint-disable @typescript-eslint/no-explicit-any */
import { MainAppRoute } from "@/rootRoutes/MainApp";
import { manageAccessToken } from "@/utils/Auth/Session";
import { Route } from '@tanstack/react-router';
import { z } from 'zod';
import { AuthenticateUserResp } from "../Authentication/AuthUtils/Login";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
/*
const courseQueryOptions = ({courseId}:{courseId:number}) =>queryOptions({
  //bind page to 
  queryKey: ['course',courseId],
  queryFn: () =>  fetch(`/api/courses/${courseId}`).then((res) =>
  res.json()),
})
*/



//desperate attempt to get useParams to work
const CourseDetails = ({useParams}:{useParams:any}) => {
  const {courseId} = useParams();
  //create custom hook to get the data
  //const {data}=useSuspenseQuery(courseQueryOptions({courseId}))

 
  return (
    <div className="flex flex-col justify-center flex items-center h-screen bg-cyan-50">HEY {courseId}</div>
  )
}



const CourseDetailsRoute = new Route({
    getParentRoute: () => MainAppRoute,
    path: "course/$courseId",
    component: CourseDetails,//this is how the component is rendered based on the path
    //this is why the suspense is working
    parseParams: (params) => ({
      courseId: z.number().int().parse(Number(params.courseId)),
    }),
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


import { rootRoute } from "@/App"
import { Route } from '@tanstack/react-router';
import { z } from 'zod';

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
    <div>HEY {courseId}</div>
  )
}



const CourseDetailsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "course/$courseId",
    component: CourseDetails,//this is how the component is rendered based on the path
    //this is why the suspense is working
    parseParams: (params) => ({
      courseId: z.number().int().parse(Number(params.courseId)),
    }),
    stringifyParams: ({ courseId }) => ({ courseId: `${courseId}` }),
    /* this ensure that data is loaded before loading the component-needs a real API call
    - also validate in the future that context.queryClient is working correctly
    load: ({params,context}) =>
    //queryClient is expected to be passed in the context from parent route
    context.queryClient.ensureQueryData(
      courseQueryOptions({courseId:params.courseId}),
      //this last line ensures that the data is loaded before the component is rendered
      //by checking if the data is already in the cache
    ),
    */

})

export default CourseDetailsRoute;


import { rootRoute } from "@/App"
import { Route } from '@tanstack/react-router';
import { z } from 'zod';
import {queryOptions, useSuspenseQuery} from '@tanstack/react-query'

const courseQueryOptions = ({courseId}:{courseId:number}) =>
queryOptions({
  queryKey: ['course',courseId],
  queryFn: () =>  fetch(`/api/courses/${courseId}`).then((res) =>
  res.json()),
})


//desperate attempt to get useParams to work
const CourseDetails = ({useParams}:{useParams:any}) => {
  const {courseId} = useParams();
  //create custom hook to get the data
  const {data}=useSuspenseQuery(courseQueryOptions({courseId}))
  return (
    <div>{data}</div>
  )
}



const CourseDetailsRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "$courseId",
    component: CourseDetails,//this is how the component is rendered based on the path
    //this is why the suspense is working
    parseParams: (params) => ({
      courseId: z.number().int().parse(Number(params.courseId)),
    }),
    stringifyParams: ({ courseId }) => ({ courseId: `${courseId}` }),
    //load: (opts) =>
    //queryClient is expected to be passed in the context from parent route
    //opts.context.queryClient.ensureQueryData(
     // courseQueryOptions({courseId:opts.params.courseId}),
    //),
})

export default CourseDetailsRoute;


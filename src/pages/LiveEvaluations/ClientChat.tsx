import { MainAppRoute } from '@/rootRoutes/MainApp'
import { Route } from '@tanstack/react-router'
import { AuthenticateUserResp } from '../Authentication/AuthUtils/Login'
import { manageAccessToken } from '@/utils/Auth/Session'
import socket from '@/utils/Websocket/socket'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'



const ClientChat=()=>{
  const [fooEvents, setFooEvents] = useState([]);
  const {register, handleSubmit, setValue}=useForm()

  const sendMessage=({ClientMessage}:any)=>{
    console.log("emitting ClientMsg: ",ClientMessage)
    socket.emit("ClientMsg",ClientMessage)
    setValue('ClientMessage','')
  }

  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const onMessage=(value)=>{
      setFooEvents(fooEvents.concat(value));
    }

    socket.on('message', onMessage);

    return () => {
      socket.off('message', onMessage);
    };
  }, [fooEvents]);
  
  return (
    <Card className="h-[550px] w-[850px]">
        <CardHeader>
            <Card className="h-[50px] w-[800px] bg-blue-950">
                <h1 className="text-white text-bold">Live Evaluation</h1>
            </Card> 
        </CardHeader>
        <CardContent>
            <Card className="h-[350px] w-[800px] bg-black">

            </Card>
        </CardContent>
        <CardFooter>
            <form className="w-[800px]" onSubmit={handleSubmit(sendMessage)}>
                <Input 
                id="message" 
                placeholder="Send a message..." 
                className="mr-4 text-white bg-black"
                {...register('ClientMessage')}/>
                <Button type='submit'>Confirm</Button>
            </form>
        </CardFooter>
    </Card>
)
}


const ClientChatRoute = new Route({
    getParentRoute: () => MainAppRoute,
    path: "chat",
    component: ClientChat,//this is how the component is rendered based on the path
    //this is why the suspense is working
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
    }

})

export default ClientChatRoute;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { MainAppRoute } from '@/rootRoutes/MainApp'
import { Route } from '@tanstack/react-router'
import { AuthenticateUserResp } from '../Authentication/AuthUtils/Login'
import { manageAccessToken } from '@/utils/Auth/Session'
import socket from '@/utils/Websocket/socket'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ChatWindow from '@/components/Chat/ChatWindow'
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import Header from "@/components/ui/Header"
//import base_icon_white_background from "../../assets/base_icon_white_background.png"
import { ChatBubbleProp } from '@/components/Chat/MessageBubble'


const ClientChat=()=>{
  const [chatMessage, setChatMessage] = useState<ChatBubbleProp[]>([]);
  const {register, handleSubmit, setValue}=useForm()



  const sendMessage=({ClientMessage}:any)=>{
    console.log("emitting ClientMsg: ",ClientMessage)
    socket.emit("ClientMsg",ClientMessage)
    setValue('ClientMessage','')
    setChatMessage((chatMessage)=>[
      ...chatMessage,
      {
        from:'Me',
        text:ClientMessage
      }
    ])



  }

  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const onMessage=(value:string)=>{
      setChatMessage((chatMessage)=>[
        ...chatMessage,
        {
          from:'Bot',
          text:value
        }
      ])
    }

    socket.on('BotMessage', onMessage);

    return () => {
      socket.off('BotMessage', onMessage);
    };
  }, [chatMessage]);
  
  return (
    <div className="flex flex-auto flex-col justify-center flex items-center h-screen py-4 bg-blue-950 border">
      <div className="mb-8">
        <Header>Client Chat</Header>
      </div>
      {/* h-[700px] w-[1000px] */}
      <Card className="flex flex-col h-10/12 bg-black border-none"> 
        {/* <CardHeader className="basis-3/12">
            <Card className="flex grow justify-center items-center bg-blue-500">
                <Title>Live Evaluation</Title>
            </Card> 
        </CardHeader> */}
        <CardContent className="basis-8/12 p-1">
            <ChatWindow 
            conversation={chatMessage}
            />
        </CardContent>
        <CardFooter className="flex p-1">
            <form className="flex grow" onSubmit={handleSubmit(sendMessage)}>
                <Input 
                id="message" 
                placeholder="Send a message..." 
                className="flex-1 mr-2 text-white bg-black"
                {...register('ClientMessage')}/>
                <Button type='submit'><SendRoundedIcon/></Button>
            </form>
        </CardFooter>
      </Card>
    </div>
    
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

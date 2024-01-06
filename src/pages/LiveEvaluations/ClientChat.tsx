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
    const onMessage=(value:any)=>{
      setFooEvents(fooEvents.concat(value));
    }

    socket.on('message', onMessage);

    return () => {
      socket.off('message', onMessage);
    };
  }, [fooEvents]);
  
  return (
    <div className="flex flex-auto flex-col justify-center flex items-center h-screen py-4 bg-blue-950">
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
            conversation={[
              {"from": "Bot", "text": "Hey"},
              {"from": "Me", "text": "Good morning! Could you help me with my code?"},
              {"from": "Bot", "text": "Of course! Please provide me with the details."},
              {"from": "Me", "text": "I'm having trouble with a loop in Python."},
              {"from": "Bot", "text": "I see. Can you show me the code snippet you're struggling with?"},
              {"from": "Me", "text": "Sure, here it is: for i in range(10): print(i)"},
              {"from": "Bot", "text": "Your loop looks fine. Are you getting any error messages?"},
              {"from": "Me", "text": "No, but it doesn't produce the output I expect."},
              {"from": "Bot", "text": "Let's debug it together. What output are you expecting?"},
              {"from": "Me", "text": "I want it to print each number on a new line, but it's printing them all on the same line."},
              {"from": "Bot", "text": "Ah, I see. It's because you're using Python 2, where print is a statement and not a function. Try adding from __future__ import print_function at the top of your file."},
              {"from": "Me", "text": "That worked, thanks! Now, how can I make it print only even numbers?"},
              {"from": "Bot", "text": "You can add a condition inside the loop to check if the number is even by using the modulus operator. For example: for i in range(10): if i % 2 == 0: print(i)"},
              {"from": "Me", "text": "Awesome, got it. What if I want to store these even numbers in a list?"},
              {"from": "Bot", "text": "You can create an empty list before the loop and then append each even number to the list inside the loop. Like this: even_numbers = [] for i in range(10): if i % 2 == 0: even_numbers.append(i)"},
              {"from": "Me", "text": "Perfect, thanks for all the help, Bot!"},
              {"from": "Bot", "text": "You're welcome! Don't hesitate to ask if you have more questions."}
            ]}
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
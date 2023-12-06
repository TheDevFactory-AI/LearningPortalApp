import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import PressableButton from "@/components/ui/pressableButton"


type Conversation={
    author: "Client" | "Server "
    content:string
}[]//make it so that the box #pause takes in a conversation and displays it nicely



/**
 * Create a chat app which
 * @one Displays messages left and right side of the box depending of if its either sender or receiver (jean)
 * @two takes an array of conversation and displays it porperly
 */
const Chat=({onSubmit}:{onSubmit:()=>void})=>{

  
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
                <form className="w-[800px]" onSubmit={onSubmit}>
                    <Input id="message" placeholder="Send a message..." className="mr-4 text-white bg-black"/>
                    <PressableButton onPress={()=>{}}>Send</PressableButton>
                </form>
            </CardFooter>
        </Card>
    )
}


export default Chat;
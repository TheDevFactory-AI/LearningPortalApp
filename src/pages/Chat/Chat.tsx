//import { Route } from "@tanstack/react-router"
//import { rootRoute } from "../../App"
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import PressableButton from "@/components/ui/pressableButton"

const Chat=()=>{

    const sendHandler=()=>{

    }

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
                <form className="w-[800px]">
                    <Input id="message" placeholder="Send a message..." className="mr-4 text-white bg-black"/>
                    <PressableButton onPress={sendHandler}>Send</PressableButton>
                </form>
            </CardFooter>
        </Card>
    )
}


export default Chat;
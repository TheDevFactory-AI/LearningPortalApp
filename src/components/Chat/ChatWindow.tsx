import { Card} from "@/components/ui/card"
import MessageBubble, { ChatBubbleProp } from "./MessageBubble"


/**
 * Create a chat app which
 * @one Displays messages left and right side of the box depending of if its either sender or receiver (jean)
 * @two takes an array of conversation and displays it porperly
 */
const ChatWindow=({conversation}:{conversation:ChatBubbleProp[]})=>{
    const showChat=conversation && conversation.length
    return (
        <Card className="h-[350px] w-[800px] bg-black  overflow-auto p-4">
        {showChat && conversation.map(({from,text})=>{
            return <MessageBubble  from={from} text={text}/>
        }
        )}
        </Card>
    )
}

ChatWindow({
    conversation:[]
})


export default ChatWindow;
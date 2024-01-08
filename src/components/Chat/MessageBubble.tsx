// MessageBubble component
//import { useState } from "react";

export type ChatBubbleProp={
    from:'Me' | 'Bot',
    text: string
}
const MessageBubble = ({ from, text }:ChatBubbleProp) => {
    //const [word, setWord] = useState<String>();

    const isMe = from === 'Me';

    for(let i=0; i<text.length; i++){
      //setWord(text[i])
    }
    console.log(text.length);
    console.log(text);
    return (
      <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} my-2`}>
        <div lang="en" className={`relative max-w-xl lg:max-w-md px-4 py-2 text-sm rounded-t-3xl break-normal hyphens-auto ${isMe ? 'bg-blue-600 text-white rounded-bl-3xl' : 'bg-gray-200 text-gray-800 rounded-br-3xl'}`}>
          {text}
          {/* Tail for the speech bubble */}
          <span className={`absolute bottom-0 ${isMe ? 'right-0 mr-[-6px]' : 'left-0 ml-[-6px]'} w-0 h-0 border-b-8 ${isMe ? 'border-b-blue-600' : 'border-b-gray-200'} border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent`}></span>
        </div>
      </div>
    );
  };
  

export default MessageBubble
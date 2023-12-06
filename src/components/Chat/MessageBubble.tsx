// MessageBubble component
export type ChatBubbleProp={
    from:'Me' | 'Bot',
    text: string
}
const MessageBubble = ({ from, text }:ChatBubbleProp) => {
    const isMe = from === 'Me';
    return (
      <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} my-2`}>
        <div className={`relative max-w-xs lg:max-w-md px-4 py-2 text-sm rounded-3xl ${isMe ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
          {text}
          {/* Tail for the speech bubble */}
          <span className={`absolute bottom-0 ${isMe ? 'right-0 mr-[-6px]' : 'left-0 ml-[-6px]'} w-0 h-0 border-b-8 ${isMe ? 'border-b-blue-600' : 'border-b-gray-200'} border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent`}></span>
        </div>
      </div>
    );
  };
  

export default MessageBubble
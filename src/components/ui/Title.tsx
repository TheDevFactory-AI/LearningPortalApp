export const TitleSmall = ({children}:{children:React.ReactNode}) => {
    return (
        <h1 className="text-black text-bold text-l break-words">{children}</h1>
    )
}

export const Title = ({children}:{children:React.ReactNode}) => {
    return (
        <h1 className="text-black text-bold text-xl break-words">{children}</h1>
    )
}

export const Header = ({children}:{children:React.ReactNode}) => {
    return (
        <h1 className="text-black font-bold text-3xl break-words">{children}</h1>
    )
}
  

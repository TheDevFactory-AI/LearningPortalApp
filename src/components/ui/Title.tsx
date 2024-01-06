export const TitleSmall = ({children}:{children:React.ReactNode}) => {
    return (
        <h1 className="text-white text-bold text-l break-normal">{children}</h1>
    )
}

export const Title = ({children}:{children:React.ReactNode}) => {
    return (
        <h1 className="text-white text-bold text-2xl break-all">{children}</h1>
    )
}

export const Header = ({children}:{children:React.ReactNode}) => {
    return (
        <h1 className="text-white text-bold text-3xl">{children}</h1>
    )
}
  

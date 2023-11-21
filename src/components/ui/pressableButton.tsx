import { Button } from "./button"

type ButtonProps={
    props?: any,
    children: React.ReactNode,
    onPress:()=>void
}
const PressableButton = ({props,children,onPress}:ButtonProps) => {
  return (
    <Button asChild {...props}>
        <button onClick={onPress}>
            {children}
        </button>
    </Button>
  )
}

export default PressableButton
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import PressableButton from "../ui/pressableButton"
import { LinearProgress } from "@mui/material"


export type AuthCardProps = {
  children: React.ReactNode,
  onSubmit: () => void,
  cardTitle: string,
  cardDescription: string,
  loading:boolean
}
export function AuthCard({
  children,
  onSubmit,
  cardTitle,
  cardDescription,
  loading}:AuthCardProps) {


  return (
    <Card className="w-[350px] bg-white">
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle> 
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
        <div className="min-h-40">
          {loading && <LinearProgress/> }
        </div>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <PressableButton onPress={onSubmit}>Submit</PressableButton>
      </CardFooter>
      
    </Card>
  )
}

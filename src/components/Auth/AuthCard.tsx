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


type AuthCardProps = {
  children: React.ReactNode,
  onSubmit: () => void,
  cardTitle: string,
  cardDescription: string
}
export function AuthCard({
  children,
  onSubmit,
  cardTitle,
  cardDescription}:AuthCardProps) {


  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle> 
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <PressableButton onPress={onSubmit}>Submit</PressableButton>
      </CardFooter>
    </Card>
  )
}

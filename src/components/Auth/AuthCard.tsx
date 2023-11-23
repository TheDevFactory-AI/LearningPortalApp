import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "react-hook-form"
import PressableButton from "../ui/pressableButton"

/**
 * Refactor this component to handle all forms within a card
 * AND a cancel button + submit button
 * @returns 
 */
export function AuthCard() {
  const {register,handleSubmit,getValues}=useForm()
  const onSubmit=(data:any)=>{
    console.log(JSON.stringify(data))
  }
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your email and password to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">e-mail</Label>
              <Input id="email" type="email" {...register("email")}/>
            </div>
            <div className="flex flex-col space-y-1.5">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">password</Label>
              <Input id="password" type="password" {...register("password")} />
            </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <PressableButton onPress={()=>console.log(JSON.stringify(getValues()))}>Submit</PressableButton>
      </CardFooter>
    </Card>
  )
}

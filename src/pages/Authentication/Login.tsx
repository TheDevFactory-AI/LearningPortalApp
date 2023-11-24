import { rootRoute } from "@/App";
import { AuthCard } from "@/components/Auth/AuthCard"
import FormElements from "@/components/ui/FormElements"
import { SignIn } from "@/utils/AuthUtils/Login";
import { LoginSchema } from "@/utils/FormUtils/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Route } from "@tanstack/react-router";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Login = () => {
  const { register, handleSubmit, formState: {errors} } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      userName: "",
      password: "",
    }});
  const _triggerSubmit = () => {
    submitRef?.current?.click();
  };
  const submitRef = useRef(null) as any
  const onSubmit = async (data:any) => {
    try{
      const {accessToken}=await SignIn({
        userName:data.userName,
        password:data.password
      })
      console.log(accessToken);
    }catch(e){
      console.log(e);
      return
    }
    
  };
  return (
    <AuthCard 
    cardTitle="Log in"
    cardDescription="Enter your username and password to log into your account"
    onSubmit={_triggerSubmit}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormElements
        errors={errors}
        formMembers={[
          {id:"userName",label:"Username",type:"text",register,name:"userName"},
          {id:"password",label:"Password",type:"password",register,name:"password"}
      ]}/>
        <input type="submit" value="Submit" style={{ display: 'none' }} ref={submitRef} />
      </form>
    </AuthCard>
  )
}

const LogInRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
})


export default LogInRoute
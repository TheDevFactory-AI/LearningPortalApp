/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthCard } from "@/components/Auth/AuthCard"
import FormElements from "@/components/ui/FormElements"
import { useSignIn } from "@/utils/Auth/Session";
import { LoginSchema } from "@/utils/FormUtils/FormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Login = () => {
  const navigate=useNavigate({from:'/Auth'})
  const queryClient=useQueryClient()
  const { register, handleSubmit, formState: {errors} } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      userName: "",
      password: "",
    }});
  const {mutate:SignIn,isSuccess,isPending}=useSignIn({queryClient})
  const _triggerSubmit = () => {
    submitRef?.current?.click();
  };
  const submitRef = useRef(null) as any

  const onSubmit = async (data:{userName:string,password:string}) => {
    SignIn({
      userName:data.userName,
      password:data.password
    })
  };

  if(isSuccess && queryClient.getQueryData(['Auth'])){
    navigate({to:'/'})
  }
  return (
    <AuthCard 
    loading={isPending}
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

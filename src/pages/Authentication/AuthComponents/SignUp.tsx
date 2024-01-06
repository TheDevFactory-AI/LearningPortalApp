/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import * as z from 'zod';
import { SignupSchema } from "@/utils/FormUtils/FormSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { confirmSignUp } from '../AuthUtils/Signup';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardWithNoFooter } from "@/components/ui/CardWithNoFooter";
import { AuthCard } from '@/components/Auth/AuthCard';
import FormElements from "@/components/ui/FormElements";
import { useQueryClient } from '@tanstack/react-query';
import { useSignIn, useSignUp } from '@/utils/Auth/Session';
import { LinearProgress } from '@mui/material';
import { useNavigate } from '@tanstack/react-router';
//import { CognitoUser } from 'amazon-cognito-identity-js';



export const SignUp = ({setConfirmationStage}:{setConfirmationStage:()=>void}) => {
  const navigate=useNavigate({from:'/Auth'})
  const [signupCodeStatus,setSignupCodeStatus]=useState<'idle' | 'in progress'>('idle')
  const queryClient=useQueryClient()
  const {mutate:Login,isSuccess:loginSuccess}=useSignIn({queryClient})
  const {mutate:SignUp,isSuccess:signupSuccess,isPending:signUpLoading,status:signUpStatus}=useSignUp()
  const { register, handleSubmit, formState: {errors}, getValues } = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    }});
  const submitRef = useRef(null) as any
  const _triggerSubmit = () => {
    submitRef?.current?.click(); // Programmatically click the hidden submit button
  };
  const { register:confirmationCodeRegister, handleSubmit:confirmSubmit  } = useForm()

  const onSubmit = async (data:any) => {
    SignUp({
      name:data.userName,
      email:data.email,
      password:data.password,
      phone_number:'+254712345678',
     })
     if (signUpStatus === 'success'){
        setConfirmationStage();
     }
  };

  if(loginSuccess && queryClient.getQueryData(['Auth'])){
    navigate({to:'/'})
  }


  const confirmEmail = async (data:any) => {
    const userName=getValues('userName');
    const password=getValues('password');
    setSignupCodeStatus('in progress')
    try{
      await confirmSignUp({
          code:data.confirmationCode,
          userName
        })
      setSignupCodeStatus('idle')
      Login({userName,password})
    }catch(e){
      console.log(e);
      return
    }
    

  }

  if(signupSuccess){
    return (
      <CardWithNoFooter 
      cardTitle="Confirm e-mail"
      cardDescription="Enter the confirmation code sent to your email">
        <form onSubmit={confirmSubmit(confirmEmail)} className="flex flex-col space-y-1.5">
          <Input  id={'confirmEmail'} type={'text'} {...confirmationCodeRegister('confirmationCode')} name={'confirmationCode'}/>
          <div className="min-h-40">
          {signupCodeStatus==='in progress' && <LinearProgress/> }
          </div>
          <Button type='submit'>Confirm</Button>
        </form>
      </CardWithNoFooter> 
    )
  }


  return (
    <AuthCard 
    loading={signUpLoading}
    cardTitle="Create an account"
    cardDescription="Enter your email and password to create an account"
    onSubmit={_triggerSubmit}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormElements
        errors={errors}
        formMembers={[
          {id:"userName",label:"Username",type:"text",register,name:"userName"},
          {id:"email",label:"Email",type:"email",register,name:"email"},
          {id:"password",label:"Password",type:"password",register,name:"password"},
          {id:"confirmPassword",label:"Confirm Password",type:"password",register, name:"confirmPassword"}
      ]}/>
        <input type="submit" value="Submit" style={{ display: 'none' }} ref={submitRef} />
      </form>
    </AuthCard>
  )


}


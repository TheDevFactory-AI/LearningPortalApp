import { rootRoute } from "@/App"
import { Route } from "@tanstack/react-router"
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import * as z from 'zod';
import { SignupSchema } from "@/utils/FormUtils/FormSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { signUp, confirmSignUp } from '../../utils/AuthUtils/Signup';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardWithNoFooter } from "@/components/ui/CardWithNoFooter";
import { AuthCard } from '@/components/Auth/AuthCard';
import FormElements from "@/components/ui/FormElements";
//import { CognitoUser } from 'amazon-cognito-identity-js';



const SignUp = () => {
  const [succsessfulSignup, setSuccsessfulSignup] = useState<string | null>(null);
  const { register, handleSubmit, formState: {errors} } = useForm<z.infer<typeof SignupSchema>>({
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
   try{
    const {message,status} =await signUp({
      name:data.userName,
      email:data.email,
      password:data.password,
      phone_number:'+254712345678',
     })
     if (status === 'success'){
       setSuccsessfulSignup(data.userName);
       console.log(message);
     }
     
   }catch(e){
      console.log(e);
      return
   }
  };

  const confirmEmail = async (data:any) => {
    try{
      const signUpConfirmation=await confirmSignUp({
          code:data.confirmationCode,
          userName:succsessfulSignup as string
        })
      console.log(signUpConfirmation);
    }catch(e){
      console.log(e);
      return
    }
    

  }

  if(succsessfulSignup){
    return (
      <CardWithNoFooter 
      cardTitle="Confirm e-mail"
      cardDescription="Enter the confirmation code sent to your email">
        <form onSubmit={confirmSubmit(confirmEmail)} className="flex flex-col space-y-1.5">
          <Input  id={'confirmEmail'} type={'text'} {...confirmationCodeRegister('confirmationCode')} name={'confirmationCode'}/>
          <Button type='submit' >Confirm</Button>
        </form>
      </CardWithNoFooter> 
    )
  }


  return (
    <AuthCard 
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

const SignupRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/signup",
    component: SignUp,
})

export default SignupRoute;

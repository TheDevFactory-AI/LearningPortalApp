import { rootRoute } from "@/App"
import { AuthCard } from "@/components/Auth/AuthCard"
import FormElements from "@/components/ui/FormElements";
import { Route } from "@tanstack/react-router"
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import * as z from 'zod';
import { SignupSchema } from "@/utils/FormUtils/FormSchema";
import { zodResolver } from '@hookform/resolvers/zod';

const SignUp = () => {
  /**
    // 1. Define your form.
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })
   */
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

  const onSubmit = (data:any) => {
    console.log(data);

  };
  

  return (
    <AuthCard 
    cardTitle="Create an account"
    cardDescription="Enter your email and password to create an account"
    onSubmit={_triggerSubmit}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormElements
        errors={errors}
        formMembers={[
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

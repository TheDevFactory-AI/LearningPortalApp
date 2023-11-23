import { rootRoute } from "@/App"
import { AuthCard } from "@/components/Auth/AuthCard"
import FormElements from "@/components/ui/FormElements";
import { Route } from "@tanstack/react-router"
import { useForm } from 'react-hook-form';
import { useRef } from 'react';

const SignUp = () => {
  const {register, handleSubmit}=useForm()
  const onSubmit = (data:any) => {
    console.log(data)
  };
  const submitRef = useRef(null) as any
  const triggerSubmit = () => {
    submitRef?.current?.click(); // Programmatically click the hidden submit button
  };
  return (
    <AuthCard 
    cardTitle="Create an account"
    cardDescription="Enter your email and password to create an account"
    onSubmit={triggerSubmit}>
      <form onSubmit={handleSubmit(onSubmit)}>
          <FormElements
          formMembers={[
            {id:"email",label:"Email",type:"email",register},
            {id:"password",label:"Password",type:"password",register},
            {id:"confirmPassword",label:"Confirm Password",type:"password",register}
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

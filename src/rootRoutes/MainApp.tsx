import { rootRoute } from "@/App"
import LinksContainer from "@/components/Navigation/LinkContainer"
import ProjectSearchBar from "@/components/Navigation/ProjectSelect"
import SideBar from "@/components/Navigation/SideBar"
import PressableButton from "@/components/ui/pressableButton"
import { AuthenticateUserResp } from "@/pages/Authentication/AuthUtils/Login"
import { Outlet, Route, redirect, useNavigate } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import Header from "@/components/ui/Header"

export const MainApp =  () => {
  const navigate=useNavigate({from:'/'})
  const queryClient=useQueryClient()
  const logOut=async ()=>{
    queryClient.setQueryData(['Auth'],null)
    setTimeout(()=>{
      navigate({to:'/auth'})
    },1000)
  }
  return (
    <>
    <SideBar>
      <div className="mb-5 ml-2">
        <Header>THE DEV</Header>
      </div>
      <div className="basis-10/12">
        <LinksContainer 
        links={[
          {to:"/overview",title:"Overview"},
          {to:"/chat", title:"Chat with client"}
        ]}/>
        <div className="pb-4">
          <ProjectSearchBar/>
        </div>
      </div>
      <div className="basis-1/6">
        {/* <LinksContainer
        links={[{to:"/about",title:"About"}]}/> */}
        <PressableButton onPress={logOut}>Log out</PressableButton>
      </div>
    </SideBar>
    <div className="sm:ml-64">
        <Outlet />
    </div>
    </>
  )
    }
    

export const MainAppRoute=new Route({
    component:MainApp,
    getParentRoute:()=> rootRoute,
    path:'/',
    beforeLoad:({context:{queryClient}})=>{
      const resp=queryClient.getQueryData(['Auth']) as AuthenticateUserResp | undefined
      if(!resp){
        throw redirect({
          to:'/auth',
          replace:true
        })
      }
      /* redirect({
        to:'/overview',
        replace: true
      }) */
      return {
        auth:resp //making auth payload available accross all child pages
      }
      },
      /*
      load:()=>{
        console.log('loading time !!! @/') 
      }
      */
      
})



import { rootRoute } from "@/App"
import LinksContainer from "@/components/Navigation/LinkContainer"
import ComboboxDemo from "@/components/Navigation/ProjectSelect"
import SideBar from "@/components/Navigation/SideBar"
import PressableButton from "@/components/ui/pressableButton"
import { AuthenticateUserResp } from "@/pages/Authentication/AuthUtils/Login"
import { Outlet,Link, Route, redirect, useNavigate } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import Title from "@/components/ui/Title"
import Header from "@/components/ui/Header"

export const MainApp =  () => {
  const navigate=useNavigate({from:'/'})
  const queryClient=useQueryClient()
  const logOut=async ()=>{
    queryClient.setQueryData(['Auth'],null)
    setTimeout(()=>{
      navigate({to:'/Auth'})
    },1000)
  }
  //for lougout, clear queryData
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
          {to:"/home", title:"Go home"},
          {to:"/chat", title:"Chat with client"}
        ]}/>
        <div className="pb-4">
          <ComboboxDemo/>
        </div>
        <div className="w-[200px] pl-4 border-none rounded hover:bg-blue-400">
        <Link 
          to={'course/$courseId'}
          params={{courseId:1}}
          className="[&.active]:font-bold text-white">
          {'Course Details'}
        </Link>
        </div>
      </div>
      <div className="basis-1/6">
        <LinksContainer
        links={[{to:"/about",title:"About"}]}/>
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
          to:'/Auth',
          replace:true
        })
      }
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



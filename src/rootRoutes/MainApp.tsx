import { rootRoute } from "@/App"
import LinksContainer from "@/components/Navigation/LinkContainer"
import ComboboxDemo from "@/components/Navigation/ProjectSelect"
import SideBar from "@/components/Navigation/SideBar"
import PressableButton from "@/components/ui/pressableButton"
import { AuthenticateUserResp } from "@/pages/Authentication/AuthUtils/Login"
import { Outlet,Link, Route, redirect } from "@tanstack/react-router"


export const MainApp =  () => {
        return (
          <>
          <SideBar>
            <div className="basis-10/12">
              <LinksContainer 
              links={[
                {to:"/overview",title:"Overview"},
                {to:"/home", title:"Go home"}
              ]}/>
              <div className="pb-4">
                <ComboboxDemo/>
              </div>
              <div className="pb-4">
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
              <PressableButton onPress={()=>{}}>Log out</PressableButton>
            </div>
          </SideBar>
          <div className="p-8 sm:ml-64">
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
      console.log('before loading time !!! @/') 
      return {
        auth:resp //making auth payload available accross all child pages
      }
      },
      load:()=>{
        console.log('loading time !!! @/') 
      }
})



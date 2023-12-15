import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

type TabsProps = {
    tabsTitle:string,
    Component:React.ReactNode,
}

type TabsWrapperProps={
    tabsComponents:TabsProps[],
    defaultValue:string,
    disabled:boolean
}

const TabsWrapper = ({tabsComponents,defaultValue,disabled}:TabsWrapperProps) => {
    return (
        <Tabs defaultValue={defaultValue} className="w-[350px]">
          <TabsList className={'flex w-full flex-wrap'}>
            {tabsComponents.map((tab,index)=>{
              const {tabsTitle}=tab;
              return(
                <TabsTrigger className="flex-grow" disabled={disabled} key={index} value={tabsTitle}>
                  {tabsTitle}
                </TabsTrigger>
              )
            })}
          </TabsList>
            {tabsComponents.map((tab,index)=>{
                const {Component,tabsTitle}=tab;
                return(
                <TabsContent key={index} value={tabsTitle}>
                    {Component}
                </TabsContent>
                )
            })}
        </Tabs>
      )
    }


export default TabsWrapper
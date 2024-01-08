import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useNavigate } from "@tanstack/react-router"
import { useGetProjects } from '../../../openapi/api/endpoints/default/default';
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"


//refactor this component to take in an array of projects
const ComboboxDemo=()=>{
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const navigate=useNavigate({from:'/Auth'})
  const {data}=useGetProjects()

  const handleSelect=(currentValue:string)=>{
    //currentValue is the project Name but all in lowercase.
    const lowerCaseProjectNames=data?.projects.map((project)=>{
      return {
        ...project,
        projectName:project.projectName.toLowerCase()
      }
    })
    const projectId=lowerCaseProjectNames?.find((project)=>project.projectName===currentValue)?.projectID??''
    setValue(projectId === value ? "" : projectId)
    setOpen(false)
    //imperatively call the router to navigate to the project
    console.log('navigating to project...',projectId)
    navigate({
      to:'/course/$courseId',
      params:{courseId:projectId}
    })
  }


 
  return (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between text-white"
            >
              {value
                ? data?.projects.find((proj) => proj.projectID === value)?.projectName
                : "Select framework..."}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0 bg-white">
            <Command>
              <CommandInput placeholder="Search framework..." className="h-9" />
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {data?.projects.map((proj) => (
                  <CommandItem
                    key={proj.projectID}
                    value={proj.projectName}
                    onSelect={handleSelect}
                  >
                    {proj.projectName}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        value === proj.projectID ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      )
    }

export default ComboboxDemo
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
 
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


//refactor this component to take in an array of projects
const ComboboxDemo=()=>{
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const navigate=useNavigate({from:'/Auth'})
  const {data}=useGetProjects()

  const handleSelect=(currentValue:string)=>{
    setValue(currentValue === value ? "" : currentValue)
    setOpen(false)
    //imperatively call the router to navigate to the project
    console.log('navigating to project...',currentValue)
    navigate({
      to:'/course/$courseId',
      params:{courseId:currentValue}
    })
  }


 
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] text-base justify-between text-white"
        >
          {value
            ? data?.projects.find((project) => project.projectID === value)?.projectName
            : "Browse projects..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-white">
        <Command>
          <CommandInput placeholder="Search Projects..." />
          <CommandEmpty>No Project found.</CommandEmpty>
          <CommandGroup>
            {data?.projects.map((project) => (
              <CommandItem
                key={project.projectID}
                value={project.projectID}
                onSelect={handleSelect}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === project.projectID ? "opacity-100" : "opacity-0"
                  )}
                />
                {project.projectName}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default ComboboxDemo
import { Route } from "@tanstack/react-router"
import { rootRoute } from "../../App"

import { Button } from "@/components/ui/button"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
            <Button asChild>
            <button onClick={()=>{console.log('pressed')}}>
              Hover me!
            </button> 
            </Button>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It&apos;s animated by default, but you can disable it if you
          prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}



const Overview=()=>{
  return (
    <div>
      Overiew is HEA
    <AccordionDemo /> 
    </div>


  )
}

const OverViewRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/overview",
    component: Overview,
    })
export default OverViewRoute;
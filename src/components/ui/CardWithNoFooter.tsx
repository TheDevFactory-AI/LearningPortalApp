import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


export type CardWithNoFooterProps = {
  children: React.ReactNode,
  cardTitle: string,
  cardDescription: string
}
export function CardWithNoFooter({
  children,
  cardTitle,
  cardDescription}:CardWithNoFooterProps) {


  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle> 
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}
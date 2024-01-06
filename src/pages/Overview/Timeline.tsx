import { Title } from '@/components/ui/Title';
import { Card, CardTitle, CardContent } from '@/components/ui/card';

type projectsProp = {
    projectName: string,
    date: string,
    isComplete: boolean
}

const Timeline=({projects}:{projects: projectsProp[]})=>{
  return (
    <>
        <Card className="flex flex-col basis-1/2 m-4 p-4 bg-white border-none">
            <CardTitle className="flex justify-center items-center text-white">
                <Title>Timeline</Title>
            </CardTitle>
            <CardContent className="h-[290px] flex-auto flex-col px-2 py-4 bg-white overflow-auto">
                {   projects.map((project: projectsProp)=>
                        <Card className="flex-1 bg-gray-200 border-none mb-4">
                            <CardContent className="p-2">
                                <div className="flex h-auto p-2">
                                    {project.isComplete ? 
                                        <div className="bg-green-400 w-[4px]"></div> : <div className="bg-red-400 w-[4px]"></div>
                                    }
                                    <div>
                                        <div className="pl-[20px] font-bold text-black">{project.projectName}</div>
                                        <div className="pl-[20px] text-sm text-black">{project.date}</div>
                                    </div> 
                                </div>
                            </CardContent>
                        </Card>)
                } 
            </CardContent>
        </Card>
    </>
  );
}

export default Timeline;
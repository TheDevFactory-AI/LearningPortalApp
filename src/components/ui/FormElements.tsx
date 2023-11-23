import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { UseFormRegister } from 'react-hook-form';

type FormElementProps={
    id:string,
    label:string,
    type:React.HTMLInputTypeAttribute,
    register:UseFormRegister<any>
}

type FormProps={
    formMembers:FormElementProps[],

}

const FormElements = ({formMembers}:FormProps) => {
    return(
        <div className="grid w-full items-center gap-4">
                {formMembers.map((formMember,index)=>{
                    const {id,label,type,register}=formMember;
                    return (
                        <div className="flex flex-col space-y-1.5" key={index}>
                        <Label htmlFor={`${id}`}>{label}</Label>
                        <Input id={`${id}`} type={`${type}`} {...register(`${label}`)}/>
                        </div>
                    )
                })}
        </div>

        
 
    )
    
}

export default FormElements
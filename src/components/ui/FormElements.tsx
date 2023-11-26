import { Input } from '@/components/ui/input';
import { UseFormRegister } from 'react-hook-form';
import { Label } from './label';

type FormElementProps={
    id:string,
    label:string,
    type:React.HTMLInputTypeAttribute,
    register:UseFormRegister<any>,
    name:string
}

type FormProps={
    formMembers:FormElementProps[],
    errors:any
}

const FormElements = ({formMembers,errors}:FormProps) => {
    return(
        <div className="grid w-full items-center gap-4">
            {formMembers.map((formMember,index)=>{
                const {id,label,type,register,name}=formMember;
                return (
                <>
                    <div className="flex flex-col space-y-1.5" key={index}>
                        <Label htmlFor={`${id}`}>{label}</Label>
                        <Input id={`${id}`} type={`${type}`} {...register(`${name}`)} name={name}/>
                        {errors[name] && errors[name].message && <p className="text-red-500 text-sm">{errors[name].message}</p>}
                    </div>
                </>
        )})}
        </div>)
    }                         

export default FormElements
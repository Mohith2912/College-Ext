'use client';
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
export function MutationForm({children,action,entityId,label='Save draft',className='admin-form',navigate=false}:{children?:React.ReactNode;action:string;entityId?:string;label?:string;className?:string;navigate?:boolean}){
  const [pending,setPending]=useState(false);const[message,setMessage]=useState('');const[failed,setFailed]=useState(false);const router=useRouter();
  async function submit(event:FormEvent<HTMLFormElement>){event.preventDefault();setPending(true);setMessage('');setFailed(false);const form=event.currentTarget;const fields=Object.fromEntries(new FormData(form));
    try{const response=await fetch('/api/curriculum',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...fields,action,entityId})});const result=await response.json();if(!response.ok){throw new Error(result.error?.message??'Unable to save. Please try again.')}setMessage(result.data.message);if(navigate&&result.data.courseId)router.push(`/curriculum/${result.data.courseId}`);else router.refresh();}
    catch(error){setFailed(true);setMessage(error instanceof Error?error.message:'Unable to reach the server. Try again.')}finally{setPending(false)}
  }
  return <form onSubmit={submit} className={className}>{children}<div className="admin-actions"><button type="submit" className="admin-button" disabled={pending}>{pending?'Saving…':label}</button></div>{message&&<p role={failed?'alert':'status'} className={failed?'admin-error':'admin-success'}>{message}</p>}</form>
}

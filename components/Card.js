import React, { useState } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from 'next/router';

const Card = ({ id, title, content }) => {
 
  let s=content 
  if(s.length<=60){
    s=s+"...Read more"
  }
  else{
    s=s.slice(0,60)+"...Read more"
  }
  // console.log(s)
  let router=useRouter()

  let t=title.slice(0,30)

  const del=async()=>{
       let res=await fetch(`http://localhost:3000/api/posts/${id}`,{
        method:'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
       });
       let result=await res.json();
       if(result.message==='deleted'){
             router.push('/')
       }
      
  }
  return (
   
  
    <div className="flex-grow border rounded-lg items-center text-center p-5 hover:shadow-lg">
      <Link href={`/view_page/${id}`}>
          <h2 className=" mt-2 text-gray-900  title-font font-medium mb-3 text-3xl break-words">{t}</h2>
      </Link>
      <Link href={`/view_page/${id}`}>  <p className="leading-relaxed text-base break-words">{s}</p></Link>
          <div className="m-3 text-indigo-500 flex items-center justify-between ">
            <Link href={`/edit/${id}`}>
            <Button>Edit</Button>
            </Link>
           
            <Dialog>
  <DialogTrigger> <Button variant={'destructive'} >Delete</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>

       <p> This will permanently delete your This Blog</p>
       <div className='flex justify-between'>
        <div></div>
       <Button variant={'destructive'} onClick={del}>Confirm</Button>
       </div>
        
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

            
          </div>
        </div>
      
  );
};

export default Card;


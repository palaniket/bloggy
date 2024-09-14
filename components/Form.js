import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
const Form = () => {
    const [title,setTitle]=useState('')
    const [content,setContent]=useState('')
    const handlechange=(e)=>{
        if(e.target.name==='title'){
            setTitle(e.target.value)
        }
        else{
            setContent(e.target.value)
        }
        // console.log(title)
    }
    const handleClick=()=>{
        if(title==='' || content===''){
            alert('all field are required')
            return
        }


    }
  return (
    <div>
       <form className='w-full ' onSubmit={handleClick}>
          <div className='flex flex-col gap-2' >

            <label className='text-2xl font-medium '>Title</label>
            <input type='text' onChange={handlechange} name='title' id='title' placeholder='Enter Title' className='rounded-lg p-2 border w-full' />
          </ div>

          <div className='flex flex-col gap-2 mt-4 mb-4'>

            <label className='text-2xl font-medium '>Content</label>
            <textarea type='text' placeholder='Enter Title' onChange={handlechange} name='content' id='content' className='rounded-lg p-2 border w-full' />
          </ div>

          <Button type={submit}>Create</Button>

        </form>
    </div>
  )
}

export default Form

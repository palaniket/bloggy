import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

const CreateBlog = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    } else {
      setContent(e.target.value);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (title === '' || content === '') {
      alert('All fields are required');
      return;
    }

    const data = { title, content };

    try {
      const result = await fetch(`http://localhost:3000/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!result.ok) {
        console.error(`Failed to fetch post: ${result.statusText}`);
        alert('Failed to create the blog post. Please try again.');
        return;
      }

      const post = await result.json();

      if (post.success) {
        router.push('/');
      } else {
        alert('Failed to create the blog post. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className='pt-16'>
      <div className='text-center'>
        <h1 className='text-3xl text-black font-bold'>Create New Blog</h1>
      </div>
      <div className='flex items-center justify-center mt-10 w-full'>
        <div className='w-1/3'>
          <div className='flex flex-col gap-2'>
            <label className='text-2xl font-medium'>Title</label>
            <input
              type='text'
              onChange={handleChange}
              name='title'
              id='title'
              placeholder='Enter Title'
              className='rounded-lg p-2 border w-full'
            />
          </div>

          <div className='flex flex-col gap-2 mt-4 mb-4'>
            <label className='text-2xl font-medium'>Content</label>
            <textarea
              placeholder='Enter Content'
              onChange={handleChange}
              name='content'
              id='content'
              className='rounded-lg p-2 border w-full'
            />
          </div>

          <Button onClick={handleClick}>Create</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;

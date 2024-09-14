import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/router';

const POST = ({ post, id }) => {
  const router = useRouter();
  const [title, setTitle] = useState(post.title ); // Initialize with post title
  const [content, setContent] = useState(post.content); // Initialize with post content

  const handleChange = (e) => {
    if (e.target.name === 'title') {
      setTitle(e.target.value);
    } else {
      setContent(e.target.value);
    }
  };
  console.log(process.env.NEXT_PUBLIC_URI)
  const handleClick = async (e) => {
    e.preventDefault();

    if (title === '' || content === '') {
      alert('All fields are required');
      return;
    }

    
    else{
      const data = { title, content };
      const result = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/posts/${id}`, {
        method: 'PUT', // PUT request to update the post
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // Check if the response is ok (status code 200-299)
      if (!result.ok) {
        // console.error(`Failed to update post: ${result.statusText}`);
        alert('Failed to update post. Please try again.');
        return;
      }

      const postUpdate = await result.json();

      if (postUpdate.message==='updated') {
        router.push('/'); // Redirect to the home page after success
      } else {
        alert('Failed to update post.');
      }
    } 
  }

  return (
    <div className="pt-16">
      <div className="text-center">
        <h1 className="text-3xl text-black font-bold">Edit Blog</h1>
      </div>
      <div className="flex items-center justify-center mt-10 w-full">
        <div className="w-1/3">
          <div className="flex flex-col gap-2">
            <label className="text-2xl font-medium">Title</label>
            <input
              type="text"
              onChange={handleChange}
              name="title"
              id="title"
              placeholder="Enter Title"
              className="rounded-lg p-2 border w-full"
              value={title} // Use the state variable
            />
          </div>

          <div className="flex flex-col gap-2 mt-4 mb-4">
            <label className="text-2xl font-medium">Content</label>
            <textarea
              type="text"
              placeholder="Enter Content"
              onChange={handleChange}
              name="content"
              id="content"
              className="rounded-lg p-2 border w-full"
              value={content} // Use the state variable
            />
          </div>

          <Button onClick={handleClick}>Update Blog</Button>
        </div>
      </div>
    </div>
  );
};

export default POST;

// Server-side function to fetch post data
export async function getServerSideProps(context) {
  const { id } = context.query;

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/posts/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return { notFound: true };
    }

    const post = await response.json();

    return {
      props: { post, id },
    };
  } catch (error) {
    // console.error(`Error fetching post: ${error.message}`);
    return {
      notFound: true,
    };
  }
}

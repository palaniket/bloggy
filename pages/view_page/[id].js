import React from 'react'

const POST = ({ post }) => {
  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="m-2 pt-16 flex justify-center items-center ">
      <div className=" w-1/2  p-4 text-center">
        <h1 className="text-3xl font-bold break-words">{post.title}</h1>
        <p className="mt-10 text-gray-500 break-words">{post.content}</p>
      </div>
    </div>
  );
};

// Fetch the post data from the API
export async function getServerSideProps(context) {
  const { id } = context.query; // Extract the id from query parameters
  // console.log(`Fetching post with id: ${id}`);

  try {
    const response = await fetch(`http://localhost:3000/api/posts/${id}`, {
      method: 'GET', // GET request to fetch data
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      // console.error(`Failed to fetch post: ${response.statusText}`);
      return {
        notFound: true, // Return a 404 page if the post is not found
      };
    }

    const post = await response.json();
    // console.log(post);

    return {
      props: { post },
    };
  } catch (error) {
    // console.error(`Error fetching post: ${error.message}`);
    return {
      notFound: true, // Return a 404 page in case of errors
    };
  }
}

export default POST;

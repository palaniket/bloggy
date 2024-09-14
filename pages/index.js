
import localFont from "next/font/local";


import Card from "../components/Card";



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home({post}) {
  // console.log(post)
  return (
    <>
    <div className="">
    
    

   
<section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {post.map((item) => (
            <div className="p-4 lg:w-1/3 w-full" key={item.id}>
              {/* <Link href={`/view_page/${item.id}`} passHref legacyBehavior> */}
                <a className=" w-full h-full">
                  <Card id={item.id} title={item.title} content={item.content} />
                </a>
              {/* </Link> */}
            </div>
          ))}
        </div>
      </div>
    </section>



     
    </div>
    
    </>
  );
}




export async function getServerSideProps() {
  let res = await fetch("http://localhost:3000/api/posts", {
    method: 'GET',  
    headers: {
      'Content-Type': 'application/json',

    },
   


  })
  let post = await res.json()
  // console.log(post)
  return {
    props:{
      post
    }
  };
}


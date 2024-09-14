import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

const Header = () => {
  return (
    <div className="colr bg-opacity-80 w-full ">
      <div className="colr flex justify-between items-center text-center p-3 border-b-2 w-full fixed">
        <h1 className="font-mono text-3xl text-black">Bloggy</h1>
        <Link href={'/create_blog'}>
        <Button>+Add new Blog</Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;

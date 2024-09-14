import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from 'next/router';

const Card = ({ id, title, content }) => {
  const [isMounted, setIsMounted] = useState(false); // To prevent hydration error
  const [trimmedContent, setTrimmedContent] = useState('');
  const [trimmedTitle, setTrimmedTitle] = useState('');
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);

    // Trim content and title after the component has mounted
    let s = content;
    let t = title.slice(0, 30);

    if (s.length <= 60) {
      s = s + "...Read more";
    } else {
      s = s.slice(0, 60) + "...Read more";
    }

    setTrimmedContent(s);
    setTrimmedTitle(t);
  }, [content, title]);

  const del = async () => {
    let res = await fetch(`${process.env.NEXT_PUBLIC_URI}/api/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    let result = await res.json();
    if (result.message === 'deleted') {
      router.push('/');
    }
  };

  // Only render interactive parts after the component has mounted
  if (!isMounted) {
    return null; // Or return a skeleton/placeholder
  }

  return (
    <div className="flex-grow border rounded-lg items-center text-center p-5 hover:shadow-lg">
      <Link href={`/view_page/${id}`}>
        <h2 className="mt-2 text-gray-900 title-font font-medium mb-3 text-3xl break-words">
          {trimmedTitle}
        </h2>
      </Link>
      <Link href={`/view_page/${id}`}>
        <p className="leading-relaxed text-base break-words">{trimmedContent}</p>
      </Link>
      <div className="m-3 text-indigo-500 flex items-center justify-between">
        <Link href={`/edit/${id}`}>
          <Button>Edit</Button>
        </Link>

        <Dialog>
          <DialogTrigger>
            <Button variant={'destructive'}>Delete</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                <p>This will permanently delete your blog.</p>
                <div className="flex justify-between">
                  <div></div>
                  <Button variant={'destructive'} onClick={del}>
                    Confirm
                  </Button>
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

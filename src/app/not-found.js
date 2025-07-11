// app/not-found.js

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { illustration } from '../components/element/images';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        <div className='w-full  lg:w-[50%] mt-8'>
            <Image src={illustration.pagenotfound}
                alt='not found'
                width={"100%"}
                height={"100%"}
                className='w-full h-auto'
        />
        </div>
      <p className="mb-6 text-gray-600">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link href="/" className="text-[var(--lightBlue)] hover:underline">
        Go back home
      </Link>
    </div>
  );
}

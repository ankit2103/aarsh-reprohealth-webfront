'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

const MyLottie = dynamic(() => import('../../components/element/my-lottie'), {
  ssr: false, // 👈 Important!
});

const ThanksForBooking = () => {
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <div className='w-full flex flex-col justify-center items-center h-[100vh]'>
      <div className='mt-14'>
        <MyLottie style={{ width: 300, height: 300 }} />
      </div>
      <div className='text-center flex flex-col items-center py-2'>
        <h2 className='text-2xl capitalize py-4'>Appointment Booked Successfully!</h2>
        <p className='text-[var(--greyP)]'>Thank you for booking with us!</p>
        <p className='text-[var(--greyP)]'>Stay tuned for updates and be sure to arrive on time</p>
      </div>
      <div className='flex gap-2 py-4'>
        <button
          className='text-[var(--lightBlue)] rounded-full border-2 border-[var(--lightBlue)] px-4 py-2 hover:bg-[var(--lightBlue)] hover:text-[var(--White)]'
          onClick={() => handleNavigate(`/`)}
        >
          Go To Home
        </button>
        <button
          className='bg-[var(--lightBlue)] text-[var(--White)] rounded-full border-2 border-[var(--lightBlue)] px-4 py-2 hover:bg-[var(--lightBlue)] hover:text-[var(--White)]'
          onClick={() => handleNavigate(`/profile/my-booked-appointments`)}
        >
          View Appointment Details
        </button>
      </div>
    </div>
  );
};

export default ThanksForBooking;

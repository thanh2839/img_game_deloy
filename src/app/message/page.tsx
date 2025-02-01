// src/app/message/page.tsx
'use client'
import { FormEvent, useState } from 'react';
import { Dancing_Script } from 'next/font/google';
import { db } from '@/firebase.config';
import { ref, set } from 'firebase/database';
import { useRouter } from 'next/navigation';

const dancingScript = Dancing_Script({ 
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function MessagePage() {
  const [message, setMessage] = useState('');
  const router = useRouter();

  const sendDataUser = async () => {
    try {
      const dbRef = ref(db, 'dataUser');
      await set(dbRef, {
        name: localStorage.getItem('ten'),
        sdt: localStorage.getItem('sdt'),
        img: localStorage.getItem('uploadedImageUrl'),
        message: message,
        timestamp: new Date().toISOString(),
      });
      console.log('Data sent to Realtime Database successfully!');
      return true;
    } catch (e) {
      console.error('Error sending data: ', e);
      return false;
    }
  };

  const handleNext = () => {
    try {
      router.push('/result');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!message.trim()) return;

    try {
      const success = await sendDataUser();
      if (success) {
        setMessage('');
        handleNext();
      }
    } catch (error) {
      console.error('Error in form submission:', error);
    } 
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-5 bg-gradient-to-br from-yellow-400 to-orange-400">
      <div className="w-full max-w-md aspect-[1/1.4] relative rounded-xl overflow-hidden shadow-lg">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/images/bg.png"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 h-[85%] flex flex-col justify-center p-5 space-y-5">
          <form 
            onSubmit={handleSubmit}
            className={`w-3/4 mx-auto mt-24 ${dancingScript.className}`}
          >
            <h2 className="text-center text-yellow-400 text-xl font-bold mb-2 
              animate-[glow_1.5s_ease-in-out_infinite] 
              drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              Hãy chia sẻ những lời chúc của bạn ở đây nhé ^^
            </h2>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full h-28 bg-transparent border-none text-lg
                leading-relaxed resize-none text-[#eecf79]
                bg-[linear-gradient(transparent_calc(1.5em-1px),#91d1d3_calc(1.5em-1px))]
                bg-[length:100%_1.5em] p-0 focus:outline-none"
              required
            />

            <button
              type="submit"
              className="block mx-auto mt-3 px-5 py-2 bg-yellow-400 
                rounded-full text-red-900 text-base cursor-pointer
                transition-all duration-300 hover:bg-[#FFC600] 
                hover:scale-105"
            >
              Gửi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
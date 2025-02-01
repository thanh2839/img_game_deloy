'use client';

import React, { useEffect, useState } from 'react';
import './styles.css'
import { Dancing_Script, Playfair_Display } from 'next/font/google';
import { getRandomWish } from './randomWish';
const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
});

type UserData = {
  name: string;
  avatarUrl: string;
};

const Result = () => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    avatarUrl: ''
  });
  const [randomWish, setRandomWish] = useState<string>("")

  useEffect(() => {
    // Retrieve data from localStorage when component mounts
    const savedName = localStorage.getItem('ten') || '';
    const savedAvatar = localStorage.getItem('uploadedImageUrl') || '';
    setRandomWish(getRandomWish());

    setUserData({
      name: savedName,
      avatarUrl: savedAvatar
    });
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="max-w-2xl rounded-lg bg-white p-6 shadow-xl">
        {/* Header with museum logo */}
        <div className="mb-6 flex items-center gap-4">
          <div className="h-16 w-16">
            <img
              src="/images/anhlogo.png"
              alt="Logo bảo tàng"
              className="h-full w-full object-contain"
            />
          </div>
          <h1 className="text-xl font-bold text-gray-800">
            Bảo tàng Dân tộc học Việt Nam
          </h1>
        </div>

        {/* New Year Greeting */}
        <div className="my-6 text-center text-2xl font-bold text-red-600">
          🎊 Chúc Mừng Năm Mới 2025! 🎊
        </div>

        {/* Main content with name and avatar */}
        <div className="mb-8 text-center">
          <p className="text-lg leading-relaxed text-gray-800">
            Nhân dịp năm mới Quý Tỵ, Bảo tàng Dân tộc học xin gửi tới
          </p>

          {/* Name and Avatar container */}
          <div className="my-4 flex items-center justify-center gap-4">
            <div className="h-16 w-16">
              {userData.avatarUrl ? (
                <img
                  src={userData.avatarUrl}
                  alt="Avatar người chơi"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-sm text-gray-500">
                  Không có avatar
                </div>
              )}
            </div>
            <strong className={`text-4xl font-bold ${dancingScript.className} text-red-800`}>
              {userData.name}
            </strong>

          </div>

          <p className="mt-4 text-lg leading-relaxed text-gray-800">
            và gia đình lời chúc mừng năm mới an khang, thịnh vượng và tràn đầy niềm vui.
          </p>
        </div>
        <div className="mt-8 relative">
          <div className="relative w-full">
            <img
              src="/images/anhlien.png"
              alt="Tết 2025"
              className="max-h-64 w-full rounded-lg object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p style={{
                color: '#FFD700',
                transform: 'translateY(-6px)'
              }} className="text-3xl font-bold font-utmarid drop-shadow-lg px-4 text-center">
                {randomWish}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;

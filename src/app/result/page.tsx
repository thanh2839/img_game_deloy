'use client';

import React, { useEffect, useState } from 'react';

type UserData = {
  name: string;
  avatarUrl: string;
};

const Result = () => {
  const [userData, setUserData] = useState<UserData>({
    name: '',
    avatarUrl: ''
  });

  useEffect(() => {
    // Retrieve data from localStorage when component mounts
    const savedName = localStorage.getItem('name') || '';
    const savedAvatar = localStorage.getItem('uploadedImageUrl') || '';
    
    setUserData({
      name: savedName,
      avatarUrl: savedAvatar
    });
  }, []);

  const images = [
    { src: '/img/1.png', alt: 'Cây nêu' },
    { src: '/img/2.png', alt: 'Đèn lồng' },
    { src: '/img/3.png', alt: 'Hoa đào' },
    { src: '/img/4.png', alt: 'Lì xì' },
    { src: '/img/5.png', alt: 'Mặt nạ' },
    { src: '/img/6.png', alt: 'Hạt dưa' },
    { src: '/img/7.png', alt: 'Quýt' },
    { src: '/img/8.png', alt: 'Pháo hoa' }
  ];

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="max-w-2xl rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-center gap-4">
          <div className="h-16 w-16">
            <img
              src="/images/anhlogo.png"
              alt="Logo bảo tàng"
              className="h-full w-full object-contain"
            />
          </div>
          <h1 className="text-xl font-bold text-gray-800">
            Bảo Tàng Dân Tộc Học Việt Nam
          </h1>
        </div>

        <div className="my-6 text-center text-2xl font-bold text-red-600">
          🎊 Chúc Mừng Năm Mới 2025! 🎊
        </div>

        <div className="mb-6 text-center text-gray-700">
          <p>
            Mừng năm mới Quý Tỵ, Bảo tàng Dân tộc học xin gửi lời chúc tốt đẹp nhất đến{' '}
            <strong>{userData.name}</strong>. Mong quý khách sẽ có một năm mới thật nhiều 
            niềm vui và may mắn!
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded-lg">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover transition-transform hover:scale-110"
                />
              </div>
            ))}
          </div>

          {userData.avatarUrl && (
            <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-red-600">
              <img
                src={userData.avatarUrl}
                alt="Avatar người chơi"
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Result;
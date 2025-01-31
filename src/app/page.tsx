'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const GameRegister = () => {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    sdt: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    sdt: '',
    img: ''
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      sdt: '',
      img: ''
    };

    if (!formData.name) {
      newErrors.name = 'Tên không được để trống';
      isValid = false;
    }

    if (!formData.sdt) {
      newErrors.sdt = 'Số điện thoại không được để trống';
      isValid = false;
    } else if (!/^\d+$/.test(formData.sdt)) {
      newErrors.sdt = 'Số điện thoại không hợp lệ';
      isValid = false;
    }

    if (!imageUrl) {
      newErrors.img = 'Ảnh đại diện là bắt buộc';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    localStorage.setItem('ten', formData.name)
    console.log(localStorage.getItem('ten'))
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Data:', { ...formData, imageUrl });
      router.push('/question1');
    }
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files?.[0];
    if (!image) return;

    const imageFormData = new FormData();
    imageFormData.append('file', image);
    imageFormData.append('upload_preset', "shop_Santuary");

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dsymtu3j5/image/upload', {
        method: 'POST',
        body: imageFormData,
      });

      const data = await response.json();
      if (response.ok) {
        setImageUrl(data.secure_url);
        setPreview(data.secure_url);
        localStorage.setItem('uploadedImageUrl', data.secure_url);
        console.log('Uploaded Image URL:', data.secure_url);
      }
    } catch (err) {
      console.log('Image upload failed:', err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-yellow-400 to-orange-400 p-4">
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-xl w-full max-w-md mx-auto">
        <h1 className="text-xl sm:text-2xl text-center font-bold text-red-500 mb-4 sm:mb-6">
          🎮 Chào Mừng Bạn Đến Với Game! 🎮
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-2">
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-pink-400 flex items-center justify-center cursor-pointer overflow-hidden bg-gray-200 touch-manipulation"
              onClick={() => document.getElementById('avatar')?.click()}
            >
              {preview ? (
                <img src={preview} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl">📷</span>
              )}
            </div>
            <input
              id="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
            {errors.img && <p className="text-red-500 text-sm mt-1">{errors.img}</p>}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-gray-600 text-lg mb-1">Tên của bạn:</label>
              <input
                type="text"
                placeholder="Nhập tên của bạn"
                className="w-full p-3 text-lg border-2 border-pink-400 rounded-xl focus:border-red-500 focus:outline-none"
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                value={formData.name}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-gray-600 text-lg mb-1">Số điện thoại:</label>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="Nhập số điện thoại của bạn"
                className="w-full p-3 text-lg border-2 border-pink-400 rounded-xl focus:border-red-500 focus:outline-none"
                onChange={(e) => setFormData({ ...formData, sdt: e.target.value })}
                value={formData.sdt}
              />
              {errors.sdt && <p className="text-red-500 text-sm mt-1">{errors.sdt}</p>}
            </div>
          </div>

          <button
            type="submit"
            className="w-full p-4 bg-red-500 text-white text-xl rounded-xl hover:bg-red-600 transition active:bg-red-700 touch-manipulation"
          >
            Tiếp tục 🎯
          </button>
        </form>
      </div>
    </div>
  );
};

export default GameRegister;
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

const mockData = [
  { id: 1, src: '/images/cau2.1.JPG', alt: 'Đồ vật 1' },
  { id: 2, src: '/images/cau2.2.JPG', alt: 'Đồ vật 2' },
  { id: 3, src: '/images/cau2.3.JPG', alt: 'Đồ vật 3' },
  { id: 4, src: '/images/cau2.4.JPG', alt: 'Đồ vật 4' },
  { id: 5, src: '/images/cau2.5.JPG', alt: 'Đồ vật 5' },
  { id: 6, src: '/images/cau2.6.JPG', alt: 'Đồ vật 6' },
  { id: 7, src: '/images/cau2.7.JPG', alt: 'Đồ vật 7' },
  { id: 8, src: '/images/cau2.8.JPG', alt: 'Đồ vật 8' },
  { id: 9, src: '/images/cau2.9.JPG', alt: 'Đồ vật 9' },
];

const Question2 = () => {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  const handleSelect = (id: number) => {
    setSelectedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleImageError = (id: number) => {
    setImageError(prev => ({
      ...prev,
      [id]: true
    }));
    console.error(`Failed to load image for item ${id}`);
  };

  const handleNext = () => {
    try {
      // const selectedAnswers = Array.from(selectedItems);
      // localStorage.setItem('question2Answers', JSON.stringify(selectedAnswers));
      router.push('/question3');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-red-400 p-4 md:p-6">
      <div className="max-w-4xl mx-auto"> {/* Increased max-width for 3x3 grid */}
        <Card className="p-6 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h1 className="text-xl text-center text-gray-800">
            Bạn đã tham gia chơi những trò chơi dân gian nào trong các bức ảnh dưới đây?
            </h1>
          </div>

          <div className="text-center text-gray-600">
            Đã chọn: <span className="font-medium">{selectedItems.size}</span>
          </div>

          {/* Modified grid to always show 3 columns */}
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {mockData.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className="relative aspect-square rounded-lg overflow-hidden group focus:outline-none focus:ring-2 focus:ring-blue-500 hover:shadow-lg transition-shadow"
                aria-pressed={selectedItems.has(item.id)}
                aria-label={`Select ${item.alt}`}
              >
                <div className="relative w-full h-full">
                  {!imageError[item.id] ? (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      priority
                      className="object-cover transition-transform group-hover:scale-105"
                      sizes="(max-width: 768px) 33vw, 300px"
                      onError={() => handleImageError(item.id)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-sm text-gray-500">Image not found</span>
                    </div>
                  )}
                  {selectedItems.has(item.id) && (
                    <div className="absolute inset-0 bg-green-500/80 flex items-center justify-center">
                      <CheckCircle2 className="w-12 h-12 text-white" />
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          <Button
            onClick={handleNext}
            type="button"
            className="w-full py-4 text-lg bg-green-500 hover:bg-green-600 transition-colors"
          >
            Tiếp theo
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Question2;
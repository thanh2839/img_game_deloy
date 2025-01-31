'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

const mockData = [
  { 
    id: 1, 
    src: '/images/câu 5.1.jpg', 
    alt: 'Đồ vật 1' 
  },
  { 
    id: 2, 
    src: '/images/câu 5.2.jpg', 
    alt: 'Đồ vật 2' 
  },
  { 
    id: 3, 
    src: '/images/câu 5.3.jpg', 
    alt: 'Đồ vật 3' 
  },
  { 
    id: 4, 
    src: '/images/câu 5.4.jpg', 
    alt: 'Đồ vật 4' 
  },
  { 
    id: 5, 
    src: '/images/câu 5.5.jpg', 
    alt: 'Đồ vật 5' 
  },
  { 
    id: 6, 
    src: '/images/câu 5.6.jpg', 
    alt: 'Đồ vật 6' 
  },
];

const Question1 = () => {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
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
      // Store the selected answers
      const selectedAnswers = Array.from(selectedItems);
      localStorage.setItem('question1Answers', JSON.stringify(selectedAnswers));
      
      // Navigate to question 2
      router.push('/result');
      
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-red-400 p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <Card className="p-6 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h1 className="text-xl text-center text-gray-800">
            Bạn đã được thưởng thức những món ăn nào của người Mường trong Chương trình này?
            </h1>
          </div>

          <div className="text-center text-gray-600">
            Đã chọn: <span className="font-medium">{selectedItems.size}</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {mockData.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className="relative aspect-square rounded-lg overflow-hidden group focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
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

export default Question1;
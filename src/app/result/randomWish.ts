// types/wishes.ts
interface Wish {
    text: string;
    weight: number; // Weight determines probability (1-100)
  }
  
  // utils/wishSelector.ts
  const wishes: Wish[] = [
    { text: "Lộc", weight: 20 },
    { text: "Phúcaaaaaaaaa", weight: 15 },
    { text: "Tài", weight: 15 },
    { text: "Liêm", weight: 10 },
    { text: "Dạ Miêu", weight: 10 },
    { text: "Tâm", weight: 10 },
    { text: "Nghiêm", weight: 5 },
    { text: "Kiếm", weight: 5 },
    { text: "Vũ", weight: 5 },
    { text: "Bão", weight: 5 }
  ];
  
  const getRandomWish = (): string => {
    // Calculate total weight
    const totalWeight = wishes.reduce((sum, wish) => sum + wish.weight, 0);
    
    // Generate random number between 0 and total weight
    let random = Math.random() * totalWeight;
    
    // Find the wish based on weight
    for (const wish of wishes) {
      random -= wish.weight;
      if (random <= 0) {
        return wish.text;
      }
    }
    
    // Fallback return (should never reach here if weights sum to 100)
    return wishes[0].text;
  };
  
  // Get multiple unique wishes
  const getMultipleWishes = (count: number): string[] => {
    const selectedWishes = new Set<string>();
    const maxAttempts = count * 2; // Prevent infinite loop
    let attempts = 0;
    
    while (selectedWishes.size < count && attempts < maxAttempts) {
      selectedWishes.add(getRandomWish());
      attempts++;
    }
    
    return Array.from(selectedWishes);
  };
  
  export { getRandomWish, getMultipleWishes };
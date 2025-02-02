interface Wish {
    text: string;
    weight: number;
}

const wishes: Wish[] = [
    { text: "Lộc", weight: 20 },
    { text: "Phúc", weight: 15 },
    { text: "Tài", weight: 15 },
    { text: "Liêm", weight: 2 },
    { text: "Dạ Miêu", weight: 10 },
    { text: "Tâm", weight: 10 },
    { text: "Thọ", weight: 5 },
    { text: "An", weight: 5 },
    { text: "Nhẫn", weight: 5 },
    { text: "Thành", weight: 1 },
    { text: "Đắc", weight: 2 },
    { text: "Duyên", weight: 2 },
];

const getRandomWish = (): string => {
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
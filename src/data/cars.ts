export type CarData = {
  id: string;
  name: string;
  brand: string;
  year: number;
  image: string;
  daily: number;
  weekly: number;
  monthly: number;
  seats: number;
  doors: number;
  luggage: number;
  category: "Economy" | "Sedan" | "SUV" | "Luxury";
  transmission: string;
  fuel: string;
};

export const allCars: CarData[] = [
  { id: "chevrolet-spark-2015", name: "Chevrolet Spark 2015", brand: "Chevrolet", year: 2015, image: "https://www.caryaati.com/erps/admin/images/model/model-167-807058.webp", daily: 50, weekly: 315, monthly: 990, seats: 4, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol" },
  { id: "nissan-micra-2019", name: "Nissan Micra 2019", brand: "Nissan", year: 2019, image: "https://www.caryaati.com/erps/admin/images/model/model-369-189972.webp", daily: 60, weekly: 385, monthly: 1380, seats: 4, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol" },
  { id: "nissan-micra-2020", name: "Nissan Micra 2020", brand: "Nissan", year: 2020, image: "https://www.caryaati.com/erps/admin/images/model/model-369-189972.webp", daily: 55, weekly: 350, monthly: 1200, seats: 4, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol" },
  { id: "nissan-sunny-2019", name: "Nissan Sunny 2019", brand: "Nissan", year: 2019, image: "https://www.caryaati.com/erps/admin/images/model/model-363-459485.webp", daily: 60, weekly: 385, monthly: 1350, seats: 5, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol" },
  { id: "nissan-sunny-2020", name: "Nissan Sunny 2020", brand: "Nissan", year: 2020, image: "https://www.caryaati.com/erps/admin/images/model/model-363-459485.webp", daily: 55, weekly: 350, monthly: 1200, seats: 5, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol" },
  { id: "nissan-sunny-2022", name: "Nissan Sunny 2022", brand: "Nissan", year: 2022, image: "https://www.caryaati.com/erps/admin/images/model/model-363-459485.webp", daily: 65, weekly: 420, monthly: 1260, seats: 5, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol" },
  { id: "nissan-sunny-2023", name: "Nissan Sunny 2023", brand: "Nissan", year: 2023, image: "https://www.caryaati.com/erps/admin/images/model/model-363-459485.webp", daily: 65, weekly: 420, monthly: 1350, seats: 5, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol" },
  { id: "kia-picanto-2020", name: "Kia Picanto 2020", brand: "Kia", year: 2020, image: "https://www.caryaati.com/erps/admin/images/model/model-157-7357.webp", daily: 55, weekly: 350, monthly: 1200, seats: 4, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol" },
  { id: "kia-pegas-2022", name: "Kia Pegas 2022", brand: "Kia", year: 2022, image: "https://www.caryaati.com/erps/admin/images/model/pegas.webp?p=84", daily: 60, weekly: 385, monthly: 1350, seats: 5, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol" },
  { id: "kia-pegas-2023", name: "Kia Pegas 2023", brand: "Kia", year: 2023, image: "https://www.caryaati.com/erps/admin/images/model/pegas.webp", daily: 60, weekly: 385, monthly: 1440, seats: 5, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol" },
  { id: "kia-pegas-2024", name: "Kia Pegas 2024", brand: "Kia", year: 2024, image: "https://www.caryaati.com/erps/admin/images/model/pegas.webp", daily: 70, weekly: 420, monthly: 1470, seats: 5, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol" },
  { id: "kia-pegas-2025", name: "Kia Pegas 2025", brand: "Kia", year: 2025, image: "https://www.caryaati.com/erps/admin/images/model/pegas.webp", daily: 70, weekly: 455, monthly: 1500, seats: 5, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol" },
  { id: "kia-rio-2020", name: "Kia Rio 2020", brand: "Kia", year: 2020, image: "https://www.caryaati.com/erps/admin/images/model/rio-2020.webp", daily: 70, weekly: 420, monthly: 1410, seats: 4, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol" },
  { id: "kia-rio-2021", name: "Kia Rio 2021", brand: "Kia", year: 2021, image: "https://www.caryaati.com/erps/admin/images/model/rio-2020.webp", daily: 70, weekly: 455, monthly: 1650, seats: 4, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol" },
  { id: "hyundai-accent-2020", name: "Hyundai Accent 2020", brand: "Hyundai", year: 2020, image: "https://www.caryaati.com/erps/admin/images/model/model-362-197219.webp", daily: 60, weekly: 385, monthly: 1350, seats: 5, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol" },
  { id: "hyundai-accent-2022", name: "Hyundai Accent 2022", brand: "Hyundai", year: 2022, image: "https://www.caryaati.com/erps/admin/images/model/model_sp_576_353.webp", daily: 70, weekly: 420, monthly: 1500, seats: 5, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol" },
  { id: "mitsubishi-attrage-2022", name: "Mitsubishi Attrage 2022", brand: "Mitsubishi", year: 2022, image: "https://www.caryaati.com/erps/admin/images/model/model_sp_774_646.png", daily: 65, weekly: 420, monthly: 1410, seats: 5, doors: 4, luggage: 2, category: "Economy", transmission: "Auto", fuel: "Petrol" },
  { id: "mitsubishi-attrage-2023", name: "Mitsubishi Attrage 2023", brand: "Mitsubishi", year: 2023, image: "https://www.caryaati.com/erps/admin/images/model/model_sp_774_646.png", daily: 70, weekly: 420, monthly: 1500, seats: 5, doors: 4, luggage: 2, category: "Economy", transmission: "Auto", fuel: "Petrol" },
  { id: "geely-emgrand-2025", name: "Geely Emgrand 2025", brand: "Geely", year: 2025, image: "https://www.caryaati.com/erps/admin/images/model/model_sp_1133_312.png", daily: 80, weekly: 490, monthly: 1830, seats: 5, doors: 4, luggage: 2, category: "Economy", transmission: "Auto", fuel: "Petrol" },
  // Sedans
  { id: "hyundai-elantra-2022", name: "Hyundai Elantra 2022", brand: "Hyundai", year: 2022, image: "https://www.caryaati.com/erps/admin/images/model/model_sp_577_321.webp", daily: 90, weekly: 560, monthly: 2100, seats: 5, doors: 4, luggage: 3, category: "Sedan", transmission: "Auto", fuel: "Petrol" },
  { id: "mazda-3-2025", name: "Mazda 3 2025", brand: "Mazda", year: 2025, image: "https://www.caryaati.com/erps/admin/images/model/model_sp_1140_201.png", daily: 90, weekly: 560, monthly: 1980, seats: 5, doors: 4, luggage: 3, category: "Sedan", transmission: "Auto", fuel: "Petrol" },
  { id: "kia-k5-2021", name: "Kia K5 2021", brand: "Kia", year: 2021, image: "https://www.caryaati.com/erps/admin/images/model/model_sp_470_166.webp", daily: 100, weekly: 630, monthly: 2250, seats: 4, doors: 5, luggage: 3, category: "Sedan", transmission: "Auto", fuel: "Petrol" },
  { id: "kia-k5-2023", name: "Kia K5 2023", brand: "Kia", year: 2023, image: "https://www.caryaati.com/erps/admin/images/model/model_sp_765_766.png", daily: 110, weekly: 700, monthly: 2400, seats: 4, doors: 5, luggage: 3, category: "Sedan", transmission: "Auto", fuel: "Petrol" },
  { id: "mazda-6-2023", name: "Mazda 6 2023", brand: "Mazda", year: 2023, image: "https://www.caryaati.com/erps/admin/images/model/model_sp_472_544.webp", daily: 100, weekly: 630, monthly: 2400, seats: 5, doors: 4, luggage: 3, category: "Sedan", transmission: "Auto", fuel: "Petrol" },
  { id: "infiniti-q50-2023", name: "Infiniti Q50 2023", brand: "Infiniti", year: 2023, image: "https://www.caryaati.com/erps/admin/images/model/model_sp_896_773.png", daily: 250, weekly: 1400, monthly: 4800, seats: 5, doors: 4, luggage: 2, category: "Sedan", transmission: "Auto", fuel: "Petrol" },
  // SUVs
  { id: "mitsubishi-asx-2022", name: "Mitsubishi ASX 2022", brand: "Mitsubishi", year: 2022, image: "https://www.caryaati.com/erps/admin/images/model/model_sp_587_167.webp", daily: 90, weekly: 560, monthly: 1800, seats: 4, doors: 4, luggage: 3, category: "SUV", transmission: "Auto", fuel: "Petrol" },
  { id: "mazda-cx5-2021", name: "Mazda CX5 2021", brand: "Mazda", year: 2021, image: "https://www.caryaati.com/erps/admin/images/model/model-165-775649.webp", daily: 90, weekly: 560, monthly: 2100, seats: 5, doors: 4, luggage: 4, category: "SUV", transmission: "Auto", fuel: "Petrol" },
  { id: "mazda-cx5-2022", name: "Mazda CX5 2022", brand: "Mazda", year: 2022, image: "https://www.caryaati.com/erps/admin/images/model/model-165-775649.webp", daily: 100, weekly: 700, monthly: 2250, seats: 5, doors: 4, luggage: 4, category: "SUV", transmission: "Auto", fuel: "Petrol" },
  { id: "nissan-kicks-2022", name: "Nissan Kicks 2022", brand: "Nissan", year: 2022, image: "https://www.caryaati.com/erps/admin/images/model/model_sp_558_918.webp", daily: 100, weekly: 630, monthly: 1800, seats: 5, doors: 4, luggage: 3, category: "SUV", transmission: "Auto", fuel: "Petrol" },
  { id: "kia-seltos-2021", name: "Kia Seltos 2021", brand: "Kia", year: 2021, image: "https://www.caryaati.com/erps/admin/images/model/model_sp_471_276.webp", daily: 100, weekly: 630, monthly: 1980, seats: 5, doors: 4, luggage: 5, category: "SUV", transmission: "Auto", fuel: "Petrol" },
  { id: "kia-seltos-2022", name: "Kia Seltos 2022", brand: "Kia", year: 2022, image: "https://www.caryaati.com/erps/admin/images/model/model_sp_471_276.webp", daily: 110, weekly: 630, monthly: 2100, seats: 5, doors: 4, luggage: 5, category: "SUV", transmission: "Auto", fuel: "Petrol" },
  { id: "kia-seltos-2023", name: "Kia Seltos 2023", brand: "Kia", year: 2023, image: "https://www.caryaati.com/erps/admin/images/model/model_sp_620_819.png", daily: 120, weekly: 700, monthly: 2670, seats: 5, doors: 4, luggage: 5, category: "SUV", transmission: "Auto", fuel: "Petrol" },
  { id: "hyundai-creta-2019", name: "Hyundai Creta 2019", brand: "Hyundai", year: 2019, image: "https://www.caryaati.com/erps/admin/images/model/model-361-839729.webp", daily: 100, weekly: 630, monthly: 2100, seats: 5, doors: 4, luggage: 4, category: "SUV", transmission: "Auto", fuel: "Petrol" },
  { id: "hyundai-creta-2022", name: "Hyundai Creta 2022", brand: "Hyundai", year: 2022, image: "https://www.caryaati.com/erps/admin/images/model/model_sp_571_549.webp", daily: 100, weekly: 630, monthly: 1980, seats: 5, doors: 4, luggage: 4, category: "SUV", transmission: "Auto", fuel: "Petrol" },
  { id: "hyundai-tucson-2019", name: "Hyundai Tucson 2019", brand: "Hyundai", year: 2019, image: "https://www.caryaati.com/erps/admin/images/model/model-360-153247.webp", daily: 100, weekly: 630, monthly: 2100, seats: 5, doors: 4, luggage: 4, category: "SUV", transmission: "Auto", fuel: "Petrol" },
  { id: "hyundai-tucson-2021", name: "Hyundai Tucson 2021", brand: "Hyundai", year: 2021, image: "https://www.caryaati.com/erps/admin/images/model/model-192-307497.webp", daily: 100, weekly: 630, monthly: 2100, seats: 5, doors: 4, luggage: 4, category: "SUV", transmission: "Auto", fuel: "Petrol" },
  { id: "peugeot-3008-2022", name: "Peugeot 3008 2022", brand: "Peugeot", year: 2022, image: "https://www.caryaati.com/erps/admin/images/model/model_sp_555_915.webp", daily: 100, weekly: 630, monthly: 2100, seats: 5, doors: 4, luggage: 4, category: "SUV", transmission: "Auto", fuel: "Petrol" },
  { id: "peugeot-3008-2023", name: "Peugeot 3008 2023", brand: "Peugeot", year: 2023, image: "https://www.caryaati.com/erps/admin/images/model/model_sp_555_915.webp", daily: 100, weekly: 700, monthly: 2220, seats: 5, doors: 4, luggage: 4, category: "SUV", transmission: "Auto", fuel: "Petrol" },
  { id: "peugeot-3008-2025", name: "Peugeot 3008 2025", brand: "Peugeot", year: 2025, image: "https://www.caryaati.com/erps/admin/images/model/model_sp_555_915.webp", daily: 110, weekly: 700, monthly: 2400, seats: 5, doors: 4, luggage: 4, category: "SUV", transmission: "Auto", fuel: "Petrol" },
  { id: "kia-sportage-2021", name: "Kia Sportage 2021", brand: "Kia", year: 2021, image: "https://www.caryaati.com/erps/admin/images/model/model-158-417887.webp", daily: 110, weekly: 630, monthly: 2100, seats: 5, doors: 4, luggage: 4, category: "SUV", transmission: "Auto", fuel: "Petrol" },
  { id: "kia-sportage-2023", name: "Kia Sportage 2023", brand: "Kia", year: 2023, image: "https://www.caryaati.com/erps/admin/images/model/model_sp_621_429.png", daily: 130, weekly: 770, monthly: 2700, seats: 5, doors: 4, luggage: 3, category: "SUV", transmission: "Auto", fuel: "Petrol" },
  { id: "infiniti-qx55-2023", name: "Infiniti QX55 2023", brand: "Infiniti", year: 2023, image: "https://www.caryaati.com/erps/admin/images/model/model_sp_894_750.png", daily: 350, weekly: 2100, monthly: 7500, seats: 5, doors: 4, luggage: 3, category: "SUV", transmission: "Auto", fuel: "Petrol" },
  { id: "hyundai-santafe-2022", name: "Hyundai SantaFe 2022", brand: "Hyundai", year: 2022, image: "https://www.caryaati.com/erps/admin/images/model/model_sp_574_860.webp", daily: 170, weekly: 1050, monthly: 3600, seats: 7, doors: 4, luggage: 3, category: "SUV", transmission: "Auto", fuel: "Petrol" },
  { id: "hyundai-palisade-2022", name: "Hyundai Palisade 2022", brand: "Hyundai", year: 2022, image: "https://www.caryaati.com/erps/admin/images/model/model_sp_570_599.webp", daily: 250, weekly: 1575, monthly: 6000, seats: 7, doors: 4, luggage: 3, category: "SUV", transmission: "Auto", fuel: "Petrol" },
  // Luxury
  { id: "gmc-sierra-2022", name: "GMC Sierra 2022", brand: "GMC", year: 2022, image: "https://www.caryaati.com/erps/admin/images/model/model_sp_595_712.webp", daily: 500, weekly: 2800, monthly: 9900, seats: 4, doors: 4, luggage: 3, category: "Luxury", transmission: "Auto", fuel: "Petrol" },
  { id: "rollsroyce-cullinan-2022", name: "RollsRoyce Cullinan 2022", brand: "RollsRoyce", year: 2022, image: "https://www.caryaati.com/erps/admin/images/model/model_sp_604_899.webp", daily: 4500, weekly: 30000, monthly: 115000, seats: 4, doors: 4, luggage: 3, category: "Luxury", transmission: "Auto", fuel: "Petrol" },
];

export const categories = ["All", "Economy", "Sedan", "SUV", "Luxury"] as const;
export const brands = [...new Set(allCars.map(c => c.brand))].sort();

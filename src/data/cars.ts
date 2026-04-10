/**
 * Car Fleet Data — ERP Integration Ready (Caryaati)
 * 
 * This data structure is designed to be replaced by API calls to your Caryaati ERP system.
 * Each car has an `erpId` field that maps to the Caryaati model ID, and a `slug` field
 * matching the URL structure on caryaati.com/erps/admin/images/model/.
 * 
 * To integrate with Caryaati:
 * 1. Replace the static `allCars` array with an API call to your ERP endpoint
 * 2. Map ERP fields to the CarData type below
 * 3. Use `erpId` to sync availability, pricing, and images in real-time
 * 4. The `inStock` field should be updated from your ERP's availability system
 * 5. Images are served from caryaati.com — update `images` array from ERP media endpoints
 */

const R = "http://www.caryaati.com/erps/admin/images/real_img/";
const M = "https://www.caryaati.com/erps/admin/images/model/";

export type CarData = {
  id: string;
  name: string;
  brand: string;
  year: number;
  image: string;
  /** Multiple images for the detail page gallery (exterior 360° + interior) */
  images: string[];
  daily: number;
  weekly: number;
  monthly: number;
  seats: number;
  doors: number;
  luggage: number;
  category: "Economy" | "Sedan" | "SUV" | "Luxury";
  transmission: string;
  fuel: string;
  bodyType: string;
  engine: string;
  horsepower: number;
  description: string;
  features: string[];
  /** Whether the car is currently available — synced from Caryaati ERP */
  inStock: boolean;
  /** Caryaati ERP model identifier for API sync */
  erpId: string;
  /** URL slug matching Caryaati/Alemad.ae routing */
  slug: string;
};

export const allCars: CarData[] = [
  // ─── ECONOMY ──────────────────────────────────────────────
  { id: "chevrolet-spark-2015", name: "Chevrolet Spark 2015", brand: "Chevrolet", year: 2015, image: `${M}model-167-807058.webp`, images: [`${M}model-167-807058.webp`], daily: 50, weekly: 315, monthly: 990, seats: 4, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol", bodyType: "Hatchback", engine: "1.2L", horsepower: 84, description: "The Chevrolet Spark 2015 is the perfect budget-friendly option for navigating Dubai's busy streets. This compact hatchback delivers excellent fuel economy while being easy to park in tight city spaces.", features: ["Bluetooth", "USB Port", "Air Conditioning", "Power Windows"], inStock: true, erpId: "model-167", slug: "chevrolet-spark-2015" },
  
  { id: "nissan-micra-2019", name: "Nissan Micra 2019", brand: "Nissan", year: 2019, image: `${M}model-369-189972.webp`, images: [`${M}model-369-189972.webp`], daily: 60, weekly: 385, monthly: 1380, seats: 4, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol", bodyType: "Hatchback", engine: "1.5L", horsepower: 98, description: "The Nissan Micra 2019 offers a stylish and efficient driving experience in Dubai. Known for its reliability, the Micra provides a smooth ride with responsive handling.", features: ["Apple CarPlay", "Reverse Camera", "Cruise Control", "Bluetooth"], inStock: false, erpId: "model-369", slug: "nissan-micra-2019" },
  
  { id: "nissan-micra-2020", name: "Nissan Micra 2020", brand: "Nissan", year: 2020, image: `${M}model-369-189972.webp`, images: [`${M}model-369-189972.webp`], daily: 55, weekly: 350, monthly: 1200, seats: 4, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol", bodyType: "Hatchback", engine: "1.5L", horsepower: 98, description: "The 2020 Nissan Micra brings refreshed styling and enhanced technology to the compact segment. Perfect for zipping through Dubai traffic.", features: ["Apple CarPlay", "Android Auto", "Reverse Camera", "Cruise Control"], inStock: true, erpId: "model-369", slug: "nissan-micra-2020" },
  
  { id: "nissan-sunny-2019", name: "Nissan Sunny 2019", brand: "Nissan", year: 2019, image: `${M}model-363-459485.webp`, images: [`${M}model-363-459485.webp`], daily: 60, weekly: 385, monthly: 1350, seats: 5, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol", bodyType: "Sedan", engine: "1.5L", horsepower: 118, description: "The Nissan Sunny 2019 is a practical and spacious sedan that offers outstanding value. With generous legroom and a large trunk.", features: ["Bluetooth", "USB Port", "Air Conditioning", "Power Mirrors"], inStock: false, erpId: "model-363", slug: "nissan-sunny-2019" },
  
  { id: "nissan-sunny-2020", name: "Nissan Sunny 2020", brand: "Nissan", year: 2020, image: `${M}model-363-459485.webp`, images: [`${M}model-363-459485.webp`], daily: 55, weekly: 350, monthly: 1200, seats: 5, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol", bodyType: "Sedan", engine: "1.5L", horsepower: 118, description: "The redesigned 2020 Nissan Sunny features a bold new look with a more spacious cabin and advanced safety features.", features: ["Touchscreen Display", "Apple CarPlay", "Reverse Camera", "Lane Departure Warning"], inStock: true, erpId: "model-363", slug: "nissan-sunny-2020" },
  
  { id: "nissan-sunny-2022", name: "Nissan Sunny 2022", brand: "Nissan", year: 2022, image: `${M}model-363-459485.webp?p=92`, images: [
    `${M}model-363-459485.webp?p=92`,
    `${R}realimg_65_863.jpg`, `${R}realimg_66_327.jpg`, `${R}realimg_67_930.jpg`, `${R}realimg_68_964.jpg`,
    `${R}realimg_69_351.jpg`, `${R}realimg_70_267.jpg`, `${R}realimg_71_430.jpg`, `${R}realimg_72_66.jpg`
  ], daily: 65, weekly: 420, monthly: 1260, seats: 5, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol", bodyType: "Sedan", engine: "1.6L", horsepower: 122, description: "The 2022 Nissan Sunny combines modern design with exceptional fuel efficiency. Featuring Nissan's latest safety suite.", features: ["Automatic Emergency Braking", "Blind Spot Warning", "Apple CarPlay", "Android Auto"], inStock: true, erpId: "model-363", slug: "nissan-sunny-2022" },
  
  { id: "nissan-sunny-2023", name: "Nissan Sunny 2023", brand: "Nissan", year: 2023, image: `${M}model-363-459485.webp?p=17`, images: [
    `${M}model-363-459485.webp?p=17`,
    `${R}realimg_476_664.jpeg`, `${R}realimg_477_361.jpeg`, `${R}realimg_478_11.jpeg`, `${R}realimg_479_204.jpeg`, `${R}realimg_480_878.jpeg`
  ], daily: 65, weekly: 420, monthly: 1350, seats: 5, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol", bodyType: "Sedan", engine: "1.6L", horsepower: 122, description: "The latest 2023 Nissan Sunny delivers an elevated driving experience with refined interior materials and enhanced connectivity.", features: ["Wireless Apple CarPlay", "360° Camera", "Automatic Climate Control", "Push Button Start"], inStock: true, erpId: "model-363", slug: "nissan-sunny-2023" },
  
  { id: "nissan-sunny-2024", name: "Nissan Sunny 2024", brand: "Nissan", year: 2024, image: `${M}model_sp_557_572.webp?p=24`, images: [
    `${M}model_sp_557_572.webp?p=24`
  ], daily: 65, weekly: 420, monthly: 1350, seats: 5, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol", bodyType: "Sedan", engine: "1.6L", horsepower: 122, description: "The 2024 Nissan Sunny continues the legacy with refreshed styling and improved cabin technology for an even smoother drive.", features: ["Wireless Apple CarPlay", "360° Camera", "Automatic Climate Control", "Push Button Start", "LED Headlights"], inStock: true, erpId: "model_sp_557", slug: "nissan-sunny-2024" },
  
  { id: "kia-picanto-2020", name: "Kia Picanto 2020", brand: "Kia", year: 2020, image: `${M}model-157-7357.webp`, images: [`${M}model-157-7357.webp`], daily: 55, weekly: 350, monthly: 1200, seats: 4, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol", bodyType: "Hatchback", engine: "1.2L", horsepower: 84, description: "The Kia Picanto 2020 is a fun-to-drive city car that punches above its weight. Eye-catching design and peppy engine.", features: ["Touchscreen Infotainment", "Bluetooth", "Air Conditioning", "USB Charging"], inStock: true, erpId: "model-157", slug: "kia-picanto-2020" },
  
  { id: "kia-pegas-2022", name: "Kia Pegas 2022", brand: "Kia", year: 2022, image: `${M}pegas.webp?p=84`, images: [`${M}pegas.webp?p=84`, `${M}pegas.webp?p=89`], daily: 60, weekly: 385, monthly: 1350, seats: 5, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol", bodyType: "Sedan", engine: "1.4L", horsepower: 95, description: "The Kia Pegas 2022 is a stylish and practical subcompact sedan that offers excellent value.", features: ["Touchscreen Display", "Reverse Camera", "Bluetooth", "Steering Wheel Controls"], inStock: true, erpId: "pegas", slug: "kia-pegas-2022" },
  
  { id: "kia-pegas-2023", name: "Kia Pegas 2023", brand: "Kia", year: 2023, image: `${M}pegas.webp`, images: [`${M}pegas.webp`], daily: 60, weekly: 385, monthly: 1440, seats: 5, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol", bodyType: "Sedan", engine: "1.4L", horsepower: 95, description: "The 2023 Kia Pegas brings fresh styling updates and improved interior quality. Perfect for reliable daily transportation.", features: ["8-inch Touchscreen", "Apple CarPlay", "Android Auto", "Reverse Camera", "Cruise Control"], inStock: true, erpId: "pegas", slug: "kia-pegas-2023" },
  
  { id: "kia-pegas-2024", name: "Kia Pegas 2024", brand: "Kia", year: 2024, image: `${M}pegas.webp`, images: [`${M}pegas.webp`], daily: 70, weekly: 420, monthly: 1470, seats: 5, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol", bodyType: "Sedan", engine: "1.4L", horsepower: 100, description: "The all-new 2024 Kia Pegas features a bold redesign with a larger grille and sharper LED lighting.", features: ["LED Headlights", "Wireless Apple CarPlay", "Automatic Climate Control", "Push Button Start"], inStock: true, erpId: "pegas", slug: "kia-pegas-2024" },
  
  { id: "kia-pegas-2025", name: "Kia Pegas 2025", brand: "Kia", year: 2025, image: `${M}pegas.webp`, images: [`${M}pegas.webp`], daily: 70, weekly: 455, monthly: 1500, seats: 5, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol", bodyType: "Sedan", engine: "1.4L", horsepower: 100, description: "The latest 2025 Kia Pegas represents the pinnacle of the Pegas lineup with cutting-edge safety.", features: ["Advanced Safety Suite", "Wireless Charging", "LED DRL", "Automatic Emergency Braking", "Lane Keep Assist"], inStock: true, erpId: "pegas", slug: "kia-pegas-2025" },
  
  { id: "kia-rio-2020", name: "Kia Rio 2020", brand: "Kia", year: 2020, image: `${M}rio-2020.webp`, images: [`${M}rio-2020.webp`], daily: 70, weekly: 420, monthly: 1410, seats: 4, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol", bodyType: "Hatchback", engine: "1.4L", horsepower: 100, description: "The Kia Rio 2020 is a sporty hatchback that combines European-inspired design with Korean reliability.", features: ["Apple CarPlay", "Android Auto", "Cruise Control", "Automatic Headlights"], inStock: true, erpId: "rio-2020", slug: "kia-rio-2020" },
  
  { id: "kia-rio-2021", name: "Kia Rio 2021", brand: "Kia", year: 2021, image: `${M}rio-2020.webp`, images: [`${M}rio-2020.webp`], daily: 70, weekly: 455, monthly: 1650, seats: 4, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol", bodyType: "Hatchback", engine: "1.4L", horsepower: 100, description: "The facelifted 2021 Kia Rio brings a refreshed exterior with new LED headlights and updated bumper design.", features: ["8-inch Touchscreen", "Wireless Apple CarPlay", "LED Headlights", "Reverse Camera"], inStock: true, erpId: "rio-2020", slug: "kia-rio-2021" },
  
  { id: "hyundai-accent-2020", name: "Hyundai Accent 2020", brand: "Hyundai", year: 2020, image: `${M}model-362-197219.webp`, images: [`${M}model-362-197219.webp`], daily: 60, weekly: 385, monthly: 1350, seats: 5, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol", bodyType: "Sedan", engine: "1.6L", horsepower: 123, description: "The Hyundai Accent 2020 is a well-equipped sedan that delivers impressive comfort and performance.", features: ["Apple CarPlay", "Android Auto", "Reverse Camera", "Automatic Climate Control"], inStock: true, erpId: "model-362", slug: "hyundai-accent-2020" },
  
  { id: "hyundai-accent-2022", name: "Hyundai Accent 2022", brand: "Hyundai", year: 2022, image: `${M}model_sp_576_353.webp`, images: [
    `${M}model_sp_576_353.webp`,
    `${R}realimg_49_988.jpg`, `${R}realimg_50_773.jpg`, `${R}realimg_51_143.jpg`, `${R}realimg_52_3.jpg`,
    `${R}realimg_53_89.jpg`, `${R}realimg_54_328.jpg`, `${R}realimg_55_786.jpg`, `${R}realimg_56_751.jpg`
  ], daily: 70, weekly: 420, monthly: 1500, seats: 5, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol", bodyType: "Sedan", engine: "1.6L", horsepower: 123, description: "The 2022 Hyundai Accent features Hyundai's latest design language with cascading grille and sleek LED lighting.", features: ["SmartSense Safety", "Wireless Apple CarPlay", "LED DRL", "Push Button Start"], inStock: true, erpId: "model_sp_576", slug: "hyundai-accent-2022" },
  
  { id: "mitsubishi-attrage-2022", name: "Mitsubishi Attrage 2022", brand: "Mitsubishi", year: 2022, image: `${M}model_sp_774_646.png`, images: [
    `${M}model_sp_774_646.png`,
    `${R}realimg_443_837.jpg`, `${R}realimg_444_760.jpg`, `${R}realimg_445_925.jpg`, `${R}realimg_446_938.jpg`, `${R}realimg_447_681.jpg`
  ], daily: 65, weekly: 420, monthly: 1410, seats: 5, doors: 4, luggage: 2, category: "Economy", transmission: "Auto", fuel: "Petrol", bodyType: "Sedan", engine: "1.2L", horsepower: 78, description: "The Mitsubishi Attrage 2022 is the ultimate fuel-saver in our fleet with exceptional mileage.", features: ["Touchscreen Display", "Reverse Camera", "Bluetooth", "USB Charging"], inStock: true, erpId: "model_sp_774", slug: "mitsubishi-attrage-2022" },
  
  { id: "mitsubishi-attrage-2023", name: "Mitsubishi Attrage 2023", brand: "Mitsubishi", year: 2023, image: `${M}model_sp_774_646.png`, images: [
    `${M}model_sp_774_646.png`,
    `${R}realimg_654_175.jpg`, `${R}realimg_655_969.jpg`, `${R}realimg_656_662.jpg`, `${R}realimg_657_622.jpg`,
    `${R}realimg_658_609.jpg`, `${R}realimg_659_88.jpg`, `${R}realimg_660_81.jpg`
  ], daily: 70, weekly: 420, monthly: 1500, seats: 5, doors: 4, luggage: 2, category: "Economy", transmission: "Auto", fuel: "Petrol", bodyType: "Sedan", engine: "1.2L", horsepower: 78, description: "The 2023 Mitsubishi Attrage comes with a refreshed front fascia and class-leading fuel economy.", features: ["7-inch Touchscreen", "Apple CarPlay", "Android Auto", "Automatic Climate Control"], inStock: true, erpId: "model_sp_774", slug: "mitsubishi-attrage-2023" },
  
  { id: "mitsubishi-mirage-2023", name: "Mitsubishi Mirage 2023", brand: "Mitsubishi", year: 2023, image: `${M}model_sp_774_646.png`, images: [
    `${M}model_sp_774_646.png`,
    `${R}realimg_669_340.jpg`, `${R}realimg_670_287.jpg`, `${R}realimg_671_708.jpg`, `${R}realimg_672_23.jpg`,
    `${R}realimg_673_731.jpg`, `${R}realimg_674_707.jpg`, `${R}realimg_675_900.jpg`
  ], daily: 65, weekly: 420, monthly: 1500, seats: 4, doors: 4, luggage: 2, category: "Economy", transmission: "Auto", fuel: "Petrol", bodyType: "Hatchback", engine: "1.2L", horsepower: 78, description: "The Mitsubishi Mirage 2023 is one of the most fuel-efficient cars in Dubai. Perfect for budget-conscious drivers who want reliable transportation.", features: ["Touchscreen Display", "Reverse Camera", "Bluetooth", "Air Conditioning"], inStock: true, erpId: "model_sp_774", slug: "mitsubishi-mirage-2023" },
  
  { id: "geely-emgrand-2025", name: "Geely Emgrand 2025", brand: "Geely", year: 2025, image: `${M}model_sp_1133_312.png`, images: [
    `${M}model_sp_1133_312.png`,
    `${R}realimg_1356_713.jpeg`, `${R}realimg_1357_735.jpeg`, `${R}realimg_1358_264.jpeg`, `${R}realimg_1359_688.jpeg`,
    `${R}realimg_1360_946.jpeg`, `${R}realimg_1361_787.jpeg`, `${R}realimg_1362_781.jpeg`, `${R}realimg_1363_805.jpeg`
  ], daily: 80, weekly: 490, monthly: 1830, seats: 5, doors: 4, luggage: 2, category: "Economy", transmission: "Auto", fuel: "Petrol", bodyType: "Sedan", engine: "1.5L", horsepower: 114, description: "The Geely Emgrand 2025 is a game-changer in the economy segment with a premium interior that rivals cars twice its price.", features: ["10.25-inch Touchscreen", "Digital Cluster", "360° Camera", "Cruise Control", "LED Headlights"], inStock: true, erpId: "model_sp_1133", slug: "geely-emgrand-2025" },
  
  { id: "geely-emgrand-2026", name: "Geely Emgrand 2026", brand: "Geely", year: 2026, image: `${M}model_sp_1133_312.png`, images: [
    `${M}model_sp_1133_312.png`
  ], daily: 80, weekly: 490, monthly: 1830, seats: 5, doors: 4, luggage: 2, category: "Economy", transmission: "Auto", fuel: "Petrol", bodyType: "Sedan", engine: "1.5L", horsepower: 114, description: "The brand-new 2026 Geely Emgrand continues to deliver premium value with the latest technology updates and refined driving dynamics.", features: ["10.25-inch Touchscreen", "Digital Cluster", "360° Camera", "Cruise Control", "LED Headlights", "Wireless Charging"], inStock: true, erpId: "model_sp_1133", slug: "geely-emgrand-2026" },
  
  { id: "mg-mg3-2026", name: "MG MG3 2026", brand: "MG", year: 2026, image: `${M}model_sp_1133_312.png`, images: [
    `${R}realimg_1844_847.jpeg`, `${R}realimg_1845_16.jpeg`, `${R}realimg_1846_866.jpeg`, `${R}realimg_1847_395.jpeg`,
    `${R}realimg_1848_255.jpeg`, `${R}realimg_1849_641.jpeg`, `${R}realimg_1850_108.jpeg`, `${R}realimg_1851_617.jpeg`
  ], daily: 70, weekly: 455, monthly: 1650, seats: 4, doors: 4, luggage: 2, category: "Economy", transmission: "Auto", fuel: "Petrol", bodyType: "Hatchback", engine: "1.5L", horsepower: 112, description: "The MG MG3 2026 is a stylish and affordable hatchback with British design heritage. Perfect for navigating city streets with ease.", features: ["Touchscreen Display", "Apple CarPlay", "Android Auto", "Reverse Camera", "Bluetooth"], inStock: true, erpId: "mg-mg3", slug: "mg-mg3-2026" },
  
  { id: "mg-mg5-2026", name: "MG MG5 2026", brand: "MG", year: 2026, image: `${M}model_sp_1133_312.png`, images: [
    `${R}realimg_1860_114.jpeg`, `${R}realimg_1861_1.jpeg`, `${R}realimg_1862_62.jpeg`, `${R}realimg_1863_875.jpeg`,
    `${R}realimg_1864_657.jpeg`, `${R}realimg_1865_979.jpeg`
  ], daily: 80, weekly: 490, monthly: 1830, seats: 4, doors: 4, luggage: 3, category: "Economy", transmission: "Auto", fuel: "Petrol", bodyType: "Sedan", engine: "1.5L", horsepower: 114, description: "The MG MG5 2026 is a spacious sedan that offers exceptional value with generous boot space and a refined interior.", features: ["10-inch Touchscreen", "Apple CarPlay", "Android Auto", "Cruise Control", "LED Headlights"], inStock: true, erpId: "mg-mg5", slug: "mg-mg5-2026" },

  // ─── SEDANS ───────────────────────────────────────────────
  { id: "hyundai-elantra-2022", name: "Hyundai Elantra 2022", brand: "Hyundai", year: 2022, image: `${M}model_sp_577_321.webp`, images: [
    `${M}model_sp_577_321.webp`,
    `${R}realimg_156_621.jpg`, `${R}realimg_157_320.jpg`, `${R}realimg_158_30.jpg`, `${R}realimg_159_270.jpg`,
    `${R}realimg_160_693.jpg`, `${R}realimg_161_241.jpg`, `${R}realimg_162_918.jpg`, `${R}realimg_163_310.jpg`
  ], daily: 90, weekly: 560, monthly: 2100, seats: 5, doors: 4, luggage: 3, category: "Sedan", transmission: "Auto", fuel: "Petrol", bodyType: "Sedan", engine: "1.6L", horsepower: 128, description: "The Hyundai Elantra 2022 turns heads with its radical parametric design. A dual-screen cockpit creates a tech-forward driving environment.", features: ["Dual-Screen Cockpit", "Wireless Apple CarPlay", "SmartSense Safety", "LED Headlights", "Heated Seats"], inStock: true, erpId: "model_sp_577", slug: "hyundai-elantra-2022" },
  
  { id: "mazda-3-2025", name: "Mazda 3 2025", brand: "Mazda", year: 2025, image: `${M}model_sp_1140_201.png`, images: [
    `${M}model_sp_1140_201.png`,
    `${R}realimg_1323_886.jpg`, `${R}realimg_1324_782.jpg`, `${R}realimg_1325_37.jpg`, `${R}realimg_1326_164.jpg`,
    `${R}realimg_1334_788.jpg`, `${R}realimg_1335_572.jpg`, `${R}realimg_1336_889.jpg`, `${R}realimg_1337_943.jpg`
  ], daily: 90, weekly: 560, monthly: 1980, seats: 5, doors: 4, luggage: 3, category: "Sedan", transmission: "Auto", fuel: "Petrol", bodyType: "Sedan", engine: "2.0L", horsepower: 155, description: "The Mazda 3 2025 embodies the Japanese philosophy of 'Jinba Ittai' with Kodo design language and a responsive Skyactiv engine.", features: ["Bose Sound System", "Head-Up Display", "Adaptive Cruise Control", "360° Camera", "Wireless Charging"], inStock: true, erpId: "model_sp_1140", slug: "mazda-3-2025" },
  
  { id: "kia-k5-2021", name: "Kia K5 2021", brand: "Kia", year: 2021, image: `${M}model_sp_470_166.webp`, images: [`${M}model_sp_470_166.webp`], daily: 100, weekly: 630, monthly: 2250, seats: 4, doors: 5, luggage: 3, category: "Sedan", transmission: "Auto", fuel: "Petrol", bodyType: "Sedan", engine: "2.5L", horsepower: 191, description: "The Kia K5 2021 is a mid-size sedan that redefines what's possible at its price point with a fastback silhouette.", features: ["Panoramic Sunroof", "Harman Kardon Audio", "Ventilated Seats", "Wireless Charging", "Smart Cruise Control"], inStock: true, erpId: "model_sp_470", slug: "kia-k5-2021" },
  
  { id: "kia-k5-2023", name: "Kia K5 2023", brand: "Kia", year: 2023, image: `${M}model_sp_765_766.png`, images: [`${M}model_sp_765_766.png`], daily: 110, weekly: 700, monthly: 2400, seats: 4, doors: 5, luggage: 3, category: "Sedan", transmission: "Auto", fuel: "Petrol", bodyType: "Sedan", engine: "2.5L", horsepower: 191, description: "The refreshed 2023 Kia K5 brings updated styling and an even more refined interior with ambient lighting.", features: ["Ambient Lighting", "12.3-inch Display", "Highway Driving Assist", "Ventilated Seats", "Remote Start"], inStock: true, erpId: "model_sp_765", slug: "kia-k5-2023" },
  
  { id: "mazda-6-2023", name: "Mazda 6 2023", brand: "Mazda", year: 2023, image: `${M}model_sp_472_544.webp`, images: [
    `${M}model_sp_472_544.webp`,
    `${R}realimg_89_846.jpg`, `${R}realimg_90_593.jpg`, `${R}realimg_91_568.jpg`, `${R}realimg_92_250.jpg`,
    `${R}realimg_93_443.jpg`, `${R}realimg_94_500.jpg`, `${R}realimg_95_133.jpg`, `${R}realimg_96_751.jpg`
  ], daily: 100, weekly: 630, monthly: 2400, seats: 5, doors: 4, luggage: 3, category: "Sedan", transmission: "Auto", fuel: "Petrol", bodyType: "Sedan", engine: "2.5L", horsepower: 187, description: "The Mazda 6 2023 is a refined executive sedan with hand-stitched Nappa leather and genuine wood trim.", features: ["Nappa Leather", "Bose 11-Speaker Audio", "Head-Up Display", "Adaptive LED Headlights", "Power Sunroof"], inStock: true, erpId: "model_sp_472", slug: "mazda-6-2023" },
  
  { id: "mg-gt-2025", name: "MG GT 2025", brand: "MG", year: 2025, image: `${M}model_sp_1133_312.png`, images: [
    `${R}realimg_1852_882.jpeg`, `${R}realimg_1853_720.jpeg`, `${R}realimg_1854_261.jpeg`, `${R}realimg_1855_671.jpeg`,
    `${R}realimg_1856_811.jpeg`, `${R}realimg_1857_710.jpeg`, `${R}realimg_1858_912.jpeg`, `${R}realimg_1859_800.jpeg`
  ], daily: 100, weekly: 630, monthly: 2400, seats: 4, doors: 4, luggage: 3, category: "Sedan", transmission: "Auto", fuel: "Petrol", bodyType: "Sedan", engine: "1.5L Turbo", horsepower: 169, description: "The MG GT 2025 is a sporty sedan with turbocharged performance and a sleek fastback design. British heritage meets modern technology.", features: ["10.25-inch Touchscreen", "Digital Cluster", "Cruise Control", "LED Headlights", "Rear Parking Sensors"], inStock: true, erpId: "mg-gt", slug: "mg-gt-2025" },
  
  { id: "mg-gt-turbo-2025", name: "MG GT Turbo 2025", brand: "MG", year: 2025, image: `${M}model_sp_1133_312.png`, images: [
    `${R}realimg_1852_882.jpeg`, `${R}realimg_1853_720.jpeg`, `${R}realimg_1854_261.jpeg`, `${R}realimg_1855_671.jpeg`
  ], daily: 110, weekly: 700, monthly: 2670, seats: 5, doors: 4, luggage: 2, category: "Sedan", transmission: "Auto", fuel: "Petrol", bodyType: "Sedan", engine: "1.5L Turbo", horsepower: 181, description: "The MG GT Turbo 2025 delivers exhilarating performance with its turbocharged engine and sport-tuned suspension. A thrilling drive at an affordable price.", features: ["Turbo Engine", "Sport Mode", "10.25-inch Touchscreen", "360° Camera", "Wireless Charging", "Ambient Lighting"], inStock: true, erpId: "mg-gt-turbo", slug: "mg-gt-turbo-2025" },
  
  { id: "infiniti-q50-2023", name: "Infiniti Q50 2023", brand: "Infiniti", year: 2023, image: `${M}model_sp_896_773.png`, images: [`${M}model_sp_896_773.png`], daily: 250, weekly: 1400, monthly: 4800, seats: 5, doors: 4, luggage: 2, category: "Sedan", transmission: "Auto", fuel: "Petrol", bodyType: "Sedan", engine: "3.0L Twin-Turbo", horsepower: 300, description: "The Infiniti Q50 2023 is a luxury sports sedan with a twin-turbocharged 3.0L V6 producing 300 horsepower.", features: ["Twin-Turbo V6", "InTouch Dual Display", "Bose 16-Speaker Audio", "Around View Monitor", "Sport-Tuned Suspension"], inStock: true, erpId: "model_sp_896", slug: "infiniti-q50-2023" },

  // ─── SUVs ─────────────────────────────────────────────────
  { id: "mitsubishi-asx-2022", name: "Mitsubishi ASX 2022", brand: "Mitsubishi", year: 2022, image: `${M}model_sp_587_167.webp`, images: [
    `${M}model_sp_587_167.webp`,
    `${R}realimg_497_968.jpg`, `${R}realimg_498_421.jpg`, `${R}realimg_499_522.jpg`, `${R}realimg_500_185.jpg`,
    `${R}realimg_501_850.jpg`, `${R}realimg_502_549.jpg`, `${R}realimg_503_799.jpg`
  ], daily: 90, weekly: 560, monthly: 1800, seats: 4, doors: 4, luggage: 3, category: "SUV", transmission: "Auto", fuel: "Petrol", bodyType: "Compact SUV", engine: "2.0L", horsepower: 150, description: "The Mitsubishi ASX 2022 is a compact crossover perfect for Dubai's diverse terrain.", features: ["Touchscreen Display", "Reverse Camera", "Cruise Control", "Automatic Climate Control"], inStock: true, erpId: "model_sp_587", slug: "mitsubishi-asx-2022" },
  
  { id: "mazda-cx5-2021", name: "Mazda CX5 2021", brand: "Mazda", year: 2021, image: `${M}model-165-775649.webp`, images: [
    `${M}model-165-775649.webp`,
    `${R}realimg_646_417.jpg`, `${R}realimg_647_852.jpg`, `${R}realimg_648_181.jpg`, `${R}realimg_649_144.jpg`,
    `${R}realimg_650_643.jpg`, `${R}realimg_651_695.jpg`, `${R}realimg_652_991.jpg`, `${R}realimg_653_985.jpg`
  ], daily: 90, weekly: 560, monthly: 2100, seats: 5, doors: 4, luggage: 4, category: "SUV", transmission: "Auto", fuel: "Petrol", bodyType: "SUV", engine: "2.5L", horsepower: 187, description: "The Mazda CX-5 2021 is a premium SUV that rivals luxury brands at a mainstream price.", features: ["Bose Sound System", "Apple CarPlay", "Adaptive Cruise Control", "LED Headlights", "Power Liftgate"], inStock: true, erpId: "model-165", slug: "mazda-cx5-2021" },
  
  { id: "mazda-cx5-2022", name: "Mazda CX5 2022", brand: "Mazda", year: 2022, image: `${M}model-165-775649.webp`, images: [
    `${M}model-165-775649.webp`,
    `${R}realimg_81_55.jpg`, `${R}realimg_82_631.jpg`, `${R}realimg_83_532.jpg`, `${R}realimg_84_996.jpg`,
    `${R}realimg_85_350.jpg`, `${R}realimg_86_748.jpg`, `${R}realimg_87_365.jpg`, `${R}realimg_88_65.jpg`
  ], daily: 100, weekly: 700, monthly: 2250, seats: 5, doors: 4, luggage: 4, category: "SUV", transmission: "Auto", fuel: "Petrol", bodyType: "SUV", engine: "2.5L", horsepower: 187, description: "The updated 2022 Mazda CX-5 introduces new exterior colors and interior refinements with Mi-Drive system.", features: ["Mi-Drive Modes", "Bose 10-Speaker Audio", "Wireless Apple CarPlay", "360° Camera", "Heated Seats"], inStock: true, erpId: "model-165", slug: "mazda-cx5-2022" },
  
  { id: "nissan-kicks-2022", name: "Nissan Kicks 2022", brand: "Nissan", year: 2022, image: `${M}model_sp_558_918.webp?p=84`, images: [
    `${M}model_sp_558_918.webp?p=84`,
    `${R}realimg_512_14.jpg`, `${R}realimg_513_746.jpg`, `${R}realimg_514_420.jpg`, `${R}realimg_515_245.jpg`,
    `${R}realimg_516_264.jpg`, `${R}realimg_517_910.jpg`, `${R}realimg_518_742.jpg`
  ], daily: 100, weekly: 630, monthly: 1800, seats: 5, doors: 4, luggage: 3, category: "SUV", transmission: "Auto", fuel: "Petrol", bodyType: "Compact SUV", engine: "1.6L", horsepower: 122, description: "The Nissan Kicks 2022 is a stylish urban crossover with a two-tone color scheme.", features: ["Bose Personal Plus Audio", "Apple CarPlay", "Around View Monitor", "Intelligent Cruise Control"], inStock: true, erpId: "model_sp_558", slug: "nissan-kicks-2022" },
  
  { id: "kia-seltos-2021", name: "Kia Seltos 2021", brand: "Kia", year: 2021, image: `${M}model_sp_471_276.webp`, images: [`${M}model_sp_471_276.webp`], daily: 100, weekly: 630, monthly: 1980, seats: 5, doors: 4, luggage: 5, category: "SUV", transmission: "Auto", fuel: "Petrol", bodyType: "Compact SUV", engine: "1.6L", horsepower: 123, description: "The Kia Seltos 2021 is a feature-packed compact SUV that offers incredible value.", features: ["Head-Up Display", "Bose Audio", "Wireless Charging", "Panoramic Sunroof", "Smart Cruise Control"], inStock: true, erpId: "model_sp_471", slug: "kia-seltos-2021" },
  
  { id: "kia-seltos-2022", name: "Kia Seltos 2022", brand: "Kia", year: 2022, image: `${M}model_sp_471_276.webp`, images: [`${M}model_sp_471_276.webp`], daily: 110, weekly: 630, monthly: 2100, seats: 5, doors: 4, luggage: 5, category: "SUV", transmission: "Auto", fuel: "Petrol", bodyType: "Compact SUV", engine: "1.6L", horsepower: 123, description: "The 2022 Kia Seltos continues to impress with bold styling and practical features.", features: ["10.25-inch Display", "Bose Audio", "Ventilated Seats", "Smart Key", "LED Headlights"], inStock: true, erpId: "model_sp_471", slug: "kia-seltos-2022" },
  
  { id: "kia-seltos-2023", name: "Kia Seltos 2023", brand: "Kia", year: 2023, image: `${M}model_sp_620_819.png`, images: [`${M}model_sp_620_819.png`], daily: 120, weekly: 700, monthly: 2670, seats: 5, doors: 4, luggage: 5, category: "SUV", transmission: "Auto", fuel: "Petrol", bodyType: "Compact SUV", engine: "1.6T", horsepower: 175, description: "The facelifted 2023 Kia Seltos receives a major design overhaul with turbocharged engine.", features: ["Dual 10.25-inch Screens", "Turbocharged Engine", "DCT Transmission", "ADAS Level 2", "Ambient Lighting"], inStock: true, erpId: "model_sp_620", slug: "kia-seltos-2023" },
  
  { id: "hyundai-creta-2019", name: "Hyundai Creta 2019", brand: "Hyundai", year: 2019, image: `${M}model-361-839729.webp`, images: [`${M}model-361-839729.webp`], daily: 100, weekly: 630, monthly: 2100, seats: 5, doors: 4, luggage: 4, category: "SUV", transmission: "Auto", fuel: "Petrol", bodyType: "Compact SUV", engine: "1.6L", horsepower: 123, description: "The Hyundai Creta 2019 is a proven and reliable compact SUV, a Dubai rental favorite.", features: ["Touchscreen Display", "Reverse Camera", "Cruise Control", "Automatic Climate Control"], inStock: true, erpId: "model-361", slug: "hyundai-creta-2019" },
  
  { id: "hyundai-creta-2022", name: "Hyundai Creta 2022", brand: "Hyundai", year: 2022, image: `${M}model_sp_571_549.webp`, images: [
    `${M}model_sp_571_549.webp`,
    `${R}realimg_97_498.jpg`, `${R}realimg_98_292.jpg`, `${R}realimg_99_627.jpg`, `${R}realimg_100_20.jpg`,
    `${R}realimg_101_38.jpg`, `${R}realimg_102_79.jpg`, `${R}realimg_103_353.jpg`
  ], daily: 100, weekly: 630, monthly: 1980, seats: 5, doors: 4, luggage: 4, category: "SUV", transmission: "Auto", fuel: "Petrol", bodyType: "Compact SUV", engine: "1.5L", horsepower: 115, description: "The all-new 2022 Hyundai Creta features a dramatic design transformation with parametric jewel pattern grille.", features: ["10.25-inch Display", "Bose Audio", "Panoramic Sunroof", "Ventilated Seats", "BlueLink Connected"], inStock: true, erpId: "model_sp_571", slug: "hyundai-creta-2022" },
  
  { id: "hyundai-tucson-2019", name: "Hyundai Tucson 2019", brand: "Hyundai", year: 2019, image: `${M}model-360-153247.webp`, images: [`${M}model-360-153247.webp`], daily: 100, weekly: 630, monthly: 2100, seats: 5, doors: 4, luggage: 4, category: "SUV", transmission: "Auto", fuel: "Petrol", bodyType: "SUV", engine: "2.0L", horsepower: 155, description: "The Hyundai Tucson 2019 is a versatile mid-size SUV that excels in all situations.", features: ["Apple CarPlay", "Android Auto", "Blind Spot Detection", "Rear Cross-Traffic Alert"], inStock: true, erpId: "model-360", slug: "hyundai-tucson-2019" },
  
  { id: "hyundai-tucson-2021", name: "Hyundai Tucson 2021", brand: "Hyundai", year: 2021, image: `${M}model-192-307497.webp`, images: [`${M}model-192-307497.webp`], daily: 100, weekly: 630, monthly: 2100, seats: 5, doors: 4, luggage: 4, category: "SUV", transmission: "Auto", fuel: "Petrol", bodyType: "SUV", engine: "2.5L", horsepower: 187, description: "The revolutionary 2021 Hyundai Tucson features a stunning parametric hidden-light grille.", features: ["Hidden-Light Grille", "10.25-inch Dual Screens", "HTRAC AWD", "Digital Key", "Remote Smart Parking"], inStock: true, erpId: "model-192", slug: "hyundai-tucson-2021" },
  
  { id: "peugeot-2008-2023", name: "Peugeot 2008 2023", brand: "Peugeot", year: 2023, image: `${M}model_sp_555_915.webp`, images: [
    `${M}model_sp_555_915.webp`,
    `${R}realimg_836_392.jpeg`, `${R}realimg_837_489.jpeg`, `${R}realimg_838_233.jpeg`, `${R}realimg_839_567.jpeg`,
    `${R}realimg_840_482.jpeg`, `${R}realimg_841_329.jpeg`, `${R}realimg_842_306.jpeg`, `${R}realimg_843_867.jpeg`
  ], daily: 110, weekly: 630, monthly: 2400, seats: 4, doors: 4, luggage: 3, category: "SUV", transmission: "Auto", fuel: "Petrol", bodyType: "Compact SUV", engine: "1.2L Turbo", horsepower: 130, description: "The Peugeot 2008 2023 is a stylish compact SUV with Peugeot's signature i-Cockpit and bold design lines.", features: ["i-Cockpit", "10-inch Touchscreen", "LED Headlights", "Panoramic Roof", "Rear Parking Camera"], inStock: true, erpId: "model_sp_555", slug: "peugeot-2008-2023" },
  
  { id: "peugeot-3008-2022", name: "Peugeot 3008 2022", brand: "Peugeot", year: 2022, image: `${M}model_sp_555_915.webp`, images: [
    `${M}model_sp_555_915.webp`,
    `${R}realimg_187_457.jpg`, `${R}realimg_188_834.jpg`, `${R}realimg_189_102.jpg`, `${R}realimg_190_609.jpg`,
    `${R}realimg_191_334.jpg`, `${R}realimg_192_605.jpg`, `${R}realimg_193_739.jpg`, `${R}realimg_194_49.jpg`
  ], daily: 100, weekly: 630, monthly: 2100, seats: 5, doors: 4, luggage: 4, category: "SUV", transmission: "Auto", fuel: "Petrol", bodyType: "SUV", engine: "1.6L Turbo", horsepower: 165, description: "The Peugeot 3008 2022 brings French elegance to Dubai's roads with its revolutionary i-Cockpit.", features: ["i-Cockpit", "12.3-inch Digital Cluster", "Focal Audio", "Panoramic Sunroof", "Adaptive Cruise Control"], inStock: true, erpId: "model_sp_555", slug: "peugeot-3008-2022" },
  
  { id: "peugeot-3008-2023", name: "Peugeot 3008 2023", brand: "Peugeot", year: 2023, image: `${M}model_sp_555_915.webp`, images: [
    `${M}model_sp_555_915.webp`,
    `${R}realimg_844_428.jpg`, `${R}realimg_845_594.jpg`, `${R}realimg_846_566.jpg`, `${R}realimg_847_179.jpg`,
    `${R}realimg_848_354.jpg`, `${R}realimg_849_662.jpg`, `${R}realimg_850_247.jpg`, `${R}realimg_851_800.jpg`
  ], daily: 100, weekly: 700, monthly: 2220, seats: 5, doors: 4, luggage: 4, category: "SUV", transmission: "Auto", fuel: "Petrol", bodyType: "SUV", engine: "1.6L Turbo", horsepower: 165, description: "The facelifted 2023 Peugeot 3008 introduces a new frameless grille and updated LED signature.", features: ["Updated i-Cockpit", "Matrix LED Headlights", "Focal Premium Audio", "Night Vision", "Hands-Free Liftgate"], inStock: true, erpId: "model_sp_555", slug: "peugeot-3008-2023" },
  
  { id: "peugeot-3008-2025", name: "Peugeot 3008 2025", brand: "Peugeot", year: 2025, image: `${M}model_sp_555_915.webp`, images: [
    `${M}model_sp_555_915.webp`,
    `${R}realimg_1327_502.jpeg`, `${R}realimg_1328_659.jpeg`, `${R}realimg_1329_361.jpeg`, `${R}realimg_1330_313.jpeg`,
    `${R}realimg_1331_287.jpeg`, `${R}realimg_1332_451.jpeg`, `${R}realimg_1333_841.jpeg`
  ], daily: 110, weekly: 700, monthly: 2400, seats: 5, doors: 4, luggage: 4, category: "SUV", transmission: "Auto", fuel: "Petrol", bodyType: "Fastback SUV", engine: "1.6L Turbo", horsepower: 210, description: "The all-new 2025 Peugeot 3008 is a radical departure with its fastback SUV silhouette and 21-inch curved screen.", features: ["21-inch Panoramic Screen", "Holographic HUD", "Focal Electra Audio", "ADAS Level 2+", "Matrix LED Vision"], inStock: true, erpId: "model_sp_555", slug: "peugeot-3008-2025" },
  
  { id: "kia-sportage-2021", name: "Kia Sportage 2021", brand: "Kia", year: 2021, image: `${M}model-158-417887.webp`, images: [`${M}model-158-417887.webp`], daily: 110, weekly: 630, monthly: 2100, seats: 5, doors: 4, luggage: 4, category: "SUV", transmission: "Auto", fuel: "Petrol", bodyType: "SUV", engine: "2.0L", horsepower: 155, description: "The Kia Sportage 2021 is a well-rounded SUV that excels in comfort and practicality.", features: ["Apple CarPlay", "Android Auto", "Blind Spot Detection", "Heated Steering Wheel", "Power Liftgate"], inStock: true, erpId: "model-158", slug: "kia-sportage-2021" },
  
  { id: "kia-sportage-2023", name: "Kia Sportage 2023", brand: "Kia", year: 2023, image: `${M}model_sp_621_429.png`, images: [`${M}model_sp_621_429.png`], daily: 130, weekly: 770, monthly: 2700, seats: 5, doors: 4, luggage: 3, category: "SUV", transmission: "Auto", fuel: "Petrol", bodyType: "SUV", engine: "2.5L", horsepower: 187, description: "The completely redesigned 2023 Kia Sportage is a showstopper with boomerang LED daytime running lights.", features: ["Dual 12.3-inch Screens", "Harman Kardon Audio", "Highway Driving Assist 2", "Remote Smart Parking", "Ambient Lighting"], inStock: true, erpId: "model_sp_621", slug: "kia-sportage-2023" },
  
  { id: "infiniti-qx55-2023", name: "Infiniti QX55 2023", brand: "Infiniti", year: 2023, image: `${M}model_sp_894_750.png`, images: [
    `${M}model_sp_894_750.png`,
    `${R}realimg_731_432.jpeg`, `${R}realimg_732_794.jpeg`, `${R}realimg_733_187.jpeg`, `${R}realimg_734_44.jpeg`,
    `${R}realimg_735_905.jpeg`, `${R}realimg_736_874.jpeg`
  ], daily: 350, weekly: 2100, monthly: 7500, seats: 5, doors: 4, luggage: 3, category: "SUV", transmission: "Auto", fuel: "Petrol", bodyType: "Coupe SUV", engine: "2.0L Turbo", horsepower: 268, description: "The Infiniti QX55 2023 is a luxury coupe-crossover with stunning design and exhilarating performance.", features: ["Semi-Aniline Leather", "Bose 16-Speaker Audio", "ProPILOT Assist", "Wireless Charging", "Power Moonroof"], inStock: true, erpId: "model_sp_894", slug: "infiniti-qx55-2023" },
  
  { id: "hyundai-santafe-2022", name: "Hyundai SantaFe 2022", brand: "Hyundai", year: 2022, image: `${M}model_sp_574_860.webp`, images: [
    `${M}model_sp_574_860.webp`,
    `${R}realimg_171_804.jpg`, `${R}realimg_172_65.jpg`, `${R}realimg_173_940.jpg`, `${R}realimg_174_73.jpg`,
    `${R}realimg_175_853.jpg`, `${R}realimg_176_321.jpg`, `${R}realimg_177_705.jpg`, `${R}realimg_178_142.jpg`
  ], daily: 170, weekly: 1050, monthly: 3600, seats: 7, doors: 4, luggage: 3, category: "SUV", transmission: "Auto", fuel: "Petrol", bodyType: "SUV", engine: "2.5L", horsepower: 191, description: "The Hyundai Santa Fe 2022 is the ultimate family SUV with seating for seven.", features: ["7-Seater", "Panoramic Sunroof", "Bose Audio", "HTRAC AWD", "Remote Start", "Heated & Ventilated Seats"], inStock: true, erpId: "model_sp_574", slug: "hyundai-santafe-2022" },
  
  { id: "hyundai-palisade-2022", name: "Hyundai Palisade 2022", brand: "Hyundai", year: 2022, image: `${M}model_sp_570_599.webp`, images: [
    `${M}model_sp_570_599.webp`,
    `${R}realimg_179_998.jpg`, `${R}realimg_180_455.jpg`, `${R}realimg_181_322.jpg`, `${R}realimg_182_767.jpg`,
    `${R}realimg_183_680.jpg`, `${R}realimg_184_646.jpg`, `${R}realimg_185_30.jpg`, `${R}realimg_186_226.jpg`
  ], daily: 250, weekly: 1575, monthly: 6000, seats: 7, doors: 4, luggage: 3, category: "SUV", transmission: "Auto", fuel: "Petrol", bodyType: "Full-Size SUV", engine: "3.8L V6", horsepower: 291, description: "The Hyundai Palisade 2022 is our flagship family SUV offering first-class comfort for up to eight passengers.", features: ["Nappa Leather", "Harman Kardon 12-Speaker", "Heads-Up Display", "Blind Spot Camera", "Smart Parking", "Rain-Sensing Wipers"], inStock: true, erpId: "model_sp_570", slug: "hyundai-palisade-2022" },

  // ─── LUXURY ───────────────────────────────────────────────
  { id: "gmc-sierra-2022", name: "GMC Sierra 2022", brand: "GMC", year: 2022, image: `${M}model_sp_595_712.webp`, images: [`${M}model_sp_595_712.webp`], daily: 500, weekly: 2800, monthly: 9900, seats: 4, doors: 4, luggage: 3, category: "Luxury", transmission: "Auto", fuel: "Petrol", bodyType: "Pickup Truck", engine: "5.3L V8", horsepower: 355, description: "The GMC Sierra 2022 is a commanding full-size pickup truck that dominates Dubai's roads.", features: ["5.3L V8 Engine", "MultiPro Tailgate", "Bose Audio", "Heads-Up Display", "360° Camera", "Towing Package"], inStock: true, erpId: "model_sp_595", slug: "gmc-sierra-2022" },
  
  { id: "rollsroyce-cullinan-2022", name: "RollsRoyce Cullinan 2022", brand: "RollsRoyce", year: 2022, image: `${M}model_sp_604_899.webp`, images: [`${M}model_sp_604_899.webp`], daily: 4500, weekly: 30000, monthly: 115000, seats: 4, doors: 4, luggage: 3, category: "Luxury", transmission: "Auto", fuel: "Petrol", bodyType: "Ultra-Luxury SUV", engine: "6.75L Twin-Turbo V12", horsepower: 563, description: "The Rolls-Royce Cullinan 2022 is the pinnacle of automotive luxury, handcrafted in Goodwood, England.", features: ["6.75L Twin-Turbo V12", "Starlight Headliner", "Bespoke Audio", "Lambswool Floor Mats", "Viewing Suite", "Spirit of Ecstasy"], inStock: true, erpId: "model_sp_604", slug: "rollsroyce-cullinan-2022" },
];

export const categories = ["All", "Economy", "Sedan", "SUV", "Luxury"] as const;
export const brands = [...new Set(allCars.map(c => c.brand))].sort();

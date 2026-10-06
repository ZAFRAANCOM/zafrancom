import { images } from "@/lib/images";

export const team = [
  {
    id: "ceo",
    image: images.executiveManager,
    ar: {
      name: "المهندسة منى الصياح",
      role: "المديرة التنفيذية",
      bio: "مهندسة زراعية بخبرة 15 عامًا في إدارة المشاريع الزراعية.",
    },
    en: {
      name: "Eng. Mona Al-Sayyah",
      role: "Chief Executive Officer (CEO)",
      bio: "Agricultural engineer with 15 years of experience in managing agricultural projects.",
    },
  },
  {
    id: "technical",
    image: images.technicalManager,
    ar: {
      name: "المهندسة شروق الزيود",
      role: "المديرة التقنية",
      bio: "خبرة 10 سنوات في الذكاء الاصطناعي والبرمجة والأتمتة.",
    },
    en: {
      name: "Eng. Shurouq Al-Zyoud",
      role: "Technical Manager",
      bio: "10 years of experience in artificial intelligence, programming and automation.",
    },
  },
  {
    id: "operations",
    image: images.operationsManager,
    ar: {
      name: "عبد العزيز محمود",
      role: "مدير العمليات",
      bio: "خبرة 5 سنوات في إدارة العمليات وتنظيم سير الإنتاج من المزرعة حتى التسليم.",
    },
    en: {
      name: "Abdulaziz Mahmoud",
      role: "Operations Manager",
      bio: "5 years of experience in operations management, organizing the production flow from farm to delivery.",
    },
  },
];

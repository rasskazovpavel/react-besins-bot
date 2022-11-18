const imtData = {
  numberVerdict: [
    "< 18,0",
    "18,0 - 25,0",
    "25,0 - 30,0",
    "30,0 - 35,0",
    "35,0 - 40,0",
    "> 40,0",
  ],
  textVerdict: [
    "Ниже нормально веса",
    "Нормальный вес",
    "Избыточный вес",
    "Ожирение I степени",
    "Ожирение II степени",
    "Ожирение III степени",
  ],
  color: ["#ffa3a3", "#a1f1e3", "#ffa3a3", "#dd6e6f", "#ce575a", "#c23b3c"],
};

const getIndexImt = (value) => {
  if (value < 18.5) {
    return 0;
  } else if (value >= 18 && value < 25) {
    return 1;
  } else if (value >= 25 && value < 30) {
    return 2;
  } else if (value >= 30 && value < 35) {
    return 3;
  } else if (value >= 35 && value < 40) {
    return 4;
  } else if (value >= 40) {
    return 5;
  }
};

const homaData = {
  numberVerdict: ["≤ 2.86", "> 2.86"],
  textVerdict: [
    "Результат в пределах нормальных значений",
    "Возможна инсулинорезистентность",
  ],

  color: ["#a1f1e3", "#dd6e6f"],
};

const getIndexHoma = (value) => {
  if (value <= 2.86) return 0;
  if (value > 2.86) return 1;
};

const hypertensData = {
  sad: [
    "< 120",
    "120 - 129",
    "130 - 139",
    "140 - 159",
    "160 - 179",
    "≥ 180",
    "≥ 140",
  ],
  dad: ["< 80", "80 - 84", "85 - 89", "90 - 99", "100 - 109", "≥ 110", "< 90"],
  textVerdict: [
    "Оптимальное",
    "Нормальное",
    "Высокое нормальное",
    "АГ 1й степени",
    "АГ 2й степени",
    "АГ 3й степени",
    "Изолированная систолическая гипертензия",
  ],
  color: [
    "#a1f1e3",
    "#a1f1e3",
    "#ffa3a3",
    "#dd6e6f",
    "#ce575a",
    "#c23b3c",
    "$852929",
  ],
};

const getIndexHypertens = (sad, dad) => {
  if (sad < 120 || dad < 80) return 0;
  if ((sad >= 120 && sad <= 129) || (dad >= 80 && dad <= 84)) return 1;
  if ((sad >= 130 && sad <= 139) || (dad >= 85 && dad <= 89)) return 2;
  if ((sad >= 140 && sad <= 159) || (dad >= 90 && dad <= 99)) return 3;
  if ((sad >= 160 && sad <= 179) || (dad >= 100 && dad <= 109)) return 4;
  if (sad >= 180 || dad >= 110) return 5;
  if (sad >= 140 || dad < 90) return 6;
};

const greenQuestions = [
  "1. Быстрое или сильное сердцебиение",
  "2. Чувство напряженности, нерввозности",
  "3. Нарушение сна",
  "4. Возбудимость",
  "5. Приступы тревоги, паники",
  "6. Трудности в концентрации внимания",
  "7. Чувство усталости или недостатка энергии",
  "8. Потеря интереса ко многим вещам",
  "9. Чувство недовольства или депрессия",
  "10. Плаксивость",
  "11. Раздражительность",
  "12. Чувство головокружения или обморок",
  "13. Давление или напряжение в голове, теле",
  "14. Чувство онемения и дрожь в различных частях тела",
  "15. Головные боли",
  "16. Мышечные и суставные боли",
  "17. Слабость в руках или ногах",
  "18. Затрудненное дыхание",
  "19. Приливы",
  "20. Ночная потливость",
  "21. Потеря интереса к сексу",
];

const greenVariants = [
  {
    value: "0",
  },
  {
    value: "1",
  },
  {
    value: "2",
  },
  {
    value: "3",
  },
];

const isaVariants = [
  {
    value: "Мужчина",
  },
  {
    value: "Женщина",
  },
];

const greenData = {
  numberVerdict: ["1 - 11", "12 - 19", "20 и выше"],
  textVerdict: ["Слабая", "Средняя", "Тяжёлая"],
  color: ["#a1f1e3", "#ffa3a3", "#ce575a"],
};

const getIndexGreen = (value) => {
  if (value >= 1 && value <= 11) return 0;
  if (value >= 12 && value <= 19) return 1;
  if (value > 20) return 2;
};

const getWordEnding = (amount) => {
  if (amount % 10 === 0) return "ов";
  if (amount % 10 === 1) return "";
  if (amount % 10 >= 2 && amount % 10 <= 4) return "a";
  return "ов";
};

const getIndexIsa = (gender, value) => {
  switch (gender) {
    case "Мужчина": {
      if (value >= 14.85 && value <= 95) {
        return 0;
      } else {
        return 1;
      }
    }
    case "Женщина": {
      return 0;
    }
    default:
      break;
  }
};

const isaData = {
  Мужчина: {
    numberVerdict: ["14,85% - 95% ", "Другие значения"],
    textVerdict: [
      "В пределах нормы",
      "Отклонения от нормы, нормальные значения 14,85 - 95%",
    ],
    color: ["#a1f1e3", "#ce575a"],
  },
  Женщина: {
    numberVerdict: ["0,8 - 9,3%", "1,3 - 17%", "0,8 - 11%", "< 6,6%"],
    textVerdict: [
      "Фоликулярная фаза",
      "Овуляция",
      "Лютеиновая фаза",
      "Менопауза",
    ],
    color: ["#a1f1e3"],
  },
};

const vteoData = {
  numberVerdict: ["0 - 3 балла", "больше 4 баллов"],
  textVerdict: ["Низкий риск ВТЭО", "Высокий риск ВТЭО"],
  color: ["#a1f1e3", "#ce575a"],
};

const getIndexVteo = (value) => (value >= 4 ? 1 : 0);

const vteoQuestions = [
  { id: 1, text: "Факторы риска", value: 3 },
  {
    id: 2,
    text: "Активный рак (локальные или отдаленные метастазы и/или получающие химио- или радиотерпапию в предшествующие 6 мес)",
    value: 3,
  },
  {
    id: 3,
    text: "ВТЭ в анамнезе (кроме тромбофлебитов подкожных вен)",
    value: 3,
  },
  { id: 4, text: "Ограничение подвижности (не менее 3 дней) ", value: 3 },
  {
    id: 5,
    text: "Тромбофилия (дефицит антитромбина, протеинов C, S, мутация в гене фактора Лейдена, протромбина G2021A, антифосфолидный синдром) ",
    value: 3,
  },
  {
    id: 6,
    text: "Недавняя травма и/или операция (за последний месяц)",
    value: 2,
  },
  { id: 7, text: "Пожилой возраст (>= 70 лет) ", value: 1 },
  { id: 8, text: "Сердечная или дыхательная недостаточность ", value: 1 },
  { id: 9, text: "ОИМ или ишемический инсульт", value: 1 },
  { id: 10, text: "Острая инфекция и/или ревматичесое заболевание ", value: 1 },
  { id: 11, text: "Ожирение (ИМТ >= 30 кг/м²)", value: 1 },
  { id: 12, text: "Продолжающаяся терапия половыми гормонами", value: 1 },
];

const calendarVariants = [
  {
    value: "По менструации",
  },
  {
    value: "По дате зачатия",
  },
];

const monthsName = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "май",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
];

const addDays = (date, days) => {
  console.log("date", date);
  console.log("days", days);
  const result = new Date(date);
  console.log("result", result.getDate());
  result.setDate(result.getDate() + days);
  console.log(result);
  return result;
};

const getDivider = (dateString) => {
  if (dateString.includes(".")) return ".";
  if (dateString.includes("/")) return "/";
  if (dateString.includes("-")) return "-";
};

const formatDate = (date) => {
  const divider = getDivider(date.toLocaleDateString());
  console.log(date.toLocaleDateString().split(divider)[0]);
  console.log(date.toLocaleDateString().split(divider)[1]);
  console.log(date.toLocaleDateString().split(divider)[2]);
  return `${date.toLocaleDateString().split(divider)[0]} ${
    monthsName[date.getMonth()]
  } ${date.toLocaleDateString().split(divider)[2]}`;
};

const formatDateForDatePicker = (date) => {
  const divider = getDivider(date.toLocaleDateString());
  const splittedDate = date.toLocaleDateString().split(divider);
  return `${splittedDate[2]}-${
    splittedDate[0].length === 1 ? "0" + splittedDate[0] : splittedDate[0]
  }-${splittedDate[1].length === 1 ? "0" + splittedDate[1] : splittedDate[1]}`;
};

const formatDateForCalc = (date) => {
  const divider = getDivider(date);
  const splittedDate = date.split(divider).reverse().join("/");
  return splittedDate;
};

const getWeekWord = (numWeek) => {
  if (numWeek === 1) return "неделя";
  if (numWeek % 10 === 2 || numWeek % 10 === 3 || numWeek % 10 === 4)
    return "недели";
  return "недель";
};

export {
  imtData,
  getIndexImt,
  homaData,
  getIndexHoma,
  hypertensData,
  getIndexHypertens,
  greenQuestions,
  greenVariants,
  greenData,
  getIndexGreen,
  getWordEnding,
  getIndexIsa,
  isaVariants,
  isaData,
  vteoData,
  vteoQuestions,
  getIndexVteo,
  calendarVariants,
  addDays,
  formatDate,
  formatDateForDatePicker,
  getWeekWord,
  formatDateForCalc,
};

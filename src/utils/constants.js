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
    "#54f9d5",
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

export {
  imtData,
  getIndexImt,
  homaData,
  getIndexHoma,
  hypertensData,
  getIndexHypertens,
};

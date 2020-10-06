// Date 객체를 2020-10-06 형식으로 리턴
exports.dashDate = (date) => {
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
};

// 달의 첫째날과 마지막날 리턴
exports.firstLastDay = (year, month) => {
  return {
    firstDay: new Date(year, month - 1, 1),
    lastDay: new Date(year, month, 0),
  };
};

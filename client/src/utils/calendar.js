function makeCalendar(year, month) {
  // 데이터
  const dayNameList = ["일", "월", "화", "수", "목", "금", "토"];
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0);

  // 렌더링
  // 컨테이너
  const calendarContainer = document.createElement("div");
  calendarContainer.classList.add("calendarContainer");
  calendarContainer.dataset.year = year;
  calendarContainer.dataset.month = month;

  // 테이블
  const calendarTable = document.createElement("table");

  // 일월화수목금토
  const tableHead = document.createElement("tr");
  dayNameList.forEach((dayname) => {
    const tableCell = document.createElement("th");
    tableCell.innerText = dayname;
    if (dayname === "일") {
      tableCell.classList.add("sunday");
    }
    tableHead.append(tableCell);
  });
  calendarTable.append(tableHead);

  // 테이블 바디 만들기
  let startCount;
  let countDay = 0;

  const tbody = document.createElement("tbody");
  for (let i = 0; i < 6; i++) {
    const tr = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      const td = document.createElement("td");
      if (i === 0 && !startCount && j === firstDay.getDay()) {
        startCount = 1;
      }
      if (startCount) {
        let fullDate =
          year +
          "-" +
          month.toString().padStart(2, "0") +
          "-" +
          (countDay + 1).toString().padStart(2, "0");
        td.classList.add("day");
        if (j === 0) {
          td.classList.add("sunday");
        }
        // td.dataset.date = `${month}월 ${countDay + 1}일`;
        td.dataset.fdate = fullDate;
      }
      td.textContent = startCount ? ++countDay : "";
      if (countDay === lastDay.getDate()) {
        startCount = 0;
      }
      tr.append(td);
    }
    tbody.append(tr);
    if (countDay >= lastDay.getDate()) {
      // console.log(countDay);
      // console.log(lastDay.getDate());
      break;
    }
  }
  calendarTable.append(tbody);
  calendarContainer.append(calendarTable);
  return calendarContainer;
}

export function drawCalendar(selector, year, month) {
  const calendar = document.querySelector(selector);
  calendar.innerHTML = "";
  calendar.append(makeCalendar(year, month));
}

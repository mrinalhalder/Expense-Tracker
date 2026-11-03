import { userData } from "./userInfo.js";

// Calculate next 4 months
const months = [
   "Jan",
   "Feb",
   "Mar",
   "Apr",
   "May",
   "Jun",
   "Jul",
   "Aug",
   "Sep",
   "Oct",
   "Nov",
   "Dec",
];

const date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

const TRANSACTION_KEY = "transactionData";
const chartLabels = document.querySelector("#chartLabels");

const prevBtn = document.querySelector("#prev-chart");
const nextBtn = document.querySelector("#next-chart");
const chartPrevSection = document.querySelector("#bar-groups-container");

let thisMonth = currentMonth;
let thisYear = currentYear;

// Initial Load
updateChartState();

prevBtn.addEventListener("click", (e) => {
   thisMonth--;
   if (thisMonth < 0) {
      thisMonth = 11;
      thisYear--;
   }
   updateChartState();
});

nextBtn.addEventListener("click", (e) => {
   thisMonth++;
   if (thisMonth >= 12) {
      thisMonth = 0;
      thisYear++;
   }
   updateChartState();
});

function lastFourMonthsCalculation(endMonth, endYear) {
   const result = [];

   for (let i = 3; i >= 0; i--) {
      let targetMonthIndex = endMonth - i;
      let targetYear = endYear;

      if (targetMonthIndex < 0) {
         targetMonthIndex += 12;
         targetYear -= 1;
      }

      result.push({
         month: months[targetMonthIndex],
         year: targetYear,
         income: Number(userData.userIncome),
         expense: 0,
      });
   }

   return result;
}

export function updateChartState() {
   const DATA = JSON.parse(localStorage.getItem(TRANSACTION_KEY)) || [];
   const chartData = lastFourMonthsCalculation(thisMonth, thisYear);

   DATA.forEach((item) => {
      const itemDate = new Date(item.date);
      const itemMonthIndex = itemDate.getMonth();
      const itemMonth = months[itemMonthIndex];
      const itemYear = itemDate.getFullYear();

      const targetMonth = chartData.find(
         (m) => m.month === itemMonth && m.year === itemYear,
      );

      // Safety check:
      if (targetMonth) {
         if (item.type === "income") {
            targetMonth.income += Number(item.amount);
         } else {
            targetMonth.expense += Number(item.amount);
         }
      }
   });

   let MAX_LIMIT = 30000;

   chartData.forEach((item) => {
      if (item.income > MAX_LIMIT) {
         MAX_LIMIT = item.income;
      }
      if (item.expense > MAX_LIMIT) {
         MAX_LIMIT = item.expense;
      }
   });

   //MAX_LIMIT = Math.round(MAX_LIMIT * (3.1 / 3));
   const sndMaxLimit = Math.round(MAX_LIMIT * (2 / 3));
   const thirdMaxLimit = Math.round(MAX_LIMIT * (1 / 3));

   chartLabels.innerHTML = `
    <span>₹${MAX_LIMIT}</span>
    <span>₹${sndMaxLimit}</span>
    <span>₹${thirdMaxLimit}</span>
    <span>₹0</span>
  `;

   chartPrevSection.innerHTML = "";
   chartData.forEach((item) => {
      const incomeHeight = Math.min((item.income / MAX_LIMIT) * 100, 100);
      const expenseHeight = Math.min((item.expense / MAX_LIMIT) * 100, 100);

      chartPrevSection.insertAdjacentHTML(
         "beforeend",
         `
      <div class="bar-group">
        <div class="bar-pair">
          <div id="bar1">
            <span>${item.income}</span>
            <i class="bar income-bar" style="height:${incomeHeight}%"></i>
          </div>
          <div id="bar2">
            <span>${item.expense}</span>
            <i class="bar expense-bar" style="height: ${expenseHeight}%"></i>
          </div>
        </div>
        <span>${item.month}</span>
      </div>
    `,
      );
   });
}

const donutChart = document.querySelector(".donut-chart");
const totalAmount = document.querySelector("#donut-total");
const incomeAmount = document.querySelector("#positive");
const expenseAmount = document.querySelector("#negative");

export function updateDonutChart(income, expense) {
   let expensePercent = 0;
   if (income > 0) {
      expensePercent = (expense / income) * 100;
   }
   if (expensePercent > 100) expensePercent = 100;

   totalAmount.textContent = `₹${expense}`;
   incomeAmount.textContent = `₹${income}`;
   expenseAmount.textContent = `₹${expense}`;

   donutChart.style.background = `conic-gradient(var(--red) 0% ${expensePercent}%, var(--green) ${expensePercent}% 100%)`;
}

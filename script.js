import { hasUserData, getName, userData } from "./userInfo.js";
import { updateDonutChart } from "./summary.js";

const greetingText = document.querySelector("#greetingText");
const subTotalIncome = document.querySelector("#total_income");
const subTotalExpenses = document.querySelector("#total_expenses");

export const totalBalance = document.querySelector("#total-balance");
export const totalIncome = document.querySelector("#total-income");
export const totalExpenses = document.querySelector("#total-expenses");
const TRANSACTION_KEY = "transactionData";

const now = new Date();
const hours = now.getHours();

// export let income = userData.userIncome;
// export let expense = 0;

//const currentMonthData = getTargetTransaction(TRANSACTION_KEY);

// const expenses = currentMonthData.filter((item) => item.type === "expense");
// const incomes = currentMonthData.filter((item) => item.type === "income");

// console.log(currentMonthData);

if (hasUserData) {
   const name = getName;

   // expenses.forEach((item) => {
   // expense += Number(item.amount);
   // });

   // incomes.forEach((item) => {
   //    income += Number(item.amount);
   // });

   // const currentBalance = income - expense;

   showGreeting(name);
   document.addEventListener("monthDataChanged", (e) => {
      const { income, expense, balance } = e.detail;
      showBalanceDetails(income, expense, balance);
      updateDonutChart(income, expense);
   });
}

function showGreeting(name) {
   if (hours >= 22 || hours <= 2) {
      greetingText.textContent = `Good Night, ${name} 👋`;
   } else if (hours >= 3 && hours < 12) {
      greetingText.textContent = `Good Morning, ${name} 👋`;
   } else if (hours >= 12 && hours < 18) {
      greetingText.textContent = `Good Afternoon, ${name} 👋`;
   } else if (hours >= 18 && hours < 22) {
      greetingText.textContent = `Good Evening, ${name} 👋`;
   }
}

export function showBalanceDetails(income, expense, currentBalance) {
   totalBalance.textContent = `₹ ${currentBalance}`;
   subTotalIncome.textContent = `₹ ${income}`;
   subTotalExpenses.textContent = `₹ ${expense}`;

   totalIncome.textContent = `₹ ${income}`;
   totalExpenses.textContent = `₹ ${expense}`;
}

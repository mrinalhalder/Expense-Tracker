import {
   hasUserData,
   getName,
   getIncome,
   getCurrentBalance,
   getExpenses,
} from "./userInfo.js";

const greetingText = document.querySelector("#greetingText");
const totalIncome = document.querySelectorAll(".total_income");
const totalBalance = document.querySelector("#total-balance");
const totalExpenses = document.querySelectorAll(".total_expenses");

// console.log(userData);
localStorage.clear();

const now = new Date();
const hours = now.getHours();

if (hasUserData) {
   const name = getName();
   const income = getIncome();
   const expense = getExpenses();
   const currentBalance = getCurrentBalance();

   showGreeting(name);
   showBalanceDetails(income, expense, currentBalance);
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

function showBalanceDetails(income, expense, currentBalance) {
   totalBalance.textContent = `₹ ${currentBalance}`;
   totalIncome.forEach((item) => {
      item.textContent = `₹ ${income}`;
   });

   totalExpenses.forEach((item) => {
      item.textContent = `₹ ${expense}`;
   });
}
